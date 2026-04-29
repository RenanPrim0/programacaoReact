'use client';

import { useState } from "react";

export default function Home() {

  const [abaAtiva, setAbaAtiva] = useState<string>("clientes");

  return (
    <div className="flex flex-col flex-1 items-center bg-white">

      <div className="font-bold text-2xl bg-[#1a1a2e] text-white w-full p-4">
        <h1>MotoFix - Sistema de OS</h1>
      </div>

      <div className="text-md bg-[#16213e] text-white w-full">
         
          <button
          onClick={() => {abaAtiva === "clientes" ? setAbaAtiva("") : setAbaAtiva("clientes")}}
          className={`px-4 py-2 rounded ${
            abaAtiva === "clientes" ? "bg-[#e639474a] border-b-[#e63946] border-b-3" : "bg-[#16213e] text-white"
          }`}
        >
          Dados dos Clientes
        </button>

          <button
          onClick={() => {abaAtiva === "motos" ? setAbaAtiva("") : setAbaAtiva("motos")}}
          className={`px-4 py-2 rounded ${
            abaAtiva === "motos" ? "bg-[#e639474a] border-b-[#e63946] border-b-3" : "bg-[#16213e] text-white"
          }`}
        >
          Dados das Motos
        </button>

        <button
        onClick={() => {abaAtiva === "mecanicos" ? setAbaAtiva("") : setAbaAtiva("mecanicos")}}
        className={`px-4 py-2 rounded ${
          abaAtiva === "mecanicos" ? "bg-[#e639474a] border-b-[#e63946] border-b-3" : "bg-[#16213e] text-white"
        }`}
        >
          Dados dos Mecânicos
        </button>

        <button
          onClick={() => {abaAtiva === "os" ? setAbaAtiva("") : setAbaAtiva("os")}}
          className={`px-4 py-2 rounded ${
            abaAtiva === "os" ? "bg-[#e639474a] border-b-[#e63946] border-b-3" : "bg-[#16213e] text-white"
          }`}
        >
          Ordens de Serviço
        </button>

        <button
          onClick={() => {abaAtiva === "admin" ? setAbaAtiva("") : setAbaAtiva("admin")}}
          className={`px-4 py-2 rounded ${
            abaAtiva === "admin" ? "bg-[#e639474a] border-b-[#e63946] border-b-3" : "bg-[#16213e] text-white"
          }`}
        >
          Admin
        </button>


      </div>

    </div>
  );
}
