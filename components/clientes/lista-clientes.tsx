"use client";

import { ClienteResponseType } from "@/app/api/cliente/cadastrar/route";
import { toast } from "@/hooks/use-toast";
import { frontendAPI } from "@/lib/api";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface props {
  atualizar?: boolean;
}

export default function ListaClientes({ atualizar }: props) {
  const [loadingClientes, setLoadingClientes] = useState(false);
  const [clientesData, setClientesData] = useState<
    ClienteResponseType[] | null
  >([]);

  async function getClientes() {
    setLoadingClientes(true);
    try {
      const result = await frontendAPI.get("/cliente/listar");

      const clientes = result.data as ClienteResponseType[];

      if (clientes) {
        setClientesData(clientes);
      } else {
        setClientesData([]);
      }
    } catch (error) {
      toast({
        title: "Erro ao buscar clientes. ❌",
        description: "Ocorreu um erro inesperado na API: " + error,
        variant: "destructive",
        className: "text-white font-bold",
      });
    } finally {
      setLoadingClientes(false);
    }
  }

  useEffect(() => {
    getClientes();
  }, []);

  useEffect(() => {
    if (atualizar) {
      getClientes();
    }
  }, [atualizar]);

  return (
    <>
      {loadingClientes ? (
        <span className="text-white flex items-center gap-1 my-2">
          Carregando clientes... <Loader2 className="animate-spin size-4" />
        </span>
      ) : (
        <div className="rounded-lg p-4">
            <Card className="bg-slate-900">
                <CardHeader>
                    <CardTitle className="text-white text-xl">
                        <h2>Clientes</h2>
                    </CardTitle>
                </CardHeader>
            <CardContent>            
                {clientesData && clientesData?.length > 0 ? (
                <div className="flex flex-col gap-2 overflow-y-auto max-h-[200px]">
                {clientesData.map((cliente) => (
                    <span key={cliente.id} className="text-white">
                    Nome: {cliente.nome} / CPF: {cliente.cpf} / Endereço : {cliente.endereco}
                    </span>
                ))}
                </div>
                ) : (
                <span className="text-white  my-2">
                Não há clientes cadastrados.
                </span>
                )}
          </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
