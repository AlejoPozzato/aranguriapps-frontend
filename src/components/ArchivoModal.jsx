import { useState, useEffect } from "react";
import { Modal, Box, Typography, Button, List, ListItem, IconButton } from "@mui/material";
import { FiTrash2 } from "react-icons/fi";
import { agregarArchivo, eliminarArchivo, getArchivos } from "../services/api";

export default function ArchivosModal({ open, onClose, materia }) {
    const [archivos, setArchivos] = useState([]);
    const [archivoSeleccionado, setArchivoSeleccionado] = useState(null);

    const materiaId = materia?.id;

    useEffect(() => {
        if (open && materiaId) fetchArchivos();
    }, [open, materiaId]);

    const fetchArchivos = async () => {
        if (!materiaId) return;
        try {
            const data = await getArchivos(materiaId);
            setArchivos(data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleUpload = async () => {
        if (!archivoSeleccionado || !materiaId) return;

        const archivoData = {
            nombre: archivoSeleccionado.name,
            tipo: archivoSeleccionado.type,
            url: `https://mock.com/archivos/${archivoSeleccionado.name}`,
        };

        try {
            const nuevoArchivo = await agregarArchivo(materiaId, archivoData);
            setArchivoSeleccionado(null);
            fetchArchivos();
        } catch (err) {
            console.error(err);
        }
    };

    const handleEliminar = async (archivoId) => {
        if (!materiaId) return;
        try {
            await eliminarArchivo(materiaId, archivoId);
            fetchArchivos();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    bgcolor: "background.paper",
                    p: 4,
                    borderRadius: 2,
                    width: 400,
                }}
            >
                <Typography variant="h6" mb={2}>Archivos de la materia</Typography>

                {/* Input de archivo */}
                <Box display="flex" gap={1} mb={2}>
                    <input
                        type="file"
                        onChange={e => setArchivoSeleccionado(e.target.files[0])}
                    />
                    <Button
                        variant="contained"
                        onClick={handleUpload}
                        disabled={!archivoSeleccionado}
                    >
                        Subir
                    </Button>
                </Box>

                {/* Lista de archivos */}
                <List>
                    {archivos.map(a => (
                        <ListItem
                            key={a.id}
                            secondaryAction={
                                <IconButton edge="end" onClick={() => handleEliminar(a.id)}>
                                    <FiTrash2 />
                                </IconButton>
                            }
                        >
                            {a.nombre}
                        </ListItem>
                    ))}
                </List>

                <Box mt={2} display="flex" justifyContent="flex-end">
                    <Button onClick={onClose}>Cerrar</Button>
                </Box>
            </Box>
        </Modal>
    );
}

