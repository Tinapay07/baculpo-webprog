import { Box, Paper, Stack, Typography } from '@mui/material';
import { BarChart, PieChart } from '@mui/x-charts';
import { DataGrid } from '@mui/x-data-grid';

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

const columns = [
  { field: 'id', headerName: 'ID', width: 80 },
  { field: 'firstName', headerName: 'First name', flex: 1, minWidth: 130 },
  { field: 'lastName', headerName: 'Last name', flex: 1, minWidth: 130 },
  { field: 'age', headerName: 'Age', type: 'number', width: 90 },
  { field: 'fullName', headerName: 'Full name', flex: 1.2, minWidth: 170 },
];

const summaryCards = [
  { label: 'Total Users', value: '9' },
  { label: 'Average Age', value: '47.8' },
];

const DashboardPage = () => {
  return (
    <Stack spacing={2.5}>
      <Typography variant="h5" sx={{ color: '#111827', fontWeight: 700 }}>
        Dashboard
      </Typography>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
        {summaryCards.map((card) => (
          <Box key={card.label} sx={{ width: { xs: 'calc(50% - 6px)', sm: 110 } }}>
            <Paper elevation={0} sx={{ border: '1px solid #e5e7eb', p: 1.25, height: '100%' }}>
              <Typography variant="body2" color="text.secondary">
                {card.label}
              </Typography>
              <Typography variant="h6" sx={{ mt: 0.5, color: '#111827', fontWeight: 700 }}>
                {card.value}
              </Typography>
            </Paper>
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'minmax(520px, 1fr) 240px' },
          alignItems: 'center',
          columnGap: { xs: 2, md: 8 },
          rowGap: 2,
          maxWidth: 960,
          minHeight: 300,
        }}
      >
        <Box sx={{ minWidth: 0 }}>
          <BarChart
            height={300}
            xAxis={[{ scaleType: 'band', data: ['Q1', 'Q2', 'Q3', 'Q4'], label: 'Quarters' }]}
            series={[
              { data: [35, 44, 24, 34], label: 'Series 1', color: '#3f51f5' },
              { data: [51, 6, 49, 30], label: 'Series 2', color: '#ffb020' },
            ]}
            margin={{ left: 48, right: 24, top: 36, bottom: 52 }}
          />
        </Box>
        <Box sx={{ minWidth: 220, display: 'flex', justifyContent: 'center' }}>
          <PieChart
            height={240}
            width={240}
            series={[
              {
                data: [
                  { id: 0, value: 10, label: '10', color: '#1976d2' },
                  { id: 1, value: 15, label: '15', color: '#ffb020' },
                  { id: 2, value: 20, label: '20', color: '#ff5252' },
                ],
                outerRadius: 86,
                cx: 120,
                cy: 120,
              },
            ]}
          />
        </Box>
      </Box>

      <Box>
        <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 700 }}>
          Users Overview
        </Typography>
        <Paper elevation={0} sx={{ border: '1px solid #e5e7eb', width: '100%' }}>
          <Box sx={{ height: 360, width: '100%' }}>
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
              sx={{ border: 0 }}
            />
          </Box>
        </Paper>
      </Box>
    </Stack>
  );
};

export default DashboardPage;
