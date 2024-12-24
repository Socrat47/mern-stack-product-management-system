"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from '@/components/ui/progress';
import { Input } from "@/components/ui/input";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {
    interface IProduct {
        categoryId: {
            _id: string,
            name: string
        },
        description: string,
        imageUrl: string,
        name: string,
        price: number,
        stockQuantity: number,
        __v: number,
        _id: string
    }

    const token = localStorage.getItem("token");
    const [products, setProducts] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [editProduct, setEditProduct] = useState<IProduct | null>(null);
    const [productData, setProductData] = useState({
        name: "",
        description: "",
        price: 0,
        stockQuantity: 0,
        categoryName: "",
        imageUrl: "",
    });
    const [productToDelete, setProductToDelete] = useState<IProduct | null>(null);

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

    const handleAddProduct = () => {
        setEditProduct(null);
        setProductData({
            name: "",
            description: "",
            price: 0,
            stockQuantity: 0,
            categoryName: "",
            imageUrl: "",
        });
        setIsModalOpen(true);
    };

    const handleEditProduct = (product: IProduct) => {
        setEditProduct(product);
        setProductData({
            name: product.name,
            description: product.description,
            price: product.price,
            stockQuantity: product.stockQuantity,
            categoryName: product.categoryId.name,
            imageUrl: product.imageUrl,
        });
        setIsModalOpen(true);
    };

    const handleSaveProduct = async () => {
        try {
            if (editProduct) {
                await axios.put(`http://localhost:4000/products/update-product/${editProduct._id}`, productData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                toast.success("Ürün başarıyla düzenlendi!");
            } else {

                await axios.post("http://localhost:4000/products/create-product", productData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                toast.success("Ürün başarıyla eklendi!");
            }
            setIsModalOpen(false);
            getProducts();
        } catch (err) {
            toast.error("Ürün kaydedilirken bir hata oluştu.");
            console.error("Ürün kaydedilirken bir hata oluştu", err);
        }
    };

    const handleDeleteProduct = async () => {
        if (productToDelete) {
            try {
                await axios.delete(`http://localhost:4000/products/delete-product/${productToDelete._id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                toast.success("Ürün başarıyla silindi!");
                setIsDeleteModalOpen(false);
                getProducts();
            } catch (err) {
                toast.error("Ürün silinirken bir hata oluştu.");
                console.error("Ürün silinirken hata oluştu", err);
            }
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    const calculateTotal = () => {
        return products.reduce((total, product) => total + (product.price * product.stockQuantity), 0);
    };

    const totalProducts = () => {
        return products.reduce((total, product) => total += 1, 0);
    };

    if (loading)
        return (
            <div className="flex items-center justify-center mt-64">
                <Progress className="absolute w-[400px]" value={progress} />
            </div>
        );

    return (
        <div>
            <div>
                <Button className='bg-green-500 hover:bg-green-700 w-52 mt-5 ml-[1200px]' onClick={handleAddProduct}>
                    Ürün Ekle
                </Button>
            </div>

            <div className='ml-20 mt-20'>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">ID</TableHead>
                            <TableHead>Ürün</TableHead>
                            <TableHead>Açıklama</TableHead>
                            <TableHead className="text-right">Fiyat</TableHead>
                            <TableHead className="text-right">Stok Miktarı</TableHead>
                            <TableHead className="text-right">Kategori</TableHead>
                            <TableHead className="text-right">Düzenle</TableHead>
                            <TableHead className="text-right">Sil</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product._id}>
                                <TableCell className="font-medium">{product._id}</TableCell>
                                <TableCell>{product.name}</TableCell>
                                <TableCell>{product.description}</TableCell>
                                <TableCell className="text-right">{product.price} ₺</TableCell>
                                <TableCell className="text-right">{product.stockQuantity}</TableCell>
                                <TableCell className="text-right">{product.categoryId.name}</TableCell>
                                <TableCell className="text-right">
                                    <Button className='bg-yellow-600 hover:bg-yellow-800 w-20' onClick={() => handleEditProduct(product)}>
                                        Düzenle
                                    </Button>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button className='bg-red-600 hover:bg-red-800 w-20' onClick={() => {
                                        setProductToDelete(product);
                                        setIsDeleteModalOpen(true);
                                    }}>
                                        Sil
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={3}>Toplam Ürün Değeri</TableCell>
                            <TableCell className="text-center">{calculateTotal()} TL</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={3}>Toplam Ürün Çeşidi</TableCell>
                            <TableCell className="text-center">{totalProducts()}</TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>


            {isDeleteModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg w-1/3">
                        <h2 className="text-xl mb-4">Ürünü Silmek İstediğinizden Emin Misiniz?</h2>
                        <div className="flex justify-end">
                            <Button className="bg-red-500 hover:bg-red-700" onClick={handleDeleteProduct}>
                                Evet, Sil
                            </Button>
                            <Button className="ml-2" onClick={() => setIsDeleteModalOpen(false)}>
                                Hayır, İptal Et
                            </Button>
                        </div>
                    </div>
                </div>
            )}


            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg w-1/3">
                        <h2 className="text-xl mb-4">{editProduct ? "Ürün Düzenle" : "Yeni Ürün Ekle"}</h2>
                        <div>
                            <label className="block mb-2">Ürün Adı</label>
                            <Input
                                value={productData.name}
                                onChange={(e) => setProductData({ ...productData, name: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block mb-2">Açıklama</label>
                            <Input
                                value={productData.description}
                                onChange={(e) => setProductData({ ...productData, description: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block mb-2">Fiyat</label>
                            <Input
                                type="number"
                                value={productData.price}
                                onChange={(e) => setProductData({ ...productData, price: Number(e.target.value) })}
                            />
                        </div>
                        <div>
                            <label className="block mb-2">Stok Miktarı</label>
                            <Input
                                type="number"
                                value={productData.stockQuantity}
                                onChange={(e) => setProductData({ ...productData, stockQuantity: Number(e.target.value) })}
                            />
                        </div>
                        <div>
                            <label className="block mb-2">Kategori</label>
                            <Input
                                value={productData.categoryName}
                                onChange={(e) => setProductData({ ...productData, categoryName: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block mb-2">Resim URL</label>
                            <Input
                                value={productData.imageUrl}
                                onChange={(e) => setProductData({ ...productData, imageUrl: e.target.value })}
                            />
                        </div>
                        <div className="flex justify-end mt-4">
                            <Button className="bg-blue-500 hover:bg-blue-700" onClick={handleSaveProduct}>
                                Kaydet
                            </Button>
                            <Button className="ml-2" onClick={() => setIsModalOpen(false)}>
                                Kapat
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
