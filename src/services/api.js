import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

export const login = async (email, password) => {
  const res = await api.post("/autenticacion/login", { email, password });
  return res.data;
};

export const registro = async (usuario) => {
  //usuario = { nombre, mail, password }
  const res = await api.post("/usuarios/registrar", usuario);
  return res.data;
};
