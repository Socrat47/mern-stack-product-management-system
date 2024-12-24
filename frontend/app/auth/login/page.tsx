"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:4000/auth/login", { email, password })
            if (res.data.token) {
                localStorage.setItem("token", res.data.token)
                router.push('/dashboard')
                toast.success("Başarıyla Giriş Yapıldı!")
            } else {
                console.error('Login Failed')
            }
        } catch (error) {
            console.error(error)
        }

    }
    return (
        <div className='mt-12 min-h-[500px] min-w-[600px] rounded-xl overflow-hidden shadow-custom-full bg-white'>
            <div className='flex items-center justify-center '>
                <Label className='text-3xl font-semibold mt-12'>LOGIN</Label>
            </div>
            <div className='flex items-center justify-center mt-12'>
                <form onSubmit={handleLogin} className='flex flex-col items-center justify-center gap-8'>
                    <Input className="w-[400px] h-[50px] bg-gray-300" placeholder='Email' type='email' onChange={(e) => setEmail(e.target.value)} />
                    <Input className='w-[400px] h-[50px] bg-gray-300' placeholder='Password' type='password' onChange={(e) => setPassword(e.target.value)} />
                    <div>
                        <Label className='text-lg text-gray-500 mr-44'>Hesabın yok mu? <Link className='text-blue-400 font-bold' href={'/auth/register'}>Register</Link></Label>
                    </div>
                    <Button type='submit' className='bg-blue-400 text-black font-semibold w-40 ml-60 hover:bg-blue-600 hover:text-white transition duration-300
                '>Login</Button>
                </form>
            </div>
        </div >
    )
}

export default Login