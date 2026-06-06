"use client";

import React, { useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();
    const router = useRouter();

    //push to login if not authenticated
    useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.push("/");
        }
    }, [loading, isAuthenticated, router]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-black"></div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return (<><span>Unauthenticated</span></>);
    }

    return children
}

export default ProtectedRoute