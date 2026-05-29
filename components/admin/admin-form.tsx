// app/admin/page.tsx
"use client";
import { useEffect, useState } from "react";
import { frontendAPI } from "@/lib/api";
import { OsResponseType } from "@/app/api/os/cadastrar/route";
import { ClienteResponseType } from "@/app/api/cliente/cadastrar/route";
import { MecanicoResponseType } from "@/app/api/mecanico/cadastrar/route";
import { MotoResponseType } from "@/app/api/moto/cadastrar/route";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, ClipboardList, CheckCircle, XCircle, Users, Wrench, Bike, DollarSign } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import axios from "axios";

type DashboardData = {
  osAbertas: number;
  osConcluidas: number;
  osCanceladas: number;
  valorTotalAberto: number;
  totalClientes: number;
  totalMecanicos: number;
  totalMotos: number;
};

export default function AdminForm() {
  const [loading, setLoading] = useState(true);
  const [dados, setDados] = useState<DashboardData | null>(null);
  const [osList, setOsList] = useState<OsResponseType[]>([]);
  const [loadingAcao, setLoadingAcao] = useState<number | null>(null);

  function calcularDados(os: OsResponseType[], clientes: ClienteResponseType[], mecanicos: MecanicoResponseType[], motos: MotoResponseType[]) {
    setDados({
        osAbertas: os.filter((o) => o.status === "ABERTA").length,
        osConcluidas: os.filter((o) => o.status === "CONCLUIDA").length,
        osCanceladas: os.filter((o) => o.status === "CANCELADA").length,
        valorTotalAberto: os
            .filter((o) => o.status === "ABERTA")
            .reduce((acc, o) => acc + o.valor, 0),
        totalClientes: clientes.length,
        totalMecanicos: mecanicos.length,
        totalMotos: motos.length,
    });
  }

  useEffect(() => {
        async function getAdmin() {
        try {
                const [osRes, clientesRes, mecanicosRes, motosRes] = await Promise.all([
                frontendAPI.get("/os/listar"),
                frontendAPI.get("/cliente/listar"),
                frontendAPI.get("/mecanico/listar"),
                frontendAPI.get("/moto/listar"),
                ]);

                const os = osRes.data as OsResponseType[];
                const clientes = clientesRes.data as ClienteResponseType[];
                const mecanicos = mecanicosRes.data as MecanicoResponseType[];
                const motos = motosRes.data as MotoResponseType[];

                setOsList(os);
                calcularDados(os, clientes, mecanicos, motos);
            } catch (error) {
                console.error("Erro ao carregar dashboard:", error);
            } finally {
                setLoading(false);
            }
        }

        getAdmin();
    }, []);

    async function alterarStatus(id: number, status: "CONCLUIDA" | "CANCELADA") {
        setLoadingAcao(id);
        try {
            const response = await frontendAPI.patch("/os/alterar-status", { id, status });
            const osAtualizada = response.data as OsResponseType;

            if (osAtualizada.id) {
                toast({
                    title: "Status atualizado! ✅",
                    description: `OS #${osAtualizada.id} marcada como ${status}.`,
                    className: "bg-green-500 text-white font-bold",
                });

                // Atualiza a lista e recalcula os cards
                setOsList((prev) => {
                    const updated = prev.map((item) => item.id === osAtualizada.id ? osAtualizada : item);

                    setDados((d) => ({
                        ...d!,
                        osAbertas: updated.filter((o) => o.status === "ABERTA").length,
                        osConcluidas: updated.filter((o) => o.status === "CONCLUIDA").length,
                        osCanceladas: updated.filter((o) => o.status === "CANCELADA").length,
                        valorTotalAberto: updated
                        .filter((o) => o.status === "ABERTA")
                        .reduce((acc, o) => acc + o.valor, 0),
                    }));

                    return updated;
                });
            }
        } catch (error: unknown) {
            const errorMessage =
                axios.isAxiosError(error) && error.response?.data?.errorMessage
                ? error.response.data.errorMessage
                : "Erro ao alterar status.";

            toast({
                title: "Erro ao alterar status! ❌",
                description: errorMessage,
                variant: "destructive",
                className: "text-white font-bold",
            });
        } finally {
            setLoadingAcao(null);
        }
    }

    const statusBadge = (status: string) => {
        const styles: Record<string, string> = {
            ABERTA: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
            CONCLUIDA: "bg-green-500/20 text-green-400 border border-green-500/30",
            CANCELADA: "bg-red-500/20 text-red-400 border border-red-500/30",
        };
        return (
            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${styles[status] ?? ""}`}>
                {status}
            </span>
        );
    };

    if (loading) {
        return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center gap-2 text-white">
            <Loader2 className="animate-spin size-5" />
            <span>Carregando modo admin...</span>
        </div>
        );
    }

    if (!dados) {
        return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
            Erro ao carregar os dados.
        </div>
        );
    }

    const cards = [
        { title: "OS Abertas", value: dados.osAbertas, icon: <ClipboardList className="size-5 text-yellow-400" />, color: "text-yellow-400" },
        { title: "OS Concluídas", value: dados.osConcluidas, icon: <CheckCircle className="size-5 text-green-400" />, color: "text-green-400" },
        { title: "OS Canceladas", value: dados.osCanceladas, icon: <XCircle className="size-5 text-red-400" />, color: "text-red-400" },
        { title: "Valor em Aberto", value: dados.valorTotalAberto.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }), icon: <DollarSign className="size-5 text-emerald-400" />, color: "text-emerald-400" },
        { title: "Clientes", value: dados.totalClientes, icon: <Users className="size-5 text-blue-400" />, color: "text-blue-400" },
        { title: "Mecânicos", value: dados.totalMecanicos, icon: <Wrench className="size-5 text-purple-400" />, color: "text-purple-400" },
        { title: "Motos", value: dados.totalMotos, icon: <Bike className="size-5 text-orange-400" />, color: "text-orange-400" },
    ];

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="max-w-5xl mx-auto flex flex-col gap-6">

        {/* Título */}
        <div>
          <h1 className="text-white text-2xl font-bold">Modo Admin</h1>
          <p className="text-slate-400 text-sm">Visão geral do sistema</p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {cards.map((card) => (
            <Card key={card.title} className="bg-slate-900 border-slate-800">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-slate-400 text-sm font-medium">{card.title}</CardTitle>
                {card.icon}
              </CardHeader>
              <CardContent>
                <span className={`text-2xl font-bold ${card.color}`}>{card.value}</span>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Lista de OS */}
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white text-lg">Ordens de Serviço</CardTitle>
          </CardHeader>
          <CardContent>
            {osList.length === 0 ? (
              <span className="text-slate-400">Nenhuma OS cadastrada.</span>
            ) : (
              <div className="flex flex-col gap-3">
                {osList.map((os) => (
                  <div
                    key={os.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-800 rounded-lg p-4"
                  >
                    {/* Informações */}
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span className="text-white font-semibold">OS #{os.id}</span>
                        {statusBadge(os.status)}
                      </div>
                      <span className="text-slate-400 text-sm">Cliente: <span className="text-slate-300">{os.cliente.nome}</span></span>
                      <span className="text-slate-400 text-sm">Moto: <span className="text-slate-300">{os.moto.modelo}</span></span>
                      <span className="text-slate-400 text-sm">Mecânico: <span className="text-slate-300">{os.mecanicos[0]?.nome ?? "Não atribuído"}</span></span>
                      <span className="text-slate-400 text-sm">Valor: <span className="text-slate-300">{os.valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span></span>
                      <span className="text-slate-400 text-sm">Descrição: <span className="text-slate-300">{os.descricao}</span></span>
                    </div>

                    {/* Botões — só aparecem se ABERTA */}
                    {os.status === "ABERTA" && (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700 text-white"
                          disabled={loadingAcao === os.id}
                          onClick={() => alterarStatus(os.id, "CONCLUIDA")}
                        >
                          {loadingAcao === os.id
                            ? <Loader2 className="animate-spin size-4" />
                            : <><CheckCircle className="size-4 mr-1" />Concluir</>
                          }
                        </Button>
                        <Button
                          size="sm"
                          className="bg-red-600 hover:bg-red-700 text-white"
                          disabled={loadingAcao === os.id}
                          onClick={() => alterarStatus(os.id, "CANCELADA")}
                        >
                          {loadingAcao === os.id
                            ? <Loader2 className="animate-spin size-4" />
                            : <><XCircle className="size-4 mr-1" />Cancelar</>
                          }
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

      </div>
    </div>
  );
}