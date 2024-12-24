"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const Register = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const router = useRouter();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await axios.post(`http://localhost:4000/auth/register`, { email, username, password });

            if (res.status === 201) {
                toast.success("Başarıyla Kayıt Olundu!");
                router.push("/auth/login")
            }
        } catch (error) {
            toast.error("Kayıt olmada bir hata oluştu!")
            console.log(error)
        }
    }

    return (
        <div className='mt-12 min-h-[600px] min-w-[600px] rounded-xl overflow-hidden shadow-custom-full bg-white'>
            <div className='flex items-center justify-center '>
                <Label className='text-3xl font-semibold mt-12'>REGISTER</Label>
            </div>
            <div className='flex items-center justify-center mt-12'>
                <form onSubmit={handleRegister} className='flex flex-col items-center justify-center gap-8'>
                    <Input className='w-[400px] h-[50px] bg-gray-300' placeholder='Username' type='text' onChange={(e) => setUsername(e.target.value)} />
                    <Input className="w-[400px] h-[50px] bg-gray-300" placeholder='Email' type='email' onChange={(e) => setEmail(e.target.value)} />
                    <Input className='w-[400px] h-[50px] bg-gray-300' placeholder='Password' type='password' onChange={(e) => setPassword(e.target.value)} />
                    <div>
                        <Label className='text-lg text-gray-500 mr-52'>Hesabın var mı? <Link className='text-blue-400 font-bold' href={'/auth/login'}>Login</Link></Label>
                    </div>
                    <Button type='submit' className='bg-blue-400 text-black font-semibold w-40 ml-60 hover:bg-blue-600 hover:text-white transition duration-300
                    '>Register</Button>
                </form>
            </div>
        </div>
    )
}

export default Register