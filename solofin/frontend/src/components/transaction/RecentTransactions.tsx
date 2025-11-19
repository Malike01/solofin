import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Chip,
  Box
} from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { TransactionType, type TransactionResponse } from '@/types';

interface RecentTransactionsProps {
  transactions: TransactionResponse[];
}

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
  }).format(amount);
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const RecentTransactions = ({ transactions }: RecentTransactionsProps) => {
  if (transactions.length === 0) {
    return (
      <Paper sx={{ p: 3, textAlign: 'center' }}>
        <Typography color="text.secondary">Henüz bir işlem kaydı bulunmuyor.</Typography>
      </Paper>
    );
  }

  return (
    <TableContainer component={Paper} elevation={2}>
      <Box sx={{ p: 2, borderBottom: '1px solid #eee' }}>
        <Typography variant="h6" component="div">
          Son İşlemler
        </Typography>
      </Box>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Kategori</TableCell>
            <TableCell>Tarih</TableCell>
            <TableCell>Tutar</TableCell>
            <TableCell>Tip</TableCell>
            <TableCell align="right">KDV</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Box>
                  <Typography variant="body1" fontWeight="medium">{row.category}</Typography>
                  {row.description && (
                    <Typography variant="caption" color="text.secondary">{row.description}</Typography>
                  )}
                </Box>
              </TableCell>
              <TableCell>{formatDate(row.date)}</TableCell>
              <TableCell sx={{ 
                  fontWeight: 'bold', 
                  color: row.type === TransactionType.INCOME ? 'success.main' : 'error.main' 
                }}>
                {row.type === TransactionType.INCOME ? '+' : '-'}{formatCurrency(row.amount)}
              </TableCell>
              <TableCell>
                 <Chip 
                   icon={row.type === TransactionType.INCOME ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
                   label={row.type === TransactionType.INCOME ? "Gelir" : "Gider"} 
                   color={row.type === TransactionType.INCOME ? "success" : "error"} 
                   size="small" 
                   variant="outlined"
                 />
              </TableCell>
              <TableCell align="right">%{row.vat_rate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};