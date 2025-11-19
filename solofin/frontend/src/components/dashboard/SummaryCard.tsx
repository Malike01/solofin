import React from 'react';
import { Paper, Box, Typography } from '@mui/material';
import { formatCurrency } from '../transaction/RecentTransactions';

interface SummaryCardProps {
  title: string;
  amount: number;
  icon: React.ReactNode;
  color: string;
}

export const SummaryCard = ({ title, amount, icon, color }: SummaryCardProps) => (
  <Paper sx={{ p: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} elevation={2}>
    <Box>
      <Typography color="text.secondary" variant="subtitle2" gutterBottom>
        {title}
      </Typography>
      <Typography variant="h5" fontWeight="bold" sx={{ color: color }}>
        {formatCurrency(amount)}
      </Typography>
    </Box>
    <Box sx={{ 
      bgcolor: `${color}15`, 
      p: 1.5, 
      borderRadius: '50%', 
      display: 'flex', 
      color: color 
    }}>
      {icon}
    </Box>
  </Paper>
);