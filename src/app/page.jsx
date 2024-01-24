'use client';

import { useState } from "react";

export default function Home() {
  const [talla, setTalla] = useState("");
  const [peso, setPeso] = useState("");

  const handdleSubmit = (e) => {
    e.preventDefault();
    fetch(`${process.env.NEXT_PUBLIC_API}/add`, {
      method: "post",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({talla: Number(talla), peso: Number(peso), response: peso/(talla*talla)})
    }).then((r) => r.json())
    .then((r) => console.log(r))
    .catch((r) => console.error(r))
  };
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 text-xl">
      <form
        onSubmit={handdleSubmit}
        className="w-full max-w-md flex flex-col gap-10 bg-slate-50 p-10 rounded-xl shadow-lg"
      >
        <h1 className="uppercase text-5xl font-extrabold text-center">
          Calculadora de ICM
        </h1>
        <label className="flex gap-4 justify-center items-center">
          <span className="">
            Peso:
          </span>
          <input onChange={(e) => setPeso(e.target.value)} value={peso} type="number" className="text-center border-solid border-[1px] border-gray-400 p-2 rounded-md w-full max-w-20" />
          <span className="ml-[-12px]">kg</span>
        </label>
        <label className="flex gap-4 justify-center items-center">
          <span className="">
            Talla:
          </span>
          <input onChange={(e) => setTalla(e.target.value)} value={talla} type="number" className="text-center border-solid border-[1px] border-gray-400 p-2 rounded-md w-full max-w-20" />
          <span className="ml-[-12px]">cm</span>
        </label>
        <button type="submit" className="px-4 py-2 rounded-md bg-purple-600 text-white font-bold">
          Calcular
        </button>
      </form>
    </main>
  );
}
