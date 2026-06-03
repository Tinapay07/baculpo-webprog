import { Box, Paper, Stack, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 80 },
  { field: 'firstName', headerName: 'First name', flex: 1, minWidth: 140 },
  { field: 'lastName', headerName: 'Last name', flex: 1, minWidth: 140 },
  { field: 'age', headerName: 'Age', type: 'number', width: 90 },
  { field: 'fullName', headerName: 'Full name', flex: 1.2, minWidth: 180 },
];

const rows = [
  { id: 1, firstName: 'Jon', lastName: 'Snow', age: 14, fullName: 'Jon Snow' },
  { id: 2, firstName: 'Cersei', lastName: 'Lannister', age: 31, fullName: 'Cersei Lannister' },
  { id: 3, firstName: 'Jaime', lastName: 'Lannister', age: 31, fullName: 'Jaime Lannister' },
  { id: 4, firstName: 'Arya', lastName: 'Stark', age: 11, fullName: 'Arya Stark' },
  { id: 5, firstName: 'Daenerys', lastName: 'Targaryen', age: null, fullName: 'Daenerys Targaryen' },
  { id: 6, firstName: null, lastName: 'Melisandre', age: 150, fullName: 'Melisandre' },
  { id: 7, firstName: 'Ferrara', lastName: 'Clifford', age: 44, fullName: 'Ferrara Clifford' },
  { id: 8, firstName: 'Rossini', lastName: 'Frances', age: 36, fullName: 'Rossini Frances' },
  { id: 9, firstName: 'Harvey', lastName: 'Roxie', age: 65, fullName: 'Harvey Roxie' },
];

const UsersPage = () => {
  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h5" sx={{ color: '#111827', fontWeight: 700 }}>
          Users
        </Typography>
        <Typography variant="body2" color="text.secondary">
          User list table using MUI X Data Grid.
        </Typography>
      </Box>

      <Paper elevation={0} sx={{ border: '1px solid #e5e7eb', p: 2, width: '100%' }}>
        <Box sx={{ height: 520, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            disableRowSelectionOnClick
            sx={{
              border: 0,
              '& .MuiDataGrid-columnHeaders': {
                bgcolor: '#f8fafc',
                color: '#111827',
                fontWeight: 800,
              },
            }}
          />
        </Box>
      </Paper>
    </Stack>
  );
};

export default UsersPage;
