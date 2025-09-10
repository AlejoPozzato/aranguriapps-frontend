import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Box, Button } from "@mui/material";
import { MdAccountCircle } from "react-icons/md";
import { useState } from "react";

export default function DashboardLayout({ children }) {
    const [anchorEl, setAnchorEl] = useState(null); //Anchor Element de Material UI para el menu desplegable

    const handleMenu = (event) => setAnchorEl(event.currentTarget); //Guardo el evento para que Material UI sepa donde anclar el menu
    const handleClose = () => setAnchorEl(null); //Cambio estado Anchor Element Con la funcion onClose de <Menu>
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("userName");
        localStorage.removeItem("userEmail");
        window.location.href = "/";
    };

    const userName = localStorage.getItem("userName");
    const userEmail = localStorage.getItem("userEmail");

    return (
        <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
            {/*Header*/}
            <AppBar position="static">
                <Toolbar sx={{ justifyContent: "space-between" }}>
                    <Typography variant="h6">Organizador de Materias</Typography>
                    <Box>
                        <Button color="inherit" href="/dashboard">
                            Dashboard
                        </Button>
                        <IconButton color="inherit" onClick={handleMenu}>
                            <MdAccountCircle size={24} />
                        </IconButton>
                        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                            <MenuItem disabled>{userName}</MenuItem>
                            <MenuItem disabled>{userEmail}</MenuItem>
                            <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>

            {/*Contenido de la pagina específica*/}
            <Box sx={{ flex: 1, p: 3, backgroundColor: "#f9f9f9" }}>{children}</Box>
        </Box>
    );
}
