import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, NavLink } from "react-router";
import { loginUser } from "../authSlice";
import { useEffect, useState } from "react";

const loginSchema = z.object({
  emailId: z.string().email("Invalid Email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading, error } = useSelector(
    (state) => state.auth
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = (data) => {
    dispatch(loginUser(data));
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black px-4">

      {/* 🌌 Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-900 via-purple-900 to-black animate-gradient"></div>

      {/* 🌈 Floating Neon Orbs */}
      <div className="absolute w-96 h-96 bg-indigo-500 rounded-full blur-[120px] opacity-30 top-[-100px] left-[-100px] animate-floatSlow"></div>
      <div className="absolute w-96 h-96 bg-pink-500 rounded-full blur-[120px] opacity-30 bottom-[-100px] right-[-100px] animate-floatFast"></div>

      {/* 💎 Glass Card with Animated Border */}
      <div className="relative z-10 w-full max-w-md p-[1px] rounded-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-borderGlow">

        <div className="bg-black/80 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl">

          {/* 🚀 Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-3xl font-extrabold text-white shadow-lg animate-logoGlow hover:scale-110 transition duration-500">
              {"</>"}
            </div>

            <h1 className="mt-4 text-3xl font-bold text-white tracking-wide">
              Code<span className="text-indigo-400">Arena</span>
            </h1>

            <p className="text-gray-400 text-sm mt-2 text-center">
              Welcome back, Champion 🚀
            </p>
          </div>

          {/* 📝 Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

            {/* Email */}
            <div>
              <input
                type="email"
                placeholder="Email Address"
                className={`w-full px-4 py-3 rounded-xl bg-gray-900 text-white border ${
                  errors.emailId ? "border-red-500" : "border-gray-700"
                } focus:ring-2 focus:ring-indigo-500 focus:outline-none transition`}
                {...register("emailId")}
              />
              {errors.emailId && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.emailId.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className={`w-full px-4 py-3 rounded-xl bg-gray-900 text-white border pr-12 ${
                  errors.password ? "border-red-500" : "border-gray-700"
                } focus:ring-2 focus:ring-indigo-500 focus:outline-none transition`}
                {...register("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3 text-gray-400 hover:text-white transition"
              >
                {showPassword ? "👁" : "🙈"}
              </button>
              {errors.password && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <p className="text-red-400 text-sm text-center">{error}</p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold shadow-lg hover:shadow-indigo-500/40 hover:scale-105 transition duration-300"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Signup Redirect */}
          <p className="text-center text-gray-400 text-sm mt-6">
            Don't have an account?{" "}
            <NavLink
              to="/signup"
              className="text-indigo-400 hover:text-pink-400 transition"
            >
              Sign Up
            </NavLink>
          </p>

        </div>
      </div>

      {/* 🎬 Animations */}
      <style>
        {`
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background-size: 300% 300%;
          animation: gradientMove 12s ease infinite;
        }

        @keyframes floatSlow {
          0% { transform: translateY(0px); }
          50% { transform: translateY(40px); }
          100% { transform: translateY(0px); }
        }
        .animate-floatSlow {
          animation: floatSlow 10s ease-in-out infinite;
        }

        @keyframes floatFast {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-40px); }
          100% { transform: translateY(0px); }
        }
        .animate-floatFast {
          animation: floatFast 7s ease-in-out infinite;
        }

        @keyframes borderGlow {
          0% { filter: hue-rotate(0deg); }
          100% { filter: hue-rotate(360deg); }
        }
        .animate-borderGlow {
          animation: borderGlow 6s linear infinite;
        }

        @keyframes logoGlow {
          0% { box-shadow: 0 0 20px #6366f1; }
          50% { box-shadow: 0 0 40px #ec4899; }
          100% { box-shadow: 0 0 20px #6366f1; }
        }
        .animate-logoGlow {
          animation: logoGlow 3s ease-in-out infinite;
        }
        `}
      </style>

    </div>
  );
}

export default Login;