"use client";

import React, { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/");
    }
  }, [loading, isAuthenticated, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center gap-4">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-2 border-zinc-700" />
          <div className="absolute inset-0 rounded-full border-2 border-t-amber-500 animate-spin" />
        </div>
        <p className="text-zinc-500 text-xs tracking-[0.2em] uppercase animate-pulse">
          Authenticating…
        </p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 mx-auto rounded-full bg-red-950/50 border border-red-800/60 flex items-center justify-center text-red-400 text-xl">
            ⚠
          </div>
          <p className="text-zinc-400 text-sm tracking-widest uppercase">Unauthorized</p>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;