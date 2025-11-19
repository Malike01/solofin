import { useState, useMemo } from 'react';
import { 
  Box, Container, Grid, Typography, Button, Stack, CircularProgress 
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

// Hooks & Store
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { transactionService } from '@/services/transactionService';
import { TransactionType } from '@/types';
import { SummaryCard } from '@/components/dashboard/SummaryCard';
import { RecentTransactions } from '@/components/transaction/RecentTransactions';
import { FinancialChart } from '@/components/dashboard/FinancialChart';
import { AddTransactionModal } from '@/components/transaction/AddTransactionModal';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

const DashboardPage = () => {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: transactions = [], isLoading } = useQuery({
    queryKey: ['transactions'],
    queryFn: () => transactionService.getAll(),
  });

  const summary = useMemo(() => {
    let income = 0;
    let expense = 0;

    transactions.forEach(t => {
      if (t.type === TransactionType.INCOME) income += t.amount;
      else expense += t.amount;
    });

    return { income, expense, balance: income - expense };
  }, [transactions]);

  const chartData = useMemo(() => [
    {
      name: 'Güncel Durum',
      Gelir: summary.income,
      Gider: summary.expense,
    }
  ], [summary]);

  const handleSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['transactions'] });
  };

  if (isLoading) {
    return <Stack alignItems="center" sx={{ mt: 10 }}><CircularProgress /></Stack>;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Box>
          <Typography variant="h4" fontWeight="bold">
            Merhaba, {user?.full_name?.split(' ')[0] || 'Solo Girişimci'} 👋
          </Typography>
          <Typography color="text.secondary">
            Finansal durumun bugün nasıl görünüyor?
          </Typography>
        </Box>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />} 
          onClick={() => setIsModalOpen(true)}
        >
          İşlem Ekle
        </Button>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, md: 4 }}>
          <SummaryCard 
            title="Toplam Gelir" 
            amount={summary.income} 
            icon={<TrendingUpIcon />} 
            color="#2e7d32" 
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <SummaryCard 
            title="Toplam Gider" 
            amount={summary.expense} 
            icon={<TrendingDownIcon />} 
            color="#d32f2f" 
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <SummaryCard 
            title="Net Durum" 
            amount={summary.balance} 
            icon={<AccountBalanceWalletIcon />} 
            color={summary.balance >= 0 ? "#1976d2" : "#d32f2f"} 
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <RecentTransactions transactions={transactions} />
        </Grid>
        
        <Grid size={{ xs: 12, md: 4 }}>
           <FinancialChart data={chartData} />
        </Grid>
      </Grid>

      <AddTransactionModal 
        open={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={handleSuccess} 
      />
      
    </Container>
  );
};

export default DashboardPage;