import { useState, useEffect } from "react";
import { Box, TextField, Button } from "@mui/material";

export default function MateriaForm({ initialData = {}, onSubmit, onCancel }) {
    const [formData, setFormData] = useState({
        nombre: "",
        profesor: "",
        fechaExamen1: "",
        fechaExamen2: "",
        descripcion: "",
    });

    //Actualizo valores si cambia initialData
    useEffect(() => {
        setFormData({
            nombre: initialData.nombre || "",
            profesor: initialData.profesor || "",
            fechaExamen1: initialData.fechaExamen1 || "",
            fechaExamen2: initialData.fechaExamen2 || "",
            descripcion: initialData.descripcion || "",
        });
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
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
                <Button variant="outlined" color="error" onClick={onCancel}>
                    Cancelar
                </Button>
            </Box>
        </Box>
    );
}


