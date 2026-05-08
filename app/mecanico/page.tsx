"use client";

import Navbar from "@/components/dashboard/navbar";
import MecanicoPagina from "@/components/mecanico/mecanico-pagina";

export default function MecanicoPage() {
  return (
    <div className="overflow-hidden">
      <Navbar />
      <MecanicoPagina />
    </div>
  );
}
