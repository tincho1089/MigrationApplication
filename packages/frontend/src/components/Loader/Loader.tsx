import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Loader = () => {
  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    }}>
      <CircularProgress size={120} thickness={4.5} style={{ color: '#ff9800' }} />
    </Box>
  );
};

export default Loader;
