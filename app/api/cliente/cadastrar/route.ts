import { backendAPI } from "@/lib/api";
import { AxiosError } from "axios";
import { NextRequest } from "next/server";


export type ClienteResponseType = {
    id?: number;
    nome?: string;
    telefone?: string;
    cpf?: string;
    endereco?: string;
    email?: string;
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

    let response: ClienteResponseType;

    try {

        const resultado = await backendAPI.post("/cliente/cadastrar", data, {
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