import React from "react";
import { Plus, Edit, Trash2, Video } from "lucide-react";
import { NavLink } from "react-router";
import { useSelector } from "react-redux";

function Admin() {
  const { user } = useSelector((state) => state.auth);

  const adminOptions = [
    {
      id: "create",
      title: "Create Problem",
      description: "Add a new coding problem to the platform",
      icon: Plus,
      gradient: "from-green-400 to-emerald-600",
      route: "/admin/create",
    },
    {
      id: "update",
      title: "Update Problem",
      description: "Edit existing problems and their details",
      icon: Edit,
      gradient: "from-yellow-400 to-orange-500",
      route: "/admin/update",
    },
    {
      id: "delete",
      title: "Delete Problem",
      description: "Remove problems from the platform",
      icon: Trash2,
      gradient: "from-red-500 to-pink-600",
      route: "/admin/delete",
    },
    {
      id: "video",
      title: "Video Problem",
      description: "Upload and manage solution videos",
      icon: Video,
      gradient: "from-cyan-400 to-blue-600",
      route: "/admin/video",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex flex-col">

      {/* ================= NAVBAR ================= */}
      <div className="navbar px-6 lg:px-12 bg-[#0b1120] border-b border-white/10 backdrop-blur-lg">

        <div className="flex-1">
          <NavLink to="/" className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-pink-500 via-purple-600 to-cyan-500 flex items-center justify-center font-extrabold text-white shadow-lg shadow-purple-500/40">
              {"</>"}
            </div>
            <span className="text-2xl font-extrabold bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent tracking-wide">
              CodeArena
            </span>
          </NavLink>
        </div>

        <div className="flex items-center gap-6">
          <span className="text-gray-300 font-medium">
            👑 {user?.firstName}
          </span>

          <NavLink
            to="/"
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-105 transition duration-300 shadow-md"
          >
            Home
          </NavLink>
        </div>
      </div>

      {/* ================= HEADER ================= */}
      <div className="text-center py-20 px-6 relative overflow-hidden">

        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 via-indigo-900/30 to-purple-900/30 blur-3xl opacity-40 animate-pulse"></div>

        <h1 className="relative text-5xl font-extrabold mb-6">
          <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Admin Control Panel
          </span>
        </h1>

        <p className="relative text-gray-400 max-w-2xl mx-auto text-lg">
          Manage problems, content, and videos with powerful administrative tools.
        </p>
      </div>

      {/* ================= ADMIN CARDS ================= */}
      <div className="flex-1 flex justify-center px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 max-w-5xl w-full">

          {adminOptions.map((option, index) => {
            const IconComponent = option.icon;

            return (
              <div
                key={option.id}
                className="relative bg-[#1e293b] p-10 rounded-3xl border border-white/10
                hover:border-pink-500 hover:shadow-2xl hover:shadow-pink-500/20
                hover:-translate-y-3 transition duration-500 group"
                style={{
                  animation: `fadeInUp 0.6s ease forwards`,
                  animationDelay: `${index * 0.1}s`,
                  opacity: 0,
                }}
              >
                {/* Icon */}
                <div
                  className={`w-16 h-16 flex items-center justify-center rounded-2xl bg-gradient-to-r ${option.gradient} shadow-lg mb-6`}
                >
                  <IconComponent size={30} />
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold mb-3 group-hover:text-pink-400 transition">
                  {option.title}
                </h2>

                {/* Description */}
                <p className="text-gray-400 mb-8">
                  {option.description}
                </p>

                {/* Button */}
                <NavLink
                  to={option.route}
                  className={`inline-block px-6 py-3 rounded-xl bg-gradient-to-r ${option.gradient}
                  hover:scale-110 transition duration-300 shadow-lg`}
                >
                  {option.title}
                </NavLink>
              </div>
            );
          })}

        </div>
      </div>

      {/* ================= FOOTER ================= */}
      <footer className="bg-[#0b1120] border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-14 grid md:grid-cols-3 gap-10">

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
              Premium coding platform to master DSA and crack top tech companies.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-purple-300 mb-4">
              Admin Tools
            </h3>
            <ul className="space-y-2 text-gray-400">
              <li>Create Problem</li>
              <li>Update Problem</li>
              <li>Delete Problem</li>
              <li>Manage Videos</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-purple-300 mb-4">
              Platform
            </h3>
            <ul className="space-y-2 text-gray-400">
              <li>Problems</li>
              <li>Progress</li>
              <li>Leaderboard</li>
            </ul>
          </div>

        </div>

        <div className="border-t border-white/10 text-center py-6 text-gray-500 text-sm">
          © 2026 CodeArena Admin Panel. Built with ❤️
        </div>
      </footer>

      <style>
        {`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(40px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>

    </div>
  );
}

export default Admin;