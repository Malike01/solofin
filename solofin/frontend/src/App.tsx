import CssBaseline from '@mui/material/CssBaseline'
import './App.css'
import { router } from './router'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from '@mui/material/styles'
import { RouterProvider } from 'react-router-dom'
import theme from './styles/theme';

function App() {
  return (
    <>
    <ThemeProvider theme={theme}>
      <CssBaseline />
       <AuthProvider>
          <RouterProvider router={router} /> 
       </AuthProvider> 
      </ThemeProvider>
    </>
  )
}

export default App
