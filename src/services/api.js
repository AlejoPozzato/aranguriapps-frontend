import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
      "Content-Type": "application/json",
    }
});

export const login = async (email, password) => {
    try {
        const res = await api.post("/autenticacion/login", { email, password });
        console.log("Login exitoso");
        return res.data;
    } catch (error) {
        if (error.response && error.response.data?.error) {
            throw new Error(error.response.data.error); //mensaje del backend
        }
        throw new Error("No se pudo conectar con el servidor.");
    }
};

export const registro = async (usuario) => {
    //usuario = { nombre, email, password }
    try {
        const res = await api.post("/usuarios/registrar", usuario);
        return res.data;
    } catch (error) {
        if (error.response && error.response.data?.error) {
            //mensaje del backend
            throw new Error(error.response.data.error);
        }
        throw new Error("No se pudo conectar con el servidor.");
    }
};

export async function getMaterias() {
    const token = localStorage.getItem("token");

    try {
        const res = await api.get("/materias", {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (error) {
        if (error.response && error.response.data?.error) {
            throw new Error(error.response.data.error); //mensaje del backend
        }
        throw new Error("No se pudo conectar con el servidor.");
    }
}
