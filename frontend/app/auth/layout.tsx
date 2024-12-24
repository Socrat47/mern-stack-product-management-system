import React from 'react'

interface AuthLayoutProps {
    children: React.ReactNode
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
    return (
        <div className='flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-blue-400 to-teal-300'>{children}</div>
    )
}

export default AuthLayout