import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Box, Button, Divider } from "@mui/material";
import { MdAccountCircle } from "react-icons/md";
import { useState } from "react";

export default function DashboardLayout({ children }) {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenu = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

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
            {/* Header */}
            <AppBar
                position="static"
                sx={{
                    background: "linear-gradient(90deg, #2563eb 0%, #1e40af 100%)",
                    boxShadow: 3,
                }}
            >
                <Toolbar sx={{ justifyContent: "space-between" }}>
                    <Typography variant="h6" fontWeight="bold">
                        Organizador de Materias
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Button
                            color="inherit"
                            href="/dashboard"
                            sx={{
                                textTransform: "none",
                                fontWeight: "bold",
                                "&:hover": {
                                    backgroundColor: "rgba(255,255,255,0.1)",
                                },
                            }}
                        >
                            Dashboard
                        </Button>
                        <IconButton
                            color="inherit"
                            onClick={handleMenu}
                            sx={{
                                backgroundColor: "rgba(255,255,255,0.15)",
                                "&:hover": {
                                    backgroundColor: "rgba(255,255,255,0.3)",
                                },
                                borderRadius: "50%",
                                p: 1,
                            }}
                        >
                            <MdAccountCircle size={28} />
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                            PaperProps={{
                                sx: {
                                    mt: 1.5,
                                    borderRadius: 2,
                                    boxShadow: 3,
                                    minWidth: 220,
                                },
                            }}
                        >
                            <Box sx={{ px: 2, py: 1 }}>
                                <Typography fontWeight="bold">{userName}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {userEmail}
                                </Typography>
                            </Box>
                            <Divider />
                            <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Contenido */}
            <Box sx={{ flex: 1, p: 3, backgroundColor: "#f5f7fa" }}>{children}</Box>
        </Box>
    );
}
