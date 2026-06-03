import { Box, Paper, Stack, Typography } from '@mui/material';
import { BarChart, LineChart, PieChart } from '@mui/x-charts';

const ReportsPage = () => {
  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h5" sx={{ color: '#111827', fontWeight: 700 }}>
          Reports
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Charts and data visualization using MUI X Charts.
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: 'minmax(620px, 1fr) 300px' },
          gap: 2.5,
          alignItems: 'stretch',
        }}
      >
        <Box sx={{ minWidth: 0 }}>
          <Paper elevation={0} sx={{ border: '1px solid #e5e7eb', p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 800 }}>
              Quarterly Comparison
            </Typography>
            <BarChart
              height={360}
              xAxis={[{ scaleType: 'band', data: ['Q1', 'Q2', 'Q3', 'Q4'], label: 'Quarters' }]}
              series={[
                { data: [35, 44, 24, 34], label: 'Series 1', color: '#3f51f5' },
                { data: [51, 6, 49, 30], label: 'Series 2', color: '#ffb020' },
              ]}
              margin={{ left: 52, right: 28, top: 36, bottom: 56 }}
            />
          </Paper>
        </Box>
        <Box>
          <Paper elevation={0} sx={{ border: '1px solid #e5e7eb', p: 2, height: '100%' }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 800 }}>
              User Distribution
            </Typography>
            <PieChart
              height={300}
              width={300}
              series={[
                {
                  data: [
                    { id: 0, value: 10, label: 'Admin', color: '#1976d2' },
                    { id: 1, value: 15, label: 'Staff', color: '#ffb020' },
                    { id: 2, value: 20, label: 'Users', color: '#ff5252' },
                  ],
                  outerRadius: 98,
                  cx: 150,
                  cy: 150,
                },
              ]}
            />
          </Paper>
        </Box>
        <Box sx={{ minWidth: 0, gridColumn: '1 / -1' }}>
          <Paper elevation={0} sx={{ border: '1px solid #e5e7eb', p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 800 }}>
              Trend Line
            </Typography>
            <LineChart
              height={300}
              xAxis={[{ scaleType: 'point', data: ['Q1', 'Q2', 'Q3', 'Q4'] }]}
              series={[{ data: [28, 38, 34, 52], label: 'Activity', color: '#1976d2' }]}
              margin={{ left: 44, right: 24, top: 32, bottom: 36 }}
            />
          </Paper>
        </Box>
      </Box>
    </Stack>
  );
};

export default ReportsPage;
