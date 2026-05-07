import {
    Box, 
    Button,
    Container,
    TextField,
    Typography,
    Paper
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import login from "../api/login";

function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleLogin = async () => {
        try {
            const response = await login(formData.email, formData.password);
            localStorage.setItem("token", response.token); // Store token for future requests
            localStorage.setItem("user", JSON.stringify(response.user)); // Store user data if needed
            navigate("/dashboard"); // Redirect to dashboard on successful login
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Admin Login
                </Typography>
                <Box component="form" sx={{ mt: 2 }}>
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        onChange={handleChange}
                        name="email"
                        value={formData.email}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        onChange={handleChange}
                        name="password"
                        value={formData.password}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                        onClick={handleLogin}
                    >
                        Login
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
}

export default Login;