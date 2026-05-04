"use client";

import Navbar from "@/components/dashboard/navbar";
import ClientesPagina from "@/components/clientes/clientes-pagina";

export default function ClientesPage() {
  return (
    <div className="overflow-hidden">
      <Navbar />
      <ClientesPagina />
    </div>
  );
}
