"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const token = localStorage.getItem("token");
  const router = useRouter();
  if (token) {
    router.push('/dashboard')
  } else {
    router.push('/auth/login')
  }
  return (
    <div></div>
  );
}
