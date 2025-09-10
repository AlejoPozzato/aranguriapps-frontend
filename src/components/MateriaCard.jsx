import { Card, CardContent, Typography } from "@mui/material";

export default function MateriaCard({ materia }) {
    const hoy = new Date();
    const fecha1 = materia.fechaExamen1 ? new Date(materia.fechaExamen1) : null;
    const fecha2 = materia.fechaExamen2 ? new Date(materia.fechaExamen2) : null;

    const fechasFuturas = [fecha1, fecha2].filter((f) => f && f >= hoy);
    const proximoExamen = fechasFuturas.length
        ? new Date(Math.min(...fechasFuturas))
        : null;

    return (
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
                {materia.nombre}
            </Typography>
            <Typography color="text.secondary">
                Profesor: {materia.profesor || "—"}
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 1 }}>
                Próximo examen:{" "}
                {proximoExamen ? proximoExamen.toLocaleDateString() : "No definido"}
            </Typography>
        </CardContent>
    </Card>
  );
}
