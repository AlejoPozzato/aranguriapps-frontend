import { useState, useEffect } from "react";
import {Box, Typography, Button, Grid, Alert} from "@mui/material";
import DashboardLayout from "../layouts/DashboardLayout";
import { getMaterias, crearMateria } from "../services/api";
import MateriaCard from "../components/MateriaCard";
import MateriaForm from "../components/MateriaForm";

export default function Dashboard() {
    const [materias, setMaterias] = useState([]);
    const [error, setError] = useState("");
    const [mostrarFormulario, setMostrarFormulario] = useState(false); //Controla vista formulario o materias
    const [formData, setFormData] = useState({ //Datos del formulario
        nombre: "",
        profesor: "",
        fechaExamen1: "",
        fechaExamen2: "",
        descripcion: "",
     });

    useEffect(() => {
        async function fetchMaterias() {
            try {
                const data = await getMaterias();
                setMaterias(data);
            } catch (err) {
                setError(err.message);
            }
        }
        fetchMaterias();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev, //Copia los estados anteriores
            [name]: value, //Actualiza el estado correspondiente
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const nuevaMateria = await crearMateria(formData);
            setMaterias((prev) => [...prev, nuevaMateria]);
            setFormData({
                nombre: "",
                profesor: "",
                fechaExamen1: "",
                fechaExamen2: "",
                descripcion: "",
            });
            setMostrarFormulario(false);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <DashboardLayout>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h4" fontWeight="bold" color="primary">
                Mis Materias
            </Typography>
            {!mostrarFormulario && (
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: "#22c55e",
                        "&:hover": { backgroundColor: "#16a34a" },
                        borderRadius: "12px",
                        px: 3,
                        py: 1,
                        boxShadow: 3,
                    }}
                    onClick={() => setMostrarFormulario(true)}
                >
                    + Agregar Materia
                </Button>
            )}
        </Box>

        {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
                {error}
            </Alert>
        )}

        {mostrarFormulario ? (
            <MateriaForm
                formData={formData}
                onChange={handleChange}
                onSubmit={handleSubmit}
                onCancel={() => setMostrarFormulario(false)}
            />
        ) : materias.length === 0 ? (
            <Box
                sx={{
                    mt: 8,
                    textAlign: "center",
                    color: "text.secondary",
                }}
            >
                <Typography variant="h1" sx={{ fontSize: 64 }}>
                    📚
                </Typography>
                <Typography variant="h6" sx={{ mt: 2 }}>
                    Aún no agregaste materias
                </Typography>
                <Typography variant="body2">
                    Comenzá creando la primera con el botón <b>“Agregar Materia”</b>
                </Typography>
            </Box>
        ) : (
            <Grid container spacing={3}>
                {materias.map((m) => (
                    <Grid item xs={12} sm={6} md={4} key={m.id}>
                        <MateriaCard materia={m} />
                    </Grid>
                ))}
            </Grid>
        )}
    </DashboardLayout>
  );
}
