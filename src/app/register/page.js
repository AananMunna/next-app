"use client"; 
// 🔑 এই ফাইলটা client-side component (React hooks ব্যবহার করবো)

import { useState } from "react"; // ✅ React state ব্যবহারের জন্য useState হুক
import { signIn } from "next-auth/react"; // ✅ next-auth এর signIn মেথড (অটোমেটিক লগইনের জন্য)
import { useRouter } from "next/navigation"; // ✅ Next.js এ রাউটার (redirect করার জন্য)

export default function RegisterPage() {
  // 🔧 State গুলো ডিক্লেয়ার করছি (form input data রাখার জন্য)
  const [name, setName] = useState("");       // ইউজারের নাম
  const [email, setEmail] = useState("");     // ইউজারের ইমেইল
  const [password, setPassword] = useState(""); // ইউজারের পাসওয়ার্ড
  const [error, setError] = useState("");     // কোনো error হলে দেখানোর জন্য
  const router = useRouter();                 // রাউটার instance

  // 📝 ফর্ম সাবমিট হ্যান্ডলার
  const handleSubmit = async (e) => {
    e.preventDefault(); // ডিফল্ট রিফ্রেশ বন্ধ করো
    setError("");       // আগের error ক্লিয়ার করো

    // 🚀 প্রথমে রেজিস্ট্রেশন API কল করবো
    const res = await fetch("/api/auth/register", {
      method: "POST", // নতুন ডাটা পাঠানোর জন্য POST মেথড
      body: JSON.stringify({ name, email, password }), // name, email, password JSON এ পাঠানো হলো
      headers: { "Content-Type": "application/json" }, // জানাচ্ছি আমরা JSON পাঠাচ্ছি
    });

    const data = await res.json(); // API থেকে রেসপন্স JSON এ রূপান্তর

    // ❌ যদি রেজিস্টার ব্যর্থ হয়, তাহলে error দেখাও
    if (!res.ok) {
      setError(data.message || "কিছু ভুল হয়েছে");
      return;
    }

    // ✅ রেজিস্টার সফল হলে এবার অটোমেটিক লগইন করাও
    const loginRes = await signIn("credentials", {
      redirect: false, // ✅ ম্যানুয়ালি redirect করবো
      email,
      password,
    });

    // ❌ যদি লগইন এ কোনো সমস্যা হয়
    if (loginRes?.error) {
      setError(loginRes.error);
      return;
    }

    // 🎉 লগইন সফল → ইউজারকে হোমপেজে পাঠানো হলো
    router.push("/");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      {/* 🖋️ রেজিস্ট্রেশন ফর্ম */}
      <form 
        onSubmit={handleSubmit} 
        className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full space-y-5"
      >
        <h1 className="text-3xl font-bold text-center text-blue-600">
          Register
        </h1>

        {/* 🔴 যদি error থাকে, সেটা দেখাবে */}
        {error && <p className="text-red-600">{error}</p>}

        {/* নাম ইনপুট */}
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 border rounded"
          required
        />

        {/* ইমেইল ইনপুট */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border rounded"
          required
        />

        {/* পাসওয়ার্ড ইনপুট */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border rounded"
          required
        />

        {/* সাবমিট বাটন */}
        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
        >
          Register & Login
        </button>
      </form>
    </main>
  );
}
