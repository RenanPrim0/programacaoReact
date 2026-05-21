// app/api/os/cadastrar/route.ts
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";


const schema = z.object({
  clienteId: z.number(),
  motoId: z.number(),
  mecanicosId: z.array(z.number()).min(1),
  descricao: z.string().min(1),
  valor: z.number().positive(),
});

export type OsResponseType = {
  id: number;
  cliente: { id: number; nome: string };
  moto: { id: number; modelo: string };
  mecanicos: { id: number; nome: string }[];
  dataAbertura: string;
  dataFechamento: string;
  descricao: string;
  valor: number;
  status: string;
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { errorMessage: "Dados inválidos.", errors: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const backendResponse = await fetch(`${process.env.API_URL}/ordem-servico/cadastrar`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed.data),
    });

    const data = await backendResponse.json();

    if (!backendResponse.ok) {
      return NextResponse.json(
        { errorMessage: data?.message || "Erro ao cadastrar OS." },
        { status: backendResponse.status }
      );
    }

    return NextResponse.json(data, { status: 200 });

  } catch (error) {
    console.error("Erro ao cadastrar OS:", error);
    return NextResponse.json(
      { errorMessage: "API fora do ar, tente novamente mais tarde." },
      { status: 500 }
    );
  }
}