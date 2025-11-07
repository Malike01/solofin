import { Box, CircularProgress } from '@mui/material';

const LazyLoader = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 150px)', 
        width: '100%',
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default LazyLoader;