import { useState, useEffect } from "react";
import { Box, Typography, Button, Grid, Card, CardContent, Alert, TextField } from "@mui/material";
import DashboardLayout from "../layouts/DashboardLayout";
import { getMaterias, crearMateria } from "../services/api";

export default function Dashboard() {
    const [materias, setMaterias] = useState([]);
    const [error, setError] = useState("");
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [formData, setFormData] = useState({
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
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const nuevaMateria = await crearMateria({
                nombre: formData.nombre,
                profesor: formData.profesor,
                fechaExamen1: formData.fechaExamen1,
                fechaExamen2: formData.fechaExamen2,
                descripcion: formData.descripcion,
            });

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
                // 🔹 Formulario
                <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
                    <TextField label="Nombre" name="nombre" value={formData.nombre} onChange={handleChange} required />
                    <TextField label="Profesor" name="profesor" value={formData.profesor} onChange={handleChange} />
                    <TextField
                        label="Fecha Examen 1"
                        name="fechaExamen1"
                        type="date"
                        value={formData.fechaExamen1}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        label="Fecha Examen 2"
                        name="fechaExamen2"
                        type="date"
                        value={formData.fechaExamen2}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        label="Descripción"
                        name="descripcion"
                        value={formData.descripcion}
                        onChange={handleChange}
                        multiline
                        rows={3}
                    />
                    <Box display="flex" gap={2}>
                        <Button variant="contained" type="submit" color="success">
                            Guardar
                        </Button>
                        <Button variant="outlined" color="error" onClick={() => setMostrarFormulario(false)}>
                            Cancelar
                        </Button>
                    </Box>
                </Box>
            ) : materias.length === 0 ? (
                // 🔹 Estado vacío
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
                // 🔹 Tarjetas con próximas fechas
                <Grid container spacing={3}>
                    {materias.map((m) => {
                        const hoy = new Date();
                        const fecha1 = m.fechaExamen1 ? new Date(m.fechaExamen1) : null;
                        const fecha2 = m.fechaExamen2 ? new Date(m.fechaExamen2) : null;

                        const fechasFuturas = [fecha1, fecha2].filter(f => f && f >= hoy);
                        const proximoExamen = fechasFuturas.length
                            ? new Date(Math.min(...fechasFuturas))
                            : null;

                        return (
                            <Grid item xs={12} sm={6} md={4} key={m.id}>
                                <Card
                                    sx={{
                                        borderRadius: 3,
                                        boxShadow: 2,
                                        transition: "0.3s",
                                        "&:hover": { boxShadow: 6, transform: "translateY(-4px)" },
                                    }}
                                >
                                    <CardContent>
                                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                                            {m.nombre}
                                        </Typography>
                                        <Typography color="text.secondary">
                                            Profesor: {m.profesor || "—"}
                                        </Typography>
                                        <Typography color="text.secondary" sx={{ mt: 1 }}>
                                            Próximo examen: {proximoExamen ? proximoExamen.toLocaleDateString() : "No definido"}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        );
                    })}
                </Grid>
            )}
        </DashboardLayout>
    );
}

