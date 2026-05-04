"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function MotosPagina() {
    const router = useRouter();
    const [modelo, setModelo] = useState("");
    const [marca, setMarca] = useState("");
    const [ano, setAno] = useState("");
    const [placa, setPlaca] = useState("");
    const [cor, setCor] = useState(""); 

    return (
       <div className="min-h-screen bg-slate-950 p-6">
            <div className="max-w-2xl mx-auto">

                <Card className="bg-slate-900 border-slate-700">

                    <CardHeader>
                        <CardTitle className="text-white text-xl">Cadastrar Nova Moto</CardTitle>
                        <CardDescription className="text-slate-300">
                        Preencha os dados da moto abaixo.
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-5">

                        <div className="space-y-1.5">

                            <Label htmlFor="modelo" className="text-slate-300">Modelo</Label>
                            <Input id="modelo" placeholder="Ex: Ninja 300" value={modelo}
                            onChange={(e) => setModelo(e.target.value)}
                            className="bg-slate-800 border-slate-700 text-slate-100 placeholder:text-slate-500 focus-visible:ring-0 focus-visible:border-red-500 focus-visible:shadow-[0_0_0_2px_#ef4444]" />

                        </div>

                        <div className="space-y-1.5">

                            <Label htmlFor="marca" className="text-slate-300">Marca</Label>
                            <Input id="marca" placeholder="Ex: Kawasaki" value={marca}
                            onChange={(e) => setMarca(e.target.value)}
                            className="bg-slate-800 border-slate-700 text-slate-100 placeholder:text-slate-500 focus-visible:ring-0 focus-visible:border-red-500 focus-visible:shadow-[0_0_0_2px_#ef4444]" />

                        </div>

                        <div className="space-y-1.5">

                            <Label htmlFor="ano" className="text-slate-300">Ano</Label>
                            <Input id="ano" placeholder="Ex: 2022" value={ano}
                            onChange={(e) => setAno(e.target.value)}
                            className="bg-slate-800 border-slate-700 text-slate-100 placeholder:text-slate-500 focus-visible:ring-0 focus-visible:border-red-500 focus-visible:shadow-[0_0_0_2px_#ef4444]" />

                        </div>

                        <div className="space-y-1.5">

                            <Label htmlFor="placa" className="text-slate-300">Placa</Label>
                            <Input id="placa" placeholder="Ex: ABC-1234" value={placa}
                            onChange={(e) => setPlaca(e.target.value)}
                            className="bg-slate-800 border-slate-700 text-slate-100 placeholder:text-slate-500 focus-visible:ring-0 focus-visible:border-red-500 focus-visible:shadow-[0_0_0_2px_#ef4444]" />

                        </div>

                        <div className="space-y-1.5">
                            
                            <Label htmlFor="cor" className="text-slate-300">Cor</Label>
                            <Input id="cor" placeholder="Ex: Vermelho" value={cor}
                            onChange={(e) => setCor(e.target.value)}
                            className="bg-slate-800 border-slate-700 text-slate-100 placeholder:text-slate-500 focus-visible:ring-0 focus-visible:border-red-500 focus-visible:shadow-[0_0_0_2px_#ef4444]" />

                        </div>

                        <div className="flex justify-between pt-2">

                            <Button variant="outline" onClick={() => router.push("/clientes")}
                            className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white">
                                ← Cancelar
                            </Button>

                            <Button className="bg-red-600 hover:bg-red-500 text-white font-semibold">
                                Cadastrar Moto
                            </Button>

                        </div>
                    </CardContent>            
                </Card>
            </div>
        </div>
    );

}