"use client";

import { MecanicoResponseType } from "@/app/api/mecanico/cadastrar/route";
import { toast } from "@/hooks/use-toast";
import { frontendAPI } from "@/lib/api";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";



export function ListaMecanico() {
  const [loadingMecanico, setLoadingMecanico] = useState(false);
  const [mecanicoData, setMecanicoData] = useState<
    MecanicoResponseType[] | null
  >([]);

  async function getMecanico() {
    setLoadingMecanico(true);
    try {
      const result = await frontendAPI.get("/mecanico/listar");

      const mecanico = result.data as MecanicoResponseType[];

      if (mecanico) {
        setMecanicoData(mecanico);
      } else {
        setMecanicoData([]);
      }
    } catch (error) {
      toast({
        title: "Erro ao buscar mecanicos. ❌",
        description: "Ocorreu um erro inesperado na API: " + error,
        variant: "destructive",
        className: "text-white font-bold",
      });
    } finally {
      setLoadingMecanico(false);
    }
  }

  useEffect(() => {
    getMecanico();
  }, []);
  return (
    <>
      {loadingMecanico ? (
        <span className="text-white flex items-center gap-1 my-2">
          Carregando mecanicos... <Loader2 className="animate-spin size-4" />
        </span>
      ) : (
        <div className="rounded-lg p-4">
            <Card className="bg-slate-900">
                <CardHeader>
                    <CardTitle className="text-white text-xl">
                        <h2>Mecanico</h2>
                    </CardTitle>
                </CardHeader>
            <CardContent>            
                {mecanicoData && mecanicoData?.length > 0 ? (
                <div className="flex flex-col gap-2 overflow-y-auto">
                {mecanicoData.map((mecanico) => (
                    <span key={mecanico.id} className="text-white">
                    Nome: {mecanico.nome} / CPF: {mecanico.cpf} / Telefone: {mecanico.telefone}
                    </span>
                ))}
                </div>
                ) : (
                <span className="text-white  my-2">
                Não há mecanicos cadastrados.
                </span>
                )}
          </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}