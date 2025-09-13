import { useState, useEffect } from "react";
import { Box, Typography, Button, Grid, Alert } from "@mui/material";
import DashboardLayout from "../layouts/DashboardLayout";
import { getMaterias, crearMateria, editarMateria, eliminarMateria } from "../services/api";
import MateriaCard from "../components/MateriaCard";
import MateriaForm from "../components/MateriaForm";
import ArchivosModal from "../components/ArchivoModal";
import VerDetalleModal from "../components/VerDetalleModal";

export default function Dashboard() {
    const [materias, setMaterias] = useState([]);
    const [error, setError] = useState("");
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [materiaSeleccionada, setMateriaSeleccionada] = useState(null);
    const [mostrarArchivos, setMostrarArchivos] = useState(false);
    const [mostrarDetalle, setMostrarDetalle] = useState(false);

    //Fetch a materias
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

    //Submit para creacion o edicion de materia
    const handleSubmit = async (data) => {
        try {
            if (materiaSeleccionada) {
                //Editar materia existente
                const updated = await editarMateria(materiaSeleccionada.id, data);
                setMaterias(prev => prev.map(m => m.id === updated.id ? updated : m));
            } else {
                //Crear nueva materia
                const nuevaMateria = await crearMateria(data);
                setMaterias(prev => [...prev, nuevaMateria]);
            }
            setError("");
            setMateriaSeleccionada(null);
            setMostrarFormulario(false);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleEditar = (materia) => {
        setMateriaSeleccionada(materia);
        setMostrarFormulario(true);
    };

    const handleAgregar = () => {
        setMateriaSeleccionada(null);
        setMostrarFormulario(true);
    };

    const handleArchivos = (materia) => {
        console.log("Abriendo archivos de materia:", materia);
        setMateriaSeleccionada(materia);
        setMostrarArchivos(true);
    };

    const handleVerDetalle = (materia) =>{
        setMateriaSeleccionada(materia);
        setMostrarDetalle(true);
    }

    const handleEliminar = async (materia) => {
        try {
            await eliminarMateria(materia.id);
            setMaterias(prev => prev.filter(m => m.id !== materia.id));
        } catch (err) {
            setError(err.message);
        }
    };

    //Para actualizar archivos en el dashboard luego de subir un archivo.
    const handleActualizarArchivos = (materiaId, nuevosArchivos) => {
        setMaterias(prev =>
            prev.map(m =>
                m.id === materiaId ? { ...m, archivos: nuevosArchivos } : m
            )
        );
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
                        onClick={handleAgregar}
                    >
                        + Agregar Materia
                    </Button>
                )}
            </Box>

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            {mostrarFormulario ? (
                <MateriaForm
                    initialData={materiaSeleccionada || {}}
                    onSubmit={handleSubmit}
                    onCancel={() => {
                        setMostrarFormulario(false);
                        setMateriaSeleccionada(null);
                    }}
                />
            ) : materias.length === 0 ? (
                <Box sx={{ mt: 8, textAlign: "center", color: "text.secondary" }}>
                    <Typography variant="h1" sx={{ fontSize: 64 }}>📚</Typography>
                    <Typography variant="h6" sx={{ mt: 2 }}>Aún no agregaste materias</Typography>
                    <Typography variant="body2">
                        Comenzá creando la primera con el botón <b>“Agregar Materia”</b>
                    </Typography>
                </Box>
            ) : (
                <Grid container spacing={3}>
                    {materias.map(m => (
                        <Grid item xs={12} sm={6} md={4} key={m.id}>
                            <MateriaCard
                                materia={m}
                                onVerDetalle={handleVerDetalle}
                                onEditar={handleEditar}
                                onEliminar={handleEliminar}
                                onArchivos={handleArchivos}
                            />
                        </Grid>
                    ))}
                </Grid>
            )}

            {materiaSeleccionada && (
                <ArchivosModal
                    open={mostrarArchivos}
                    onClose={() => setMostrarArchivos(false)}
                    materia={materiaSeleccionada}
                    onArchivosActualizados={handleActualizarArchivos}
                />
            )}

            {materiaSeleccionada && mostrarDetalle && (
                <VerDetalleModal
                    open={mostrarDetalle}
                    onClose={() => setMostrarDetalle(false)}
                    materia={materiaSeleccionada}
                />
            )}
        </DashboardLayout>
    );
}
