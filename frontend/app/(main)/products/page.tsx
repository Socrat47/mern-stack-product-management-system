"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import ProductCard from "./ProductCard";

const Products = () => {

    interface IProduct {
        categoryId: {
            _id: string,
            name: string
        },
        description: string,
        imageUrl: string,
        name: string,
        price: number
        stockQuantity: number
        __v: number
        _id: string
    }

    const token = localStorage.getItem("token");
    const [products, setProducts] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState("");

    const getProducts = async () => {
        if (!token) {
            setError("Giriş yapmalısınız.");
            return;
        }

        setLoading(true);
        setProgress(25);

        try {
            const res = await axios.get("http://localhost:4000/products", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setProgress(75);
            setProducts(res.data.products);
        } catch (err) {
            setError("Ürünler alınırken hata oluştu.");
            console.error(err);
        } finally {
            setProgress(100);
            setTimeout(() => setLoading(false), 500);
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    if (loading)
        return (
            <div className="flex items-center justify-center mt-64">
                <Progress className="absolute w-[400px]" value={progress} />
            </div>
        );

    return (
        <div className="container">
            {error && <p className="text-red-500">{error}</p>}
            <div className="grid grid-cols-4 mt-28 ml-8 gap-5">
                {products.map((p) => (
                    <ProductCard key={p._id} name={p.name} categoryId={p.categoryId._id} description={p.description} imageUrl={p.imageUrl} price={p.price} stockQuantity={p.stockQuantity} __v={p.__v} _id={p._id} />
                ))}
            </div>
        </div>
    );
};

export default Products;
