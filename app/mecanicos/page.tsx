"use client";

import Navbar from "@/components/dashboard/navbar";
import MecanicosPagina from "@/components/mecanicos/mecanico-pagina";

export default function MecanicosPage() {
  return (
    <div className="overflow-hidden">
      <Navbar />
      <MecanicosPagina />
    </div>
  );
}
