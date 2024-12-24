"use client"
import Link from 'next/link';
import React from 'react'
import Header from '../(components)/Header';

interface DashboardLayoutProps {
    children: React.ReactNode
}

const token = localStorage.getItem("token");

const AuthLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    if (!token) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500">
                <div className="text-center text-white">
                    <h1 className="text-9xl font-extrabold mb-6">404</h1>
                    <p className="text-2xl font-semibold mb-4">Oops! Erişim Yetkin Yok</p>
                    <p className="mb-6 text-2xl"><Link href={'/auth/login'}>Geri Dön</Link></p>

                </div>
            </div>
        );
    }

    return (
        <div>
            <Header />
            <div className='container'>
                {children}
            </div>
        </div>
    )
}

export default AuthLayout