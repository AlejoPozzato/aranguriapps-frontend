import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registro } from "../services/api";
import { Button, TextField, Typography, Box, Alert } from "@mui/material";

export default function Registro() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const data = await registro({ nombre, email, password });
      console.log("Registro exitoso:", data);
      navigate("/"); // Redirige al login
    } catch (err) {
      console.error(err);
      setError("Error al registrar usuario");
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 8,
        p: 4,
        border: "1px solid #ccc",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography variant="h4" mb={3} align="center">
        Registro
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <TextField
          label="Nombre"
          variant="outlined"
          fullWidth
          required
          margin="normal"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          required
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Contraseña"
          type="password"
          variant="outlined"
          fullWidth
          required
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Registrarse
        </Button>
      </form>

      <Typography mt={2} align="center">
        ¿Ya tienes cuenta?{" "}
        <Button onClick={() => navigate("/")} size="small">
          Ingresar
        </Button>
      </Typography>
    </Box>
  );
}


