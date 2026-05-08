"use client";

import { toast } from "@/hooks/use-toast";
import { frontendAPI } from "@/lib/api";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { MotoResponseType } from "@/app/api/moto/cadastrar/route";

interface props {
  atualizar?: boolean;
}

export default function ListaMoto() {
  const [loadingMoto, setLoadingMoto] = useState(false);
  const [motoData, setMotoData] = useState<
    MotoResponseType[] | null
  >([]);

  async function getMoto() {
    setLoadingMoto(true);
    try {
      const result = await frontendAPI.get("/moto/listar");

      const moto = result.data as MotoResponseType[];

      if (moto) {
        setMotoData(moto);
      } else {
        setMotoData([]);
      }
    } catch (error) {
      toast({
        title: "Erro ao buscar motos. ❌",
        description: "Ocorreu um erro inesperado na API: " + error,
        variant: "destructive",
        className: "text-white font-bold",
      });
    } finally {
      setLoadingMoto(false);
    }
  }

  useEffect(() => {
    getMoto();
  }, []);

  return (
    <>
      {loadingMoto ? (
        <span className="text-white flex items-center gap-1 my-2">
          Carregando motos... <Loader2 className="animate-spin size-4" />
        </span>
      ) : (
        <div className="rounded-lg p-4">
            <Card className="bg-slate-900">
                <CardHeader>
                    <CardTitle className="text-white text-xl">
                        <h2>Motos</h2>
                    </CardTitle>
                </CardHeader>
            <CardContent>            
                {motoData && motoData?.length > 0 ? (
                <div className="flex flex-col gap-2 overflow-y-auto">
                {motoData.map((motos) => (
                    <span key={motos.id} className="text-white">
                    Cor: {motos.cor} / Ano: {motos.ano} / Marca : {motos.marca} / Modelo: {motos.modelo} / Placa: {motos.placa}
                    </span>
                ))}
                </div>
                ) : (
                <span className="text-white  my-2">
                Não há motos cadastrados.
                </span>
                )}
          </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}