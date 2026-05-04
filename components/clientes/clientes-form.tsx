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

export function ClientesForm() {
  
    const router = useRouter();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cpf, setCpf] = useState("");
  const [endereco, setEndereco] = useState("");

  return (
    <div className="min-h-screen bg-slate-950 p-6">
        <div className="max-w-2xl mx-auto">

            <Card className="bg-slate-900 border-slate-700">
                <CardHeader>
                    <CardTitle className="text-white text-xl">Cadastrar Novo Cliente</CardTitle>
                    <CardDescription className="text-slate-300">
                    Preencha os dados do cliente abaixo.
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-5">

                    <div className="space-y-1.5">
                        <Label htmlFor="nome" className="text-slate-300">Nome completo</Label>
                        <Input id="nome" placeholder="Ex: João da Silva" value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        className="bg-slate-800 border-slate-700 text-slate-100 placeholder:text-slate-500 focus-visible:ring-0 focus-visible:border-red-500 focus-visible:shadow-[0_0_0_2px_#ef4444]" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <Label htmlFor="email" className="text-slate-300">Email</Label>
                            <Input id="email" type="email" placeholder="joao@email.com" value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-slate-800 border-slate-700 text-slate-100 placeholder:text-slate-500 focus-visible:ring-0 focus-visible:border-red-500 focus-visible:shadow-[0_0_0_2px_#ef4444]" />
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="telefone" className="text-slate-300">Telefone</Label>
                            <Input id="telefone" placeholder="(11) 99999-0000" value={telefone}
                            onChange={(e) => setTelefone(e.target.value)}
                            className="bg-slate-800 border-slate-700 text-slate-100 placeholder:text-slate-500 focus-visible:ring-0 focus-visible:border-red-500 focus-visible:shadow-[0_0_0_2px_#ef4444]" />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="cpf" className="text-slate-300">CPF</Label>
                        <Input id="cpf" placeholder="000.000.000-00" value={cpf}
                        onChange={(e) => setCpf(e.target.value)}
                        className="bg-slate-800 border-slate-700 text-slate-100 placeholder:text-slate-500 focus-visible:ring-0 focus-visible:border-red-500 focus-visible:shadow-[0_0_0_2px_#ef4444]" />
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="endereco" className="text-slate-300">Endereço completo</Label>
                        <Input id="endereco" placeholder="Rua, número, bairro, cidade — CEP" value={endereco}
                        onChange={(e) => setEndereco(e.target.value)}
                        className="bg-slate-800 border-slate-700 text-slate-100 placeholder:text-slate-500 focus-visible:ring-0 focus-visible:border-red-500 focus-visible:shadow-[0_0_0_2px_#ef4444]" />
                    </div>

                    <div className="flex justify-between pt-2">
                        <Button variant="outline" onClick={() => router.push("/")}
                            className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white">
                                ← Cancelar
                        </Button>
                        <Button className="bg-red-600 hover:bg-red-500 text-white font-semibold">
                            Cadastrar Cliente
                        </Button>
                    </div>

                </CardContent>
            </Card>
        </div>
    </div>

    );
}