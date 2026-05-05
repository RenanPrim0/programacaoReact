'use client';
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
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
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { frontendAPI } from "@/lib/api";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { ClienteResponseType } from "@/app/api/cliente/cadastrar/route";
import ListaClientes from "./lista-clientes";

const schema = z.object({
  nome: z.string().min(3, "nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("Email inválido"),
  telefone: z.string().min(10, "Telefone inválido"),
  cpf: z.string().length(14, "CPF inválido"),
  endereco: z.string().min(5, "Endereço inválido"),
});

type ClienteForm = z.infer<typeof schema>;

export function ClientesForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [atualizarClientes, setAtualizarClientes] = useState<boolean>(false);


  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<ClienteForm>({
    resolver: zodResolver(schema),
  });



  async function onSubmit(data: ClienteForm) {
    setLoading(true);

    const requestData = {
      nome: data.nome,
      endereco: data.endereco,
      telefone: data.telefone,
      cpf: data.cpf,
      email: data.email,
    };

    try {
      const response = await frontendAPI.post(
        "/cliente/cadastrar",
        requestData,
      );

      const { nome, errorMessage } = response.data;

      if (nome) {
        toast({
          title: "Cliente cadastrado com sucesso! ",
          description: `Cliente ${nome} cadastrado!`,
          className: "bg-green-500 text-white font-bold",
        });

        reset();
        setAtualizarClientes(true);
      } else {
        toast({
          title: "Erro ao cadastrar cliente! ❌",
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
        title: "Erro ao cadastrar cliente! ❌",
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
      <div className="max-w-2xl mx-auto">
        <Card className="bg-slate-900 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white text-xl">
              Cadastrar Novo Cliente
            </CardTitle>
            <CardDescription className="text-slate-300">
              Preencha os dados do cliente abaixo.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-5">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-1.5">
                <Label htmlFor="nome" className="text-slate-300">
                  Nome completo
                </Label>
                <Input
                  placeholder="Ex: José dos Santos"
                  {...register("nome")}
                  className="bg-slate-800 border-slate-700 text-slate-100 placeholder:text-slate-500 focus-visible:ring-0 focus-visible:border-red-500"
                />
                {errors.nome && (
                  <p className="text-red-400 text-xs">{errors.nome.message}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-slate-300">
                    Email
                  </Label>
                  <Input
                    type="email"
                    placeholder="jose@email.com"
                    {...register("email")}
                    className="bg-slate-800 border-slate-700 text-slate-100 placeholder:text-slate-500 focus-visible:ring-0 focus-visible:border-red-500"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-xs">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="telefone" className="text-slate-300">
                    Telefone
                  </Label>
                  <Input
                    placeholder="(11) 99999-0000"
                    {...register("telefone")}
                    className="bg-slate-800 border-slate-700 text-slate-100 placeholder:text-slate-500 focus-visible:ring-0 focus-visible:border-red-500"
                  />
                  {errors.telefone && (
                    <p className="text-red-400 text-xs">
                      {errors.telefone.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="cpf" className="text-slate-300">
                  CPF
                </Label>
                <Input
                  placeholder="999.999.999-99"
                  {...register("cpf")}
                  className="bg-slate-800 border-slate-700 text-slate-100 placeholder:text-slate-500 focus-visible:ring-0 focus-visible:border-red-500"
                />
                {errors.cpf && (
                  <p className="text-red-400 text-xs">{errors.cpf.message}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="endereco" className="text-slate-300">
                  Endereço completo
                </Label>
                <Input
                  placeholder="rua, número, bairro, cidade, CEP"
                  {...register("endereco")}
                  className="bg-slate-800 border-slate-700 text-slate-100 placeholder:text-slate-500 focus-visible:ring-0 focus-visible:border-red-500"
                />
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
                    "Cadastrar Cliente"
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <ListaClientes atualizar={atualizarClientes}/>

        
      </div>
    </div>
  );
}
