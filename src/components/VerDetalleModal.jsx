import { Modal, Box, Typography, List, ListItem, IconButton, Button } from "@mui/material";
import { FiFileText } from "react-icons/fi";

export default function VerDetalleModal({ open, onClose, materia }) {
    if (!materia) return null;

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
                    width: 500,
                    maxHeight: "80vh",
                    overflowY: "auto",
                }}
            >
                <Typography variant="h5" mb={2}>{materia.nombre}</Typography>

                <Typography variant="body1"><b>Profesor:</b> {materia.profesor}</Typography>
                <Typography variant="body1"><b>Fecha de examen 1:</b> {materia.fechaExamen1}</Typography>
                <Typography variant="body1"><b>Fecha de examen 2:</b> {materia.fechaExamen2}</Typography>
                <Typography variant="body1" mb={2}><b>Descripción:</b> {materia.descripcion || "–"}</Typography>

                <Typography variant="subtitle1" mb={1}>Archivos:</Typography>
                {materia.archivos && materia.archivos.length > 0 ? (
                    <List>
                        {materia.archivos.map(a => (
                            <ListItem key={a.id}>
                                <FiFileText style={{ marginRight: 8 }} />
                                <a href={a.url} target="_blank" rel="noreferrer">{a.nombre}</a>
                            </ListItem>
                        ))}
                    </List>
                ) : (
                    <Typography variant="body2" color="text.secondary">No hay archivos.</Typography>
                )}

                <Box mt={3} display="flex" justifyContent="flex-end">
                    <Button variant="contained" onClick={onClose}>Cerrar</Button>
                </Box>
            </Box>
        </Modal>
    );
}
