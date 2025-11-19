import React from 'react';
import { Box, Button, Container, Typography, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import HomeIcon from '@mui/icons-material/Home';
import ReplayIcon from '@mui/icons-material/Replay';

interface ErrorPageProps {
  code?: number | string;     
  title?: string;             
  message?: string;          
  showHomeButton?: boolean;   
  onRetry?: () => void;      
}

const ErrorPage: React.FC<ErrorPageProps> = ({
  code = 404,
  title = 'Sayfa Bulunamadı',
  message = 'Üzgünüz, erişmeye çalıştığınız sayfayı bulamadık. Adresi yanlış yazmış olabilir veya sayfa taşınmış olabilir.',
  showHomeButton = true,
  onRetry
}) => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: 'background.default',
        p: 3
      }}
    >
      <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
        <Box sx={{ mb: 4, position: 'relative', display: 'inline-flex' }}>
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: theme.palette.error.main,
              opacity: 0.1,
              borderRadius: '50%',
              filter: 'blur(20px)',
              transform: 'scale(1.5)',
            }}
          />
          <ErrorOutlineIcon 
            sx={{ 
              fontSize: '8rem', 
              color: 'error.main',
              position: 'relative' 
            }} 
          />
        </Box>

        <Typography 
          variant="h1" 
          fontWeight="bold" 
          color="text.primary"
          sx={{ 
            fontSize: { xs: '4rem', md: '6rem' },
            lineHeight: 1,
            mb: 2
          }}
        >
          {code}
        </Typography>

        <Typography variant="h4" fontWeight="bold" gutterBottom>
          {title}
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          {message}
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          {showHomeButton && (
            <Button
              variant="contained"
              size="large"
              startIcon={<HomeIcon />}
              onClick={() => navigate('/dashboard')}
            >
              Ana Sayfaya Dön
            </Button>
          )}

          {onRetry && (
            <Button
              variant="outlined"
              size="large"
              startIcon={<ReplayIcon />}
              onClick={onRetry}
            >
              Tekrar Dene
            </Button>
          )}
        </Box>

      </Container>
    </Box>
  );
};

export default ErrorPage;