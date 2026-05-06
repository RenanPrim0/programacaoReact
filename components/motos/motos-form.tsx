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
import { frontendAPI } from "@/lib/api";
import { toast } from "@/hooks/use-toast";
import axios from "axios";


const schema = z.object({
  marca: z.string().min(3, "nome deve ter pelo menos 3 caracteres"),
  modelo: z.string().min(3,"Marca deve conter pelo menos 3 caracteres"),
  ano: z.string().min(4, "Ano deve conter pelo menos 4 caracteres"),
  cor: z.string().min(3, "Cor deve conter pelo menos 3 caracteres"),
  placa: z.string().min(7, "Placa deve conter pelo menos 7 caracteres"),
});


type MotoForm = z.infer<typeof schema>;

export default function MotosPagina() {
    const router = useRouter();
    
    const [loading, setLoading] = useState(false);
    const [atualizarClientes, setAtualizarMotos] = useState<boolean>(false);

    const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<MotoForm>({
    resolver: zodResolver(schema),
  });


    async function onSubmit(data: MotoForm) {
        setLoading(true);
    
        const requestData = {
          nome: data.ano,
          endereco: data.cor,
          telefone: data.marca,
          cpf: data.modelo,
          email: data.placa,
        };
    
        try {
          const response = await frontendAPI.post(
            "/motos/cadastrar",
            requestData,
          );
    
          const { nome, errorMessage } = response.data;
    
          if (nome) {
            toast({
              title: "Moto cadastrado com sucesso! ",
              description: `Moto ${nome} cadastrado!`,
              className: "bg-green-500 text-white font-bold",
            });
    
            reset();
            setAtualizarMotos(true);
          } else {
            toast({
              title: "Erro ao cadastrar Moto! ❌",
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

                            <Label htmlFor="modelo" className="text-slate-300">
                                Modelo
                            </Label>
                            <Input
                                placeholder="Ex: Ninja 300"
                                {...register("modelo")}
                                className="bg-slate-800 border-slate-700 text-slate-100 placeholder:text-slate-500 focus-visible:ring-0 focus-visible:border-red-500"
                            />
                            {errors.modelo && (
                                <p className="text-red-400 text-xs">{errors.modelo.message}</p>
                            )}

                        </div>

                        <div className="space-y-1.5">

                            <Label htmlFor="marca" className="text-slate-300">Marca</Label>
                            <Input 
                                placeholder="Ex: Kawasaki"
                                {...register("marca")}
                                className="bg-slate-800 border-slate-700 text-slate-100 placeholder:text-slate-500 focus-visible:ring-0 focus-visible:border-red-500"
                            />
                            {errors.marca && (
                                <p className="text-red-400 text-xs">{errors.marca.message}</p>
                            )}

                        </div>

                        <div className="space-y-1.5">

                            <Label htmlFor="ano" className="text-slate-300">Ano</Label>
                            <Input
                                placeholder="Ex: 2020"
                                {...register("ano")}
                                className="bg-slate-800 border-slate-700 text-slate-100 placeholder:text-slate-500 focus-visible:ring-0 focus-visible:border-red-500"
                            />

                        </div>

                        <div className="space-y-1.5">

                            <Label htmlFor="placa" className="text-slate-300">Placa</Label>
                            <Input
                                placeholder="Ex: DGF-65D5"
                                {...register("placa")}
                                className="bg-slate-800 border-slate-700 text-slate-100 placeholder:text-slate-500 focus-visible:ring-0 focus-visible:border-red-500"
                            />

                        </div>

                        <div className="space-y-1.5">
                            
                            <Label htmlFor="cor" className="text-slate-300">Cor</Label>
                            <Input
                                placeholder="Ex: vermelho"
                                {...register("cor")}
                                className="bg-slate-800 border-slate-700 text-slate-100 placeholder:text-slate-500 focus-visible:ring-0 focus-visible:border-red-500"
                            />

                        </div>

                        <div className="flex justify-between pt-2">

                            <Button type="button"
                            variant="outline" 
                            onClick={() => router.push("/")}
                            className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white">
                                ← Cancelar
                            </Button>

                            <Button type="submit"                            
                            className="bg-red-600 hover:bg-red-500 text-white font-semibold">
                                { loading ? (
                                    <Loader2 className="animate-spin size-4" />
                                ) : (
                                "Cadastrar Moto"
                                )}
                            </Button>

                        </div>
                    </CardContent>            
                </Card>
            </div>
        </div>
    );

}