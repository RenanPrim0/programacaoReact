"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { frontendAPI } from "@/lib/api";
import { Lista } from "./dialog";


const schema = z.object({
  nome: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  cpf: z.string().min(14,"CPF deve conter pelo menos 14 caracteres"),
  telefone: z.string().min(9, "Telefone deve conter pelo menos 9 caracteres"),
});

type MecanicoForm = z.infer<typeof schema>;

export default function MecanicoForm() {

  const router = useRouter();
    
    const [loading, setLoading] = useState(false);
    const [atualizarMecanico, setAtualizarMecanico] = useState<boolean>(false);

    const {
      register,
      handleSubmit,
      formState: { errors },
      setValue,
      watch,
      reset,
    } = useForm<MecanicoForm>({
      resolver: zodResolver(schema),
    });

    async function onSubmit(data: MecanicoForm) {
    setLoading(true);

    const requestData = {
      nome: data.nome,
      telefone: data.telefone,
      cpf: data.cpf,
    };

    try {
      const response = await frontendAPI.post(
        "/mecanico/cadastrar",
        requestData,
      );

      const { nome, errorMessage } = response.data;

      if (nome) {
        toast({
          title: "Mecanico cadastrado com sucesso! ",
          description: `Mecanico ${nome} cadastrado!`,
          className: "bg-green-500 text-white font-bold",
        });

        reset();
        setAtualizarMecanico(true);
      } else {
        toast({
          title: "Erro ao cadastrar mecanico! ❌",
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
        title: "Erro ao cadastrar mecanico! ❌",
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
              Cadastrar Novo Mecânico
            </CardTitle>

            <CardDescription className="text-slate-300">
              Preencha os dados abaixo.
            </CardDescription>

          </CardHeader>

          <CardContent className="space-y-5">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="nome" className="text-slate-300">Nome</Label>

                <Input placeholder="Joãozinho Silva"
                  {...register("nome")}
                  className="bg-slate-800 border-slate-700 text-slate-100 placeholder:text-slate-500 focus-visible:ring-0 focus-visible:border-red-500"
                />
                {errors.nome && (
                  <p className="text-red-400 text-xs">{errors.nome.message}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="telefone" className="text-slate-300">Telefone</Label>

                <Input placeholder="(11) 99999-0000"
                  {...register("telefone")}
                  className="bg-slate-800 border-slate-700 text-slate-100 placeholder:text-slate-500 focus-visible:ring-0 focus-visible:border-red-500"
                />
                {errors.nome && (
                  <p className="text-red-400 text-xs">{errors.nome.message}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="cpf" className="text-slate-300">CPF</Label>

                <Input placeholder="123.123.123-12"
                  {...register("cpf")}
                  className="bg-slate-800 border-slate-700 text-slate-100 placeholder:text-slate-500 focus-visible:ring-0 focus-visible:border-red-500"
                />
                {errors.nome && (
                  <p className="text-red-400 text-xs">{errors.nome.message}</p>
                )}
              </div>

              <div className="flex justify-between pt-2">
                <Button type="button"
                variant="outline" 
                onClick={() => router.push("/")}
                className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white">
                    ← Cancelar
                </Button>

                <Button type="submit"                            
                className="bg-red-500 hover:bg-red-500 text-white font-semibold">
                    { loading ? (
                        <Loader2 className="animate-spin size-4" />
                    ) : (
                    "Cadastrar Mecanico"
                    )}
                </Button>
              </div>
            </form>
            <div>
              <Lista></Lista>
            </div>
          </CardContent>
        </Card>       
        
      </div>
    </div>
  );
}

