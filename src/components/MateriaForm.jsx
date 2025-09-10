import { Box, TextField, Button } from "@mui/material";

export default function MateriaForm({ formData, onChange, onSubmit, onCancel }) {
    return (
        <Box
            component="form"
            onSubmit={onSubmit}
            display="flex"
            flexDirection="column"
            gap={2}
        >
        <TextField
            label="Nombre"
            name="nombre"
            value={formData.nombre}
            onChange={onChange}
            required
        />
        <TextField
            label="Profesor"
            name="profesor"
            value={formData.profesor}
            onChange={onChange}
        />
        <TextField
            label="Fecha Examen 1"
            name="fechaExamen1"
            type="date"
            value={formData.fechaExamen1}
            onChange={onChange}
            InputLabelProps={{ shrink: true }}
        />
        <TextField
            label="Fecha Examen 2"
            name="fechaExamen2"
            type="date"
            value={formData.fechaExamen2}
            onChange={onChange}
            InputLabelProps={{ shrink: true }}
        />
        <TextField
            label="Descripción"
            name="descripcion"
            value={formData.descripcion}
            onChange={onChange}
            multiline
            rows={3}
        />
        <Box display="flex" gap={2}>
            <Button variant="contained" type="submit" color="success">
                Guardar
            </Button>
            <Button variant="outlined" color="error" onClick={onCancel}>
                Cancelar
            </Button>
        </Box>
    </Box>
  );
}