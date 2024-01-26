'use client';

import { useState } from "react";

export default function Home() {
  const [talla, setTalla] = useState("");
  const [peso, setPeso] = useState("");
  const [text, setText] = useState("");
  const [imc, setImc] = useState("");

  const handdleSubmit = (e) => {
    const r = (Number(peso)/(Number(talla/100)*Number(talla/100))).toFixed(2);
    e.preventDefault();
    fetch(`${process.env.NEXT_PUBLIC_API}/add`, {
      method: "post",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({talla: Number(talla), peso: Number(peso), response: r})
    }).then((r) => r.json())
    .then((r) => console.log(r))
    .catch((r) => console.error(r))
    .finally(() => {
      setImc("" + r)
      setPeso("");
      setTalla("");
      setText("Gracias");
      setTimeout(() => {
        setText("");
      }, 3000)
    });
  };
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10 text-xl">
      <form
        onSubmit={handdleSubmit}
        className="w-full max-w-md flex flex-col gap-10 dark:bg-gray-900  bg-slate-50 p-10 rounded-xl shadow-lg"
      >
        <h1 className="uppercase sm:text-5xl text-3xl font-extrabold text-center">
          Calculadora de ICM
        </h1>
        <label className="flex gap-4 justify-center items-center">
          <span className="">
            Peso:
          </span>
          <input
          onChange={(e) => setPeso(e.target.value)}
          value={peso} type="number"
          className="text-center border-solid border-[1px] border-gray-400 p-2 rounded-md w-full max-w-20 dark:text-black" />
          <span className="ml-[-12px]">kg</span>
        </label>
        <label className="flex gap-4 justify-center items-center">
          <span className="">
            Talla:
          </span>
          <input
            onChange={(e) => setTalla(e.target.value)}
            value={talla}
            type="number"
            className="text-center border-solid border-[1px] border-gray-400 p-2 rounded-md w-full max-w-20 dark:text-black" />
          <span className="ml-[-12px]">cm</span>
        </label>
        <button type="submit" className="px-4 py-2 rounded-md bg-purple-600 text-white font-bold">
          Calcular
        </button>
        <h2 className="uppercase text-2xl font-extrabold text-center">
          Aqui saldra tu IMC:
        </h2>
        <h2 className="uppercase text-2xl font-extrabold text-center text-red-950">
          {imc}
        </h2>
        <h2 className="uppercase text-5xl font-extrabold text-center">
          {text}
        </h2>
      </form>
    </main>
  );
}
