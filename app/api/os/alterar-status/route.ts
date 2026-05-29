// app/api/os/alterar-status/route.ts
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  id: z.number(),
  status: z.enum(["ABERTA", "CONCLUIDA", "CANCELADA"]),
});

export async function PATCH(req: NextRequest) {
  try {
        const body = await req.json();

        const parsed = schema.safeParse(body);
        if (!parsed.success) {
            return NextResponse.json(
                { errorMessage: "Dados inválidos." },
                { status: 400 }
            );
        }

        const backendResponse = await fetch(`${process.env.API_URL}/ordem-servico/alterar/status`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(parsed.data),
        });

        const data = await backendResponse.json();

        if (!backendResponse.ok) {
            return NextResponse.json(
                { errorMessage: data?.message || "Erro ao alterar status." },
                { status: backendResponse.status }
            );
        }

        return NextResponse.json(data, { status: 200 });

    } catch (error) {
        console.error("Erro ao alterar status:", error);
        return NextResponse.json(
            { errorMessage: "API fora do ar, tente novamente mais tarde." },
            { status: 500 }
        );
    }
}