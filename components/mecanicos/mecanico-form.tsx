"use client";

import { Button } from "../ui/button";

export default function MecanicoForm() {
  return (
    <>
      <div className="flex flex-col gap-2">
        <label>Nome do mecanico</label>
        <input placeholder="Nome do mecanico"></input>
        <Button variant={"outline"} className="bg-blue-500 text-white">Salvar</Button>
      </div>
    </>
  );
}
