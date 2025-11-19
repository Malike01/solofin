import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Grid,
  InputAdornment,
  FormControlLabel,
  Switch,
  CircularProgress,
  Alert
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { transactionSchema, type TransactionFormValues } from '../../schemas/transactionSchema';
import { transactionService } from '../../services/transactionService';
import { TransactionType } from '@/types';

interface AddTransactionModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void; 
}

export const AddTransactionModal = ({ open, onClose, onSuccess }: AddTransactionModalProps) => {
  const [error, setError] = useState<string | null>(null);
  
  const { control, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      type: TransactionType.INCOME,
      amount: 0,
      category: '',
      description: '',
      date: new Date().toISOString().split('T')[0], 
      vat_rate: 0,
      is_tax_deductible: true
    }
  });

  const onSubmit = async (data: TransactionFormValues) => {
    setError(null);
    try {
      await transactionService.create(data);
      reset(); 
      onSuccess(); 
      onClose(); 
    } catch (err: any) {
      setError("İşlem eklenirken bir hata oluştu.");
      console.error(err);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Yeni İşlem Ekle</DialogTitle>
      
      <form onSubmit={handleSubmit(()=>{onSubmit})}>
        <DialogContent>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          
          <Grid container spacing={2}>
            <Grid size={{ xs: 12}}>
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label="İşlem Tipi"
                    fullWidth
                    error={!!errors.type}
                    helperText={errors.type?.message}
                  >
                    <MenuItem value={TransactionType.INCOME}>💰 Gelir (Tahsilat)</MenuItem>
                    <MenuItem value={TransactionType.EXPENSE}>💸 Gider (Harcama)</MenuItem>
                  </TextField>
                )}
              />
            </Grid>
            <Grid size={{ xs: 6}}>
              <Controller
                name="amount"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Tutar"
                    type="number"
                    fullWidth
                    InputProps={{
                      startAdornment: <InputAdornment position="start">₺</InputAdornment>,
                    }}
                    error={!!errors.amount}
                    helperText={errors.amount?.message}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 6 }}>
              <Controller
                name="date"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Tarih"
                    type="date"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.date}
                    helperText={errors.date?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
               <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Kategori (Örn: Yazılım, Yemek, Kira)"
                    fullWidth
                    error={!!errors.category}
                    helperText={errors.category?.message}
                  />
                )}
              />
            </Grid>
             <Grid size={{ xs: 6 }}>
              <Controller
                name="vat_rate"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label="KDV Oranı"
                    fullWidth
                  >
                    <MenuItem value={0}>%0</MenuItem>
                    <MenuItem value={1}>%1</MenuItem>
                    <MenuItem value={10}>%10</MenuItem>
                    <MenuItem value={20}>%20</MenuItem>
                  </TextField>
                )}
              />
            </Grid>
            <Grid size={{ xs: 6 }} sx={{ display: 'flex', alignItems: 'center' }}>
              <Controller
                name="is_tax_deductible"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Switch checked={field.value} onChange={field.onChange} />}
                    label="Gider olarak düşülebilir"
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Açıklama (Opsiyonel)"
                    fullWidth
                    multiline
                    rows={2}
                  />
                )}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} color="inherit">İptal</Button>
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {isSubmitting ? <CircularProgress size={24} /> : "Kaydet"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};