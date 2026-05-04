"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const link = usePathname();

  const ativo = link.includes("mecanicos") ? "mecanicos" : link.includes("clientes") ? "clientes" : link.includes("motos") ? "motos" : link.includes("os") ? "os" : link.includes("admin") ? "admin" : "clientes";


  
  const [abaAtiva, setAbaAtiva] = useState<string>(ativo);

  const router = useRouter();


  const listaNavbar = [
    { nome: "Dados dos Clientes", link: "clientes" },
    { nome: "Dados das Motos", link: "motos" },
    { nome: "Dados dos Mecânicos", link: "mecanicos" },
    { nome: "Ordens de Serviço", link: "os" },
    { nome: "Admin", link: "admin" },
  ]

  return (
    <div className="flex flex-col flex-1 items-center bg-white">
      <div className="font-bold text-2xl bg-[#1a1a2e] text-white w-full p-4">
        <h1>MotoFix - Sistema de OS</h1>
      </div>

      <div className="text-md bg-[#16213e] text-white w-full">


        {listaNavbar.map((item) => (
          <button
            key={item.link}
            onClick={() => {
              abaAtiva === item.link ? setAbaAtiva("") : setAbaAtiva(item.link); router.push(`/${item.link}`);
            }}
            className={`px-4 py-2 rounded ${
              abaAtiva === item.link
                ? "bg-[#e639474a] border-b-[#e63946] border-b-3"
                : "bg-[#16213e] text-white"
            }`}
          >
            {item.nome}
          </button>
        ))}
          
      </div>
    </div>
  );
}
