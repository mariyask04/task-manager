import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import React from 'react'

const Navbar = () => {
    const { user, logout } = useAuth();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push("/");
    }
    return (
        <nav className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">

                <div
                    onClick={() => router.push("/dashboard")}
                    className="text-2xl font-bold cursor-pointer"
                >
                    Task Manager
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-black text-white flex items-center justify-center font-semibold">
                            {user?.name?.charAt(0).toUpperCase()}
                        </div>

                        <span className="hidden sm:block">
                            {user?.name}
                        </span>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
                    >
                        Logout
                    </button>
                </div>

            </div>
        </nav>
    );
}

export default Navbar