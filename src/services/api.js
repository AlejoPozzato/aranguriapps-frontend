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
        return res.data;
    } catch (error) {
        if (error.response && error.response.data) {
            const data = error.response.data;
            if (typeof data === "object" && !Array.isArray(data)) {
                const firstError = Object.values(data)[0];
                if (firstError) throw new Error(firstError);
            }
            if (data.error) throw new Error(data.error);
        }
        throw new Error("No se pudo conectar con el servidor.");
    }
};

export const registro = async (usuario) => {
    try {
        const res = await api.post("/usuarios/registrar", usuario);
        return res.data;
    } catch (error) {
        if (error.response && error.response.data) {
            const data = error.response.data;
            if (typeof data === "object" && !Array.isArray(data)) {
                const firstError = Object.values(data)[0];
                if (firstError) throw new Error(firstError);
            }
            if (data.error) throw new Error(data.error);
        }
        throw new Error("No se pudo conectar con el servidor.");
    }
};

export const getMaterias = async () => {
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

export const crearMateria = async (materia) => {
    const token = localStorage.getItem("token");

    try {
        const res = await api.post("/materias", materia, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (error) {
        if (error.response && error.response.data) {
            const data = error.response.data;

            //Si viene un objeto con errores de validación
            if (typeof data === "object" && !Array.isArray(data)) {
                const firstError = Object.values(data)[0]; //Tomo primer mensaje
                if (firstError) {
                    throw new Error(firstError);
                }
            }
            //Si es un solo error simple
            if (data.error) {
                throw new Error(data.error);
            }
        }

        throw new Error("No se pudo conectar con el servidor.");
    }
};
