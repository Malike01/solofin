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
import { useForm, type FieldErrors, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, registerSchema, type LoginFormValues, type RegisterFormValues } from '@/schemas/authSchema';


export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const { login, register, googleLogin, isLoading, error } = useAuth();

  const {
    register: formRegister, 
    handleSubmit,
    formState: { errors },
    reset, 
  } = useForm<LoginFormValues | RegisterFormValues>({
    resolver: zodResolver(isLogin ? loginSchema : registerSchema),
    mode: 'onBlur', 
  });

  const registerErrors = errors as FieldErrors<RegisterFormValues>;

  const toggleMode = (event: React.MouseEvent) => {
    event.preventDefault();
    setIsLogin((prev) => !prev);
    reset(); 
  };

  const onSubmit: SubmitHandler<LoginFormValues | RegisterFormValues> = async (data) => {
    try {
      if (isLogin) {
        await login(data as LoginFormValues);
      } else {
        const { name, email, password } = data as RegisterFormValues;
        await register({ name, email, password });
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
          minHeight: 'calc(100vh - 65px)',
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
            
            <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 2 }}>
              {!isLogin && (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Ad Soyad"
                  autoComplete="name"
                  autoFocus
                  {...formRegister("name")}
                  error={!!registerErrors.name}
                  helperText={registerErrors.name?.message}
                />
              )}

              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="E-posta Adresi"
                autoComplete="email"
                autoFocus={isLogin} 
                {...formRegister("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Şifre"
                type="password"
                id="password"
                autoComplete={isLogin ? "current-password" : "new-password"}
                {...formRegister("password")}
                error={!!errors.password}
                helperText={errors.password?.message}
              />

            {!isLogin && (
              <TextField
                margin="normal"
                required
                fullWidth
                label="Şifreyi Onayla"
                type="password"
                id="confirmPassword"
                autoComplete="new-password"
                {...formRegister("confirmPassword")}
                error={!!registerErrors.confirmPassword}
                helperText={registerErrors.confirmPassword?.message}
              />
            )}

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
            <Link color="inherit" href="https://github.com/Malike01/solofin">
              Solofin
            </Link>{' '}
          </Typography>
        </Container>
      </Box>
  );
}