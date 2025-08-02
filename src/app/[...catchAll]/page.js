// app/[...catchAll]/page.jsx
"use client";
import { useParams } from "next/navigation";

export default function CatchAll() {
  const params = useParams();
  
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold text-red-500">Page Not Found</h1>
      <p className="mt-2 text-gray-700">
        You tried visiting: <code>{JSON.stringify(params.catchAll)}</code>
      </p>
    </div>
  );
}
