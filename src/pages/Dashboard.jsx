import { useState, useEffect } from "react";
import { Box, Typography, Button, Grid, Card, CardContent, Alert } from "@mui/material";
import DashboardLayout from "../layouts/DashboardLayout";
import { getMaterias } from "../services/api";

export default function Dashboard() {
    const [materias, setMaterias] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchMaterias() {
            try {
                const data = await getMaterias();
                console.log(data);
                setMaterias(data);
            } catch (err) {
                setError(err.message);
            }
        }
        fetchMaterias();
    }, []);

    return (
        <DashboardLayout>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h4">Mis Materias</Typography>
                <Button variant="contained" color="primary">Agregar Materia</Button>
            </Box>

            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            <Grid container spacing={2}>
                {materias.map((m) => (
                    <Grid item xs={12} sm={6} md={4} key={m.id}>
                        <Card sx={{ cursor: "pointer", "&:hover": { boxShadow: 6 } }}>
                            <CardContent>
                                <Typography variant="h6">{m.nombre}</Typography>
                                <Typography color="text.secondary">Profesor: {m.profesor || ""}</Typography>
                                <Typography color="text.secondary">
                                    Próximo examen: {m.fechaExamen1 || "No definido"}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </DashboardLayout>
    );
}

