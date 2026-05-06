import { backendAPI } from "@/lib/api";
import { AxiosError } from "axios";
import { NextRequest } from "next/server";


export type MotoResponseType = {
    id?: number;
    marca?: string;
    modelo?: string;
    ano?: string;
    cor?: string;
    placa?: string;
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

    let response: MotoResponseType;

    try {

        const resultado = await backendAPI.post("/moto/cadastrar", data, {
            headers: {
                
            }
        });
        const retorno = resultado.data;
        response = retorno;

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