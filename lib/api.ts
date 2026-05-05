export const runtime = "nodejs";
import axios from "axios";

// -------------------------------------------------------------
// VARIÁVEIS DO SISTEMA
// -------------------------------------------------------------

export const modoSistema = process.env.NEXT_PUBLIC_MODO_SISTEMA;

// -------------------------------------------------------------
// INSTÂNCIAS AXIOS
// -------------------------------------------------------------

export const frontendAPI = axios.create({

    baseURL:
        modoSistema === "DEBUG"
            ? "http://informatica03:3000/api"
            : `http://informatica03:3000/api`,
    headers: {
        "Content-Type": "application/json",
    },
});

export const backendAPI = axios.create({
    baseURL:
        modoSistema === "DEBUG"
            ? "http://informatica03:8080"
            : "http://informatica03:8080",
    headers: {
        "Content-Type": "application/json",
    },
});