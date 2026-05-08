import { backendAPI } from "@/lib/api";
import { AxiosError } from "axios";
import { NextRequest } from "next/server";


export type MecanicoResponseType = {
    id?: number;
    nome?: string;    
    cpf?: string;
    telefone?: string;
    errorMessage?: string;
};

export type BackendErrorResponseType = {
    errorCode?: string;
    errorMessage?: string;
    errorDescription?: string;
    path?: string;
    date?: Date;
}


export async function POST(request: NextRequest) {

    const dados = await request.json();

    const data = JSON.stringify(dados);

    let response: MecanicoResponseType;

    try {

        const resultado = await backendAPI.post("/mecanico/cadastrar", data, {
            headers: {
                
            }
        });
        const { id, nome, errorMessage } = resultado.data;
        response = { id, nome, errorMessage };

    } catch (e) {
        const axiosError = e as AxiosError;

        const { errorMessage } = axiosError.response?.data as BackendErrorResponseType;

        if (errorMessage) {
            response = { errorMessage };
        }
        else {
            response = { errorMessage: axiosError.message };
        }
    }

    return new Response(JSON.stringify(response));
}