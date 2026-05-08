"use client";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { frontendAPI } from "@/lib/api";
import { toast } from "@/hooks/use-toast";
import axios from "axios";

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { ClienteResponseType } from "@/app/api/cliente/cadastrar/route";
import { MecanicoResponseType } from "@/app/api/mecanico/cadastrar/route";
import { MotoResponseType } from "@/app/api/moto/cadastrar/route";

const schema = z.object({
  cliente_id: z.string().min(1, "Selecione um cliente"),
  moto_id: z.string().min(1, "Selecione uma moto"),
  mecanico_id: z.string().min(1, "Selecione um mecanico"),
  cor: z.string().min(3, "Cor deve conter pelo menos 3 caracteres"),
  placa: z.string().min(7, "Placa deve conter pelo menos 7 caracteres"),
});

type OsForm = z.infer<typeof schema>;

export default function OsForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [atualizarOs, setAtualizarOs] = useState<boolean>(false);
  const [clientesData, setClienteData] = useState<ClienteResponseType[] | null>(
    [],
  );
  const [mecanicoData, setMecanicoData] = useState<
    MecanicoResponseType[] | null
  >([]);
  const [motoData, setMotoData] = useState<MotoResponseType[] | null>([]);
  const [loadingDados, setLoadingDados] = useState<boolean>(false);

  async function getMoto() {
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
    }
  }

  async function getCliente() {
    try {
      const result = await frontendAPI.get("/cliente/listar");

      const clientes = result.data as ClienteResponseType[];

      if (clientes) {
        setClienteData(clientes);
      } else {
        setClienteData([]);
      }
    } catch (error) {
      toast({
        title: "Erro ao buscar clientes. ❌",
        description: "Ocorreu um erro inesperado na API: " + error,
        variant: "destructive",
        className: "text-white font-bold",
      });
    }
  }

  async function getMecanico() {
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
    }
  }

  async function getDados() {
    setLoadingDados(true);
    try {
      await getCliente();
      await getMecanico();
      await getMoto();
    } catch {
    } finally {
      setLoadingDados(false);
    }
  }

  useEffect(() => {
    getDados();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<OsForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      cliente_id: "",
      moto_id: "",
      mecanico_id: ""
    }
  });

  async function onSubmit(data: OsForm) {
    setLoading(true);

    const requestData = {
      cliente_id: data.cliente_id,
      moto_id: data.moto_id,
      mecanico_id: data.mecanico_id
      
    };

    try {
      const response = await frontendAPI.post("/os/cadastrar", requestData);

      const { modelo, errorMessage } = response.data;

      if (modelo) {
        toast({
          title: "Os cadastrado com sucesso! ",
          description: `Os ${modelo} cadastrado!`,
          className: "bg-green-500 text-white font-bold",
        });

        reset();
        setAtualizarOs(true);
      } else {
        toast({
          title: "Erro ao cadastrar Os! ❌",
          description: `${errorMessage || "Erro desconhecido."} `,
          variant: "destructive",
          className: "text-white font-bold",
        });
      }
    } catch (error: unknown) {
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.error
          ? error.response.data.error
          : "API fora do ar, tente novamente mais tarde.";

      toast({
        title: "Erro ao cadastrar Moto! ❌",
        description: errorMessage,
        variant: "destructive",
        className: "text-white font-bold",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="max-w-2xl mx-auto flex flex-col gap-1">
        <Card className="bg-slate-900 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white text-xl">
              Cadastrar Nova Os
            </CardTitle>
            <CardDescription className="text-slate-300">
              Preencha os dados da Os abaixo.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-5">
            {loadingDados ? (
              <div className="flex flex-col items-center justify-center gap-2 text-white">
                <span className="">Carregando dados...</span>
                <Loader2 className="animate-spin size-4"/>

              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                
                <div className="flex flex-col gap-2">
                  <label className="text-white">Selecione um cliente</label>
                  <Combobox
                onValueChange={(value) => setValue("cliente_id", value?.id?.toString() || "0")}
                  items={clientesData || []}
                  itemToStringLabel={(item: ClienteResponseType) =>
                    item?.nome ?? ""
                  }
                >
                  <ComboboxInput
                    className="text-white"
                    placeholder="Selecione um cliente"
                  />
                  <ComboboxContent>
                    <ComboboxEmpty>Não tem clientes disponíveis.</ComboboxEmpty>
                    <ComboboxList className="text-white">
                      {(item) => (
                        <ComboboxItem key={item.id} value={item}>
                          {item.nome}
                        </ComboboxItem>
                      )}
                    </ComboboxList>
                  </ComboboxContent>
                </Combobox>
                {errors.cliente_id?.message && <span className="text-red-500 text-sm">{errors.cliente_id?.message}</span>}

                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-white">Selecione uma moto</label>
                  <Combobox
                onValueChange={(value) => setValue("moto_id", value?.id?.toString() || "0")}
                  items={motoData || []}
                  itemToStringLabel={(item: MotoResponseType) =>
                    item?.modelo ?? ""
                  }
                >
                  <ComboboxInput
                    className="text-white"
                    placeholder="Selecione uma moto"
                  />
                  <ComboboxContent>
                    <ComboboxEmpty>Não tem motos disponíveis.</ComboboxEmpty>
                    <ComboboxList className="text-white">
                      {(item) => (
                        <ComboboxItem key={item.id} value={item}>
                          {item.nome}
                        </ComboboxItem>
                      )}
                    </ComboboxList>
                  </ComboboxContent>
                </Combobox>
                {errors.moto_id?.message && <span className="text-red-500 text-sm">{errors.moto_id?.message}</span>}
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-white">Selecione um mecânico</label>
                  <Combobox
                onValueChange={(value) => setValue("mecanico_id", value?.id?.toString() || "0")}
                  items={mecanicoData || []}
                  itemToStringLabel={(item: MecanicoResponseType) =>
                    item?.nome ?? ""
                  }
                >
                  <ComboboxInput
                    className="text-white"
                    placeholder="Selecione um mecânico"
                  />
                  <ComboboxContent>
                    <ComboboxEmpty>Não tem mecanicos disponíveis.</ComboboxEmpty>
                    <ComboboxList className="text-white">
                      {(item) => (
                        <ComboboxItem key={item.id} value={item}>
                          {item.nome}
                        </ComboboxItem>
                      )}
                    </ComboboxList>
                  </ComboboxContent>
                </Combobox>
                {errors.mecanico_id?.message && <span className="text-red-500 text-sm">{errors.mecanico_id?.message}</span>}
                </div>

                <div className="flex justify-between pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push("/")}
                    className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                  >
                    ← Cancelar
                  </Button>

                  <Button
                    type="submit"
                    className="bg-red-500 hover:bg-red-500 text-white font-semibold"
                  >
                    {loading ? (
                      <Loader2 className="animate-spin size-4" />
                    ) : (
                      "Cadastrar OS"
                    )}
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
