import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import axiosClient from "../utils/axiosClient";
import { logoutUser } from "../authSlice";

function Homepage() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [problems, setProblems] = useState([]);
  const [solvedProblems, setSolvedProblems] = useState([]);
  const [filters, setFilters] = useState({
    difficulty: "all",
    tag: "all",
    status: "all",
  });

  useEffect(() => {
    const fetchProblems = async () => {
      const { data } = await axiosClient.get("/problem/getAllProblem");
      setProblems(data);
    };

    const fetchSolvedProblems = async () => {
      const { data } = await axiosClient.get("/problem/problemSolvedByUser");
      setSolvedProblems(data);
    };

    fetchProblems();
    if (user) fetchSolvedProblems();
  }, [user]);

  const handleLogout = () => {
    dispatch(logoutUser());
    setSolvedProblems([]);
  };

  const filteredProblems = problems.filter((problem) => {
    const difficultyMatch =
      filters.difficulty === "all" ||
      problem.difficulty === filters.difficulty;

    const tagMatch =
      filters.tag === "all" || problem.tags === filters.tag;

    const statusMatch =
      filters.status === "all" ||
      solvedProblems.some((sp) => sp._id === problem._id);

    return difficultyMatch && tagMatch && statusMatch;
  });

  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex flex-col">

      {/* ================= NAVBAR ================= */}
      {/* ================= NAVBAR ================= */}
<div className="navbar px-6 lg:px-12 bg-[#0b1120] border-b border-white/10 backdrop-blur-lg">

  <div className="flex-1">
    <NavLink to="/" className="flex items-center gap-3">
      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-pink-500 via-purple-600 to-cyan-500 flex items-center justify-center font-extrabold text-white shadow-lg shadow-purple-500/40 animate-pulse">
        {"</>"}
      </div>
      <span className="text-2xl font-extrabold bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent tracking-wide">
        CodeArena
      </span>
    </NavLink>
  </div>

  {/* Desktop Menu */}
  <div className="hidden md:flex items-center gap-6">
    <span className="text-gray-300 font-medium">
      👋 {user?.firstName}
    </span>

    {/* ✅ ADMIN BUTTON FIXED */}
    {user?.role?.toLowerCase() === "admin" && (
      <NavLink
        to="/admin"
        className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-105 transition duration-300 shadow-md"
      >
        Admin Panel
      </NavLink>
    )}

    <button
      onClick={handleLogout}
      className="px-5 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:scale-105 transition duration-300 shadow-md"
    >
      Logout
    </button>
  </div>

  {/* Mobile Dropdown */}
  <div className="md:hidden dropdown dropdown-end">
    <label tabIndex={0} className="btn btn-ghost text-white">
      ☰
    </label>
    <ul
      tabIndex={0}
      className="menu dropdown-content mt-3 p-4 shadow bg-[#1e293b] rounded-xl w-52 space-y-2"
    >
      <li className="text-gray-300">{user?.firstName}</li>

      {/* ✅ ADMIN FIX HERE ALSO */}
      {user?.role?.toLowerCase() === "admin" && (
        <li>
          <NavLink to="/admin">Admin Panel</NavLink>
        </li>
      )}

      <li>
        <button
          onClick={handleLogout}
          className="btn btn-sm bg-gradient-to-r from-pink-500 to-purple-600 border-none"
        >
          Logout
        </button>
      </li>
    </ul>
  </div>
</div>

      {/* ================= HERO ================= */}
      <section className="relative text-center py-28 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 via-indigo-900/30 to-purple-900/30 blur-3xl opacity-50 animate-pulse"></div>

        <h1 className="relative text-5xl md:text-6xl font-extrabold mb-6 animate-fadeUp">
          <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Crack FAANG Interviews
          </span>
        </h1>

        <p className="relative max-w-2xl mx-auto text-gray-400 text-lg mb-10 animate-fadeUp delay-200">
          Solve curated problems. Track progress. Get hired at world-class tech companies.
        </p>

        <NavLink
          to="/"
          className="relative px-8 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:scale-110 transition duration-300 shadow-lg"
        >
          Start Solving
        </NavLink>
      </section>

      {/* ================= COMPANY STRIP ================= */}
      <section className="py-14 overflow-hidden border-y border-white/10">
        <div className="whitespace-nowrap flex gap-24 text-3xl font-bold animate-marquee">

          <span className="text-blue-400">Google</span>
          <span className="text-yellow-400">Amazon</span>
          <span className="text-cyan-400">Microsoft</span>
          <span className="text-blue-500">Meta</span>
          <span className="text-gray-300">Apple</span>
          <span className="text-red-500">Netflix</span>
          <span className="text-pink-400">Adobe</span>
          <span className="text-green-400">Uber</span>

          <span className="text-blue-400">Google</span>
          <span className="text-yellow-400">Amazon</span>
          <span className="text-cyan-400">Microsoft</span>
          <span className="text-blue-500">Meta</span>
          <span className="text-gray-300">Apple</span>
          <span className="text-red-500">Netflix</span>
          <span className="text-pink-400">Adobe</span>
          <span className="text-green-400">Uber</span>

        </div>
      </section>

      {/* ================= FILTERS ================= */}
      <div className="flex justify-center mt-16 px-6">
        <div className="flex flex-wrap gap-4 bg-[#1e293b] p-6 rounded-2xl shadow-xl">

          <select
            className="select bg-[#0f172a] border-white/20 text-white"
            value={filters.status}
            onChange={(e) =>
              setFilters({ ...filters, status: e.target.value })
            }
          >
            <option value="all">All Problems</option>
            <option value="solved">Solved</option>
          </select>

          <select
            className="select bg-[#0f172a] border-white/20 text-white"
            value={filters.difficulty}
            onChange={(e) =>
              setFilters({ ...filters, difficulty: e.target.value })
            }
          >
            <option value="all">All Difficulties</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>

          <select
            className="select bg-[#0f172a] border-white/20 text-white"
            value={filters.tag}
            onChange={(e) =>
              setFilters({ ...filters, tag: e.target.value })
            }
          >
            <option value="all">All Tags</option>
            <option value="array">Array</option>
            <option value="linkedList">Linked List</option>
            <option value="graph">Graph</option>
            <option value="dp">DP</option>
          </select>

        </div>
      </div>

      {/* ================= PROBLEMS ================= */}
      <div className="flex-1 flex justify-center px-6 py-20">
        <div className="w-full max-w-4xl grid gap-10">

          {filteredProblems.map((problem, index) => {
            const isSolved = solvedProblems.some(
              (sp) => sp._id === problem._id
            );

            return (
              <div
                key={problem._id}
                className="bg-[#1e293b] p-8 rounded-3xl border border-white/10
                hover:border-pink-500 hover:shadow-2xl hover:shadow-pink-500/20
                hover:-translate-y-2 transition duration-500"
                style={{
                  animation: `fadeInUp 0.6s ease forwards`,
                  animationDelay: `${index * 0.08}s`,
                  opacity: 0,
                }}
              >
                <div className="flex justify-between items-center mb-4">
                  <NavLink
                    to={`/problem/${problem._id}`}
                    className="text-2xl font-semibold hover:text-pink-400 transition"
                  >
                    {problem.title}
                  </NavLink>

                  {isSolved && (
                    <span className="px-4 py-1 text-sm bg-green-500 rounded-full">
                      ✓ Solved
                    </span>
                  )}
                </div>

                <div className="flex gap-4">
                  <span className={getDifficultyStyle(problem.difficulty)}>
                    {problem.difficulty}
                  </span>
                  <span className="px-4 py-1 text-sm bg-slate-700 rounded-full">
                    {problem.tags}
                  </span>
                </div>
              </div>
            );
          })}

        </div>
      </div>

      {/* ================= FOOTER ================= */}
      <footer className="bg-[#0b1120] border-t border-white/10 mt-20">
        <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-10">

          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 via-purple-600 to-cyan-500 flex items-center justify-center font-bold text-white shadow-lg">
                 {"</>"}
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                CodeArena
              </span>
            </div>
            <p className="text-gray-400 text-sm">
              Master DSA with curated problems from top tech companies and crack your dream job.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-purple-300 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3 text-gray-400">
              <li className="hover:text-pink-400 transition cursor-pointer">Home</li>
              <li className="hover:text-pink-400 transition cursor-pointer">Problems</li>
              <li className="hover:text-pink-400 transition cursor-pointer">Progress</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-purple-300 mb-4">
              Top Companies
            </h3>
            <div className="flex flex-wrap gap-3 text-sm">
              <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full">Google</span>
              <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full">Amazon</span>
              <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full">Microsoft</span>
              <span className="px-3 py-1 bg-pink-500/20 text-pink-400 rounded-full">Meta</span>
              <span className="px-3 py-1 bg-gray-500/20 text-gray-300 rounded-full">Apple</span>
            </div>
          </div>

        </div>

        <div className="border-t border-white/10 text-center py-6 text-gray-500 text-sm">
          © 2026 CodeArena. Built with ❤️ for Developers.
        </div>
      </footer>

      <style>
        {`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(40px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }

          .animate-marquee {
            animation: marquee 28s linear infinite;
          }
        `}
      </style>

    </div>
  );
}

const getDifficultyStyle = (difficulty) => {
  switch (difficulty.toLowerCase()) {
    case "easy":
      return "px-4 py-1 text-sm bg-green-500 rounded-full";
    case "medium":
      return "px-4 py-1 text-sm bg-yellow-400 text-black rounded-full";
    case "hard":
      return "px-4 py-1 text-sm bg-red-500 rounded-full";
    default:
      return "px-4 py-1 text-sm bg-gray-500 rounded-full";
  }
};

export default Homepage;