import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

interface IProduct {
    categoryId: string,
    description: string,
    imageUrl: string,
    name: string,
    price: number
    stockQuantity: number
    __v: number
    _id: string
}

const ProductCard = (props: IProduct) => {
    return (
        <div className='flex flex-col items-center bg-white border border-gray-300 rounded-3xl overflow-hidden shadow-2xl w-[300px] h-auto py-3'>
            <img className='w-[300px]' src={props.imageUrl} alt={props.description} />
            <h1 className='text-3xl'> {props.name} </h1>
            <p className='text-xl text-center'>{props.description}</p>
            <p className='ml-48 mt-8 font-semibold'>{props.price} <span className='absolute mt-1 ml-1'>TL</span></p>
            <Button className='w-52 mt-5'>Satın Al</Button>
        </div>
    )
}

export default ProductCard