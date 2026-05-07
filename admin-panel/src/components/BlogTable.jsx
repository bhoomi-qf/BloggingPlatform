import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";

const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "title", headerName: "Title", width: 200 },
    { field: "author", headerName: "Author", width: 150 },
    { field: "date", headerName: "Date", width: 150 },
];

const rows = [
    { id: 1, title: "First Blog Post", author: "John Doe", date: "2024-01-01" },
    { id: 2, title: "Second Blog Post", author: "Jane Smith", date: "2024-02-01" },
    { id: 3, title: "Third Blog Post", author: "Alice Johnson", date: "2024-03-01" },
];

function BlogTable() {
    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
            />
        </Box>
    );
}

export default BlogTable;