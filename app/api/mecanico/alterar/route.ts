import { backendAPI } from "@/lib/api";
import { AxiosError } from "axios";
import { NextRequest } from "next/server";
import { BackendErrorResponseType, MecanicoResponseType } from "../cadastrar/route";



export async function PUT(request: NextRequest) {

    const dados = await request.json();

    const data = JSON.stringify(dados);

    let response: MecanicoResponseType;

    try {

        const resultado = await backendAPI.put("/mecanico/alterar", data, {
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