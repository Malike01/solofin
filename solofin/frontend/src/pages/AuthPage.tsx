import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Avatar,
  Grid,
  FormControlLabel,
  Checkbox,
  Paper,
  Divider,
  Alert,
  CircularProgress
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import GoogleIcon from '@mui/icons-material/Google';
import { useAuth } from '../context/AuthContext'; 


export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const { login, register, googleLogin, isLoading, error } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const toggleMode = (event: React.MouseEvent) => {
    event.preventDefault();
    setIsLogin((prev) => !prev);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = {
      name: isLogin ? undefined : name,
      email,
      password,
    };

    try {
      if (isLogin) {
        await login(formData);
      } else {
        await register(formData);
      }
    } catch (err) {
      console.error('AuthPage Hata Yakaladı:', (err as Error).message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
    } catch (err) {
      console.error('Google Login Hatası:', (err as Error).message);
    }
  };

  return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'grey.100', 
        }}
      >
        <Container component="main" maxWidth="xs">
          <Paper
            elevation={6}
            sx={{
              marginTop: 4,
              marginBottom: 4,
              padding: { xs: 3, sm: 4 },
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              borderRadius: 2,
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold' }}>
              {isLogin ? 'Giriş Yap' : 'Kayıt Ol'}
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
              Solofin'e Hoş Geldiniz!
            </Typography>

            {error && (
              <Alert severity="error" sx={{ width: '100%', mt: 2 }}>
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
              {!isLogin && (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Ad Soyad"
                  name="name"
                  autoComplete="name"
                  autoFocus
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              )}

              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="E-posta Adresi"
                name="email"
                autoComplete="email"
                autoFocus={isLogin} 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Şifre"
                type="password"
                id="password"
                autoComplete={isLogin ? "current-password" : "new-password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {isLogin && (
                <Grid container alignItems="center" justifyContent="space-between">
                  <Grid item>
                    <FormControlLabel
                      control={<Checkbox value="remember" color="primary" />}
                      label="Beni Hatırla"
                    />
                  </Grid>
                  <Grid item>
                    <Link href="#" variant="body2">
                      Şifremi Unuttum?
                    </Link>
                  </Grid>
                </Grid>
              )}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, py: 1.5, fontWeight: 'bold' }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <CircularProgress size={26} color="inherit" />
                ) : (
                  isLogin ? 'Giriş Yap' : 'Yeni Hesap Oluştur'
                )}
              </Button>

              <Grid container justifyContent="center">
                <Grid item>
                  <Link href="#" variant="body2" onClick={toggleMode}>
                    {isLogin
                      ? "Hesabınız yok mu? Kayıt Olun"
                      : "Zaten hesabınız var mı? Giriş Yapın"}
                  </Link>
                </Grid>
              </Grid>
              <Divider sx={{ my: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  VEYA
                </Typography>
              </Divider>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<GoogleIcon />}
                sx={{ mb: 2 }}
                onClick={handleGoogleLogin} 
                disabled={isLoading}
              >
                Google ile Devam Et
              </Button>

            </Box>
          </Paper>

          <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 4 }}>
            {'Tüm hakları saklıdır © '}
            <Link color="inherit" href="https://github.com/kullanici-adiniz/solofin">
              Solofin
            </Link>{' '}
          </Typography>
        </Container>
      </Box>
  );
}