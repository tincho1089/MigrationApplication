import { useSelector } from 'react-redux';
import { CustomDataGrid, CustomModal } from '@/components';
import { AppStore } from '@/redux/store';
import { Typography, Container, Box } from '@mui/material';
import { NewMigrationForm } from '../NewMigrationForm';
import { Filters } from '../Filters';

function WindowManager() {
  const migrationState = useSelector((store: AppStore) => store.migration);

  return (
    <Container sx={{ minHeight: '88.5vh', minWidth: '67vw'}} >
      <Box sx={{ textAlign: 'center', marginTop: '3%', marginBottom: '20px' }}>
        <Typography 
          variant='h2' 
          component='h1'    
          sx={{
            fontWeight: 'bold',
            color: '#3f51b5',
            marginBottom: '20px',
            borderRadius: '8px',
            backgroundColor: '#e3f2fd',
            padding: '10px 0', // Ajustado para reducir el padding
          }}
        >
          Migrations
        </Typography>
      </Box>
      <Filters />
      <Box sx={{ marginTop: '20px' }}>
        <CustomDataGrid rows={migrationState} />
      </Box>
      <CustomModal>
        <NewMigrationForm />
      </CustomModal>
    </Container>
  );
}

export default WindowManager;
