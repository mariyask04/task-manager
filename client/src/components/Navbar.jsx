"use client";

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <nav className="bg-zinc-900/90 backdrop-blur-md border-b border-zinc-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <div
          onClick={() => router.push("/dashboard")}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-2 h-2 rotate-45 bg-amber-500 group-hover:scale-125 transition-transform duration-200" />
          <span className="text-white font-black text-xl tracking-tight" style={{ fontFamily: "'Georgia', serif" }}>
            Task<span className="text-amber-500">Manager</span>
          </span>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* User pill */}
          <div className="flex items-center gap-3 bg-zinc-800/70 border border-zinc-700 rounded-full pl-1 pr-4 py-1">
            <div className="h-8 w-8 rounded-full bg-amber-500 text-zinc-950 flex items-center justify-center font-black text-sm shrink-0">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <span className="hidden sm:block text-zinc-300 text-sm font-medium">
              {user?.name}
            </span>
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-zinc-800 hover:bg-red-950/60 border border-zinc-700 hover:border-red-800/60 text-zinc-400 hover:text-red-400 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200"
          >
            <span>↩</span>
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;