'use client'

import Navbar from "@/components/dashboard/navbar";
import OsPagina from "@/components/os/os-pagina";

export default function OsPage() {
  return (
    <div className="overflow-hidden">
      <Navbar />
      <OsPagina />
    </div>
  );
}