import { Box, Button, Container, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: 'background.default',
        textAlign: 'center',
        padding: 4,
      }}
    >
      <Container maxWidth="sm">
        <Typography 
          variant="h1" 
          component="h1" 
          sx={{ 
            fontWeight: 700, 
            fontSize: 'clamp(6rem, 20vw, 12rem)', 
            color: 'primary.main',
            lineHeight: 1,
          }}
        >
          404
        </Typography>

        <Typography 
          variant="h5" 
          component="h2" 
          sx={{ 
            marginTop: 2, 
            marginBottom: 3,
            color: 'text.secondary', 
          }}
        >
          Sayfa Bulunamadı
        </Typography>
        
        <Typography 
          variant="body1" 
          sx={{ marginBottom: 4 }}
        >
          Aradığınız sayfa kaldırılmış, adı değiştirilmiş veya geçici olarak kullanılamıyor olabilir.
        </Typography>

        <Button
          component={RouterLink}
          to="/"              
          variant="contained"   
          color="primary"    
          size="large"
        >
          Ana Sayfaya Dön
        </Button>
      </Container>
    </Box>
  );
};

export default NotFoundPage;