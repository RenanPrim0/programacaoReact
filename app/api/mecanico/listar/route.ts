import { NextRequest, NextResponse } from "next/server";
import { backendAPI } from "@/lib/api";
import { AxiosError } from "axios";
import { BackendErrorResponseType, MecanicoResponseType } from "../cadastrar/route";

export async function GET(request: NextRequest) {
    let response: BackendErrorResponseType;

    try {
        const result = await backendAPI.get("/mecanico/listar", {
            headers: {
            }
        });

        const retorno = result.data as MecanicoResponseType[];
        return new NextResponse(JSON.stringify(retorno), { status: 200 });

    } catch (e) {
        const axiosError = e as AxiosError;

        const { errorMessage } = axiosError.response?.data as BackendErrorResponseType;

        if (errorMessage) {
            response = { errorMessage };
        }
        else {
            response = { errorMessage: axiosError.message };
        }

        return new NextResponse(JSON.stringify(response), { status: 400 });
    }


}