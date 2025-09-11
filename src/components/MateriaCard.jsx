import { Card, CardContent, Typography, IconButton, Box, Divider } from "@mui/material";
import { FiTrash2 } from "react-icons/fi";

export default function MateriaCard({ materia, onVerDetalle, onEditar, onEliminar, onArchivos }) {
    const hoy = new Date();
    const fecha1 = materia.fechaExamen1 ? new Date(materia.fechaExamen1) : null;
    const fecha2 = materia.fechaExamen2 ? new Date(materia.fechaExamen2) : null;
    const fechasFuturas = [fecha1, fecha2].filter(f => f && f >= hoy);
    const proximoExamen = fechasFuturas.length ? new Date(Math.min(...fechasFuturas)) : null;

    return (
        <Card
            sx={{
                borderRadius: 3,
                boxShadow: 2,
                position: "relative",
                transition: "0.3s",
                "&:hover": { boxShadow: 6, transform: "translateY(-4px)" },
            }}
        >
            <IconButton
                size="small"
                onClick={() => onEliminar(materia)}
                sx={{ position: "absolute", top: 8, right: 8, color: "error.main" }}
            >
                <FiTrash2 />
            </IconButton>

            <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>{materia.nombre}</Typography>
                <Typography color="text.secondary">Profesor: {materia.profesor || "—"}</Typography>
                <Typography color="text.secondary" sx={{ mt: 1 }}>
                    Próximo examen: {proximoExamen ? proximoExamen.toLocaleDateString() : "No definido"}
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Box display="flex" justifyContent="space-between">
                    <Typography variant="body2" color="primary" sx={{ cursor: "pointer", "&:hover": { textDecoration: "underline" } }} onClick={() => onVerDetalle(materia)}>Ver detalle</Typography>
                    <Typography variant="body2" color="primary" sx={{ cursor: "pointer", "&:hover": { textDecoration: "underline" } }} onClick={() => onEditar(materia)}>Editar</Typography>
                    <Typography variant="body2" color="primary" sx={{ cursor: "pointer", "&:hover": { textDecoration: "underline" } }} onClick={() => onArchivos(materia)}>Archivos</Typography>
                </Box>
            </CardContent>
        </Card>
    );
}


