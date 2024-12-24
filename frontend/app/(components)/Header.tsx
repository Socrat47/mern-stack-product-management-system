import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'react-toastify'

const Header = () => {
    const router = useRouter();

    const logOut = () => {
        localStorage.removeItem("token");
        router.push("/auth/login")
        toast.success("Başarıyla Çıkış Yapıldı!")
    }
    return (
        <div className='flex items-center justify-between bg-blue-400 p-5'>
            <div>
                <h3 className='text-3xl font-semibold text-white'>TaskCommerce</h3>
            </div>
            <div className='text-lg flex items-center gap-5'>
                <Link href={"/products"}>Ürünler</Link>
                <Link href={"/dashboard"}>Dashboard</Link>
            </div>
            <div><Button onClick={() => logOut()}>Log Out</Button></div>
        </div>
    )
}

export default Header