"Use client";

import { OsResponseType } from "@/app/api/os/cadastrar/route";
import { frontendAPI } from "@/lib/api";
import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface props {
  atualizar?: boolean;
}

export function ListaOs() {
  const [loadingOs, setLoadingOs] = useState(false);
  const [osData, setOsData] = useState<
    OsResponseType[] | null
  >([]);

  async function getOs() {
    setLoadingOs(true);
    try {
      const result = await frontendAPI.get("/os/listar");

      const os = result.data as OsResponseType[];

      if (os) {
        setOsData(os);
      } else {
        setOsData([]);
      }
    } catch (error) {
      toast({
        title: "Erro ao buscar ordens de serviço. ❌",
        description: "Ocorreu um erro inesperado na API: " + error,
        variant: "destructive",
        className: "text-white font-bold",
      });
    } finally {
      setLoadingOs(false);
    }
  }

  useEffect(() => {
    getOs();
  }, []);

  return (
    <>
      {loadingOs ? (
        <span className="text-white flex items-center gap-1 my-2">
          Carregando ordens de serviço... <Loader2 className="animate-spin size-4" />
        </span>
      ) : (
        <div className="rounded-lg p-4">
            <Card className="bg-slate-900">
                <CardHeader>
                    <CardTitle className="text-white text-xl">
                        <h2>Ordens de Serviço</h2>
                    </CardTitle>
                </CardHeader>
            <CardContent>            
                {osData && osData?.length > 0 ? (
                <div className="flex flex-col gap-2 overflow-y-auto">
                {osData.map((os) => (
                    <span key={os.id} className="text-white">
                    CLIENTE: {os.cliente.nome} /  
                    MOTO: {os.moto.modelo} /  
                    DATA DE ABERTURA: {os.dataAbertura} /  
                    DESCRIÇÃO: {os.descricao} /  
                    MECANICO: {os.mecanicos[0]?.nome || "Não atribuído"} /  
                    DATA DE FECHAMENTO: {os.dataFechamento} /  
                    VALOR: {os.valor} /  
                    STATUS: {os.status}  
                    </span>
                ))}
                </div>
                ) : (
                <span className="text-white  my-2">
                Não há ordens de serviço cadastradas.
                </span>
                )}
          </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}