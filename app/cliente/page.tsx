"use client";

import Navbar from "@/components/dashboard/navbar";
import ClientePagina from "@/components/cliente/cliente-pagina";

export default function ClientePage() {
  return (
    <div className="overflow-hidden">
      <Navbar />
      <ClientePagina />
    </div>
  );
}
