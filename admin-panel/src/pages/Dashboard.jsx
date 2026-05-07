import { Box, Toolbar, Typography, Paper } from "@mui/material";
import Navbar from "../components/Navbar";
import BlogTable from "../components/BlogTable";
import Sidebar from "../components/Sidebar";

const drawerWidth = 240;

function Dashboard() {
    return (
        <Box sx={{ display: "flex" }}>
            <Navbar />
            <Sidebar />
            <Box component="main" sx={{ flexGrow: 1, p: 3, width: `(calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, mt: '64px' }}>
                <Toolbar />
                <Typography variant="h4" gutterBottom mb={3}>
                    Dashboard
                </Typography>
                <Paper sx={{ p: 2 }}>
                    <Typography variant="h6" mb={2}>
                        Blog List
                    </Typography>
                    <BlogTable />
                </Paper>
            </Box>
        </Box>
    );
}

export default Dashboard;