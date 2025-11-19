import { Paper, Typography } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ChartData {
  name: string;
  Gelir: number;
  Gider: number;
}

interface FinancialChartProps {
  data: ChartData[];
}

export const FinancialChart = ({ data }: FinancialChartProps) => {
  return (
    <Paper sx={{ p: 3, height: 400 }} elevation={2}>
      <Typography variant="h6" gutterBottom>
        Finansal Genel Bakış
      </Typography>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Gelir" fill="#2e7d32" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Gider" fill="#d32f2f" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
};