import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axiosClient from '../utils/axiosClient';
import { useNavigate } from 'react-router';

/* ===================== SCHEMA ===================== */

const problemSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  tags: z.enum(['array', 'linkedList', 'graph', 'dp']),

  visibleTestCases: z.array(
    z.object({
      input: z.string().min(1),
      output: z.string().min(1),
      explanation: z.string().min(1)
    })
  ).min(1),

  hiddenTestCases: z.array(
    z.object({
      input: z.string().min(1),
      output: z.string().min(1)
    })
  ).min(1),

  startCode: z.array(
    z.object({
      language: z.enum(['C++', 'Java', 'JavaScript']),
      initialCode: z.string().min(1)
    })
  ).length(3),

  referenceSolution: z.array(
    z.object({
      language: z.enum(['C++', 'Java', 'JavaScript']),
      completeCode: z.string().min(1)
    })
  ).length(3)
});

/* ===================== COMPONENT ===================== */

function AdminPanel() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(problemSchema),
    defaultValues: {
      difficulty: 'easy',
      tags: 'array',
      visibleTestCases: [{ input: '', output: '', explanation: '' }],
      hiddenTestCases: [{ input: '', output: '' }],
      startCode: [
        { language: 'C++', initialCode: '' },
        { language: 'Java', initialCode: '' },
        { language: 'JavaScript', initialCode: '' }
      ],
      referenceSolution: [
        { language: 'C++', completeCode: '' },
        { language: 'Java', completeCode: '' },
        { language: 'JavaScript', completeCode: '' }
      ]
    }
  });

  const { fields: visibleFields, append: addVisible, remove: removeVisible } =
    useFieldArray({ control, name: 'visibleTestCases' });

  const { fields: hiddenFields, append: addHidden, remove: removeHidden } =
    useFieldArray({ control, name: 'hiddenTestCases' });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await axiosClient.post('/problem/create', data);
      alert('Problem created successfully');
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle =
    'w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500';

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-6xl mx-auto space-y-10">

        {/* BASIC INFO */}
        <section className="bg-slate-800 p-6 rounded-xl space-y-4">
          <h2 className="text-2xl font-bold text-indigo-400">Basic Info</h2>

          <input {...register('title')} placeholder="Title" className={inputStyle} />
          <textarea {...register('description')} rows={4} placeholder="Description" className={inputStyle} />

          <div className="grid grid-cols-2 gap-4">
            <select {...register('difficulty')} className={inputStyle}>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>

            <select {...register('tags')} className={inputStyle}>
              <option value="array">Array</option>
              <option value="linkedList">Linked List</option>
              <option value="graph">Graph</option>
              <option value="dp">DP</option>
            </select>
          </div>
        </section>

        {/* VISIBLE TEST CASES */}
        <section className="bg-slate-800 p-6 rounded-xl space-y-4">
          <h2 className="text-xl text-indigo-400">Visible Test Cases</h2>

          {visibleFields.map((_, i) => (
            <div key={i} className="space-y-2">
              <input {...register(`visibleTestCases.${i}.input`)} placeholder="Input" className={inputStyle} />
              <input {...register(`visibleTestCases.${i}.output`)} placeholder="Output" className={inputStyle} />
              <textarea {...register(`visibleTestCases.${i}.explanation`)} placeholder="Explanation" className={inputStyle} />
              <button type="button" onClick={() => removeVisible(i)} className="text-red-400">Remove</button>
            </div>
          ))}

          <button type="button" onClick={() => addVisible({ input: '', output: '', explanation: '' })}>
            + Add Visible Case
          </button>
        </section>

        {/* HIDDEN TEST CASES */}
        <section className="bg-slate-800 p-6 rounded-xl space-y-4">
          <h2 className="text-xl text-indigo-400">Hidden Test Cases</h2>

          {hiddenFields.map((_, i) => (
            <div key={i} className="space-y-2">
              <input {...register(`hiddenTestCases.${i}.input`)} placeholder="Input" className={inputStyle} />
              <input {...register(`hiddenTestCases.${i}.output`)} placeholder="Output" className={inputStyle} />
              <button type="button" onClick={() => removeHidden(i)} className="text-red-400">Remove</button>
            </div>
          ))}

          <button type="button" onClick={() => addHidden({ input: '', output: '' })}>
            + Add Hidden Case
          </button>
        </section>

        {/* START CODE */}
        <section className="bg-slate-800 p-6 rounded-xl space-y-4">
          <h2 className="text-xl text-indigo-400">Starter Code</h2>

          {['C++', 'Java', 'JavaScript'].map((lang, i) => (
            <textarea
              key={lang}
              {...register(`startCode.${i}.initialCode`)}
              placeholder={`Starter code (${lang})`}
              rows={4}
              className={inputStyle}
            />
          ))}
        </section>

        {/* REFERENCE SOLUTION */}
        <section className="bg-slate-800 p-6 rounded-xl space-y-4">
          <h2 className="text-xl text-indigo-400">Reference Solution</h2>

          {['C++', 'Java', 'JavaScript'].map((lang, i) => (
            <textarea
              key={lang}
              {...register(`referenceSolution.${i}.completeCode`)}
              placeholder={`Solution (${lang})`}
              rows={5}
              className={inputStyle}
            />
          ))}
        </section>

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 py-3 rounded-xl font-bold"
        >
          {loading ? 'Creating Problem...' : 'Create Problem'}
        </button>

      </form>
    </div>
  );
}

export default AdminPanel;