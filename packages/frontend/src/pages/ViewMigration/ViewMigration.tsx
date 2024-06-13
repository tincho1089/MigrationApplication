import { getMigrationsAdapter } from '@/adapters';
import { MapComponent } from '@/components';
import { Migration, MigrationStates } from '@/models';
import { EmptyMigrationState } from '@/redux/states/migration';
import { AppStore } from '@/redux/store';
import { updateMigration } from '@/services';
import { SnackbarUtilities } from '@/utilities';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Typography, Box, Paper, Button, Grid } from '@mui/material';

function ViewMigration() {
  const userState = useSelector((store: AppStore) => store.user);
  const navigate = useNavigate();
  const { state } = useLocation();

  const [currentMigration, setCurrentMigration] = useState<Migration>(EmptyMigrationState[0]);

  useEffect(() => {
    if (state?.migration) {
      setCurrentMigration(state.migration);
    }
    return () => {
      setCurrentMigration(EmptyMigrationState[0]);
    };
  }, [state]);

  const tryUpdateMigration = async (newState: string) => {
    try {
      const { data } = await updateMigration(currentMigration.id, newState);
      const migrationModified = getMigrationsAdapter([data]);
      SnackbarUtilities.success(`Migration ${migrationModified[0].species} has been updated to ${newState}!`);
      navigate(-1);
    } catch (error: any) {
      SnackbarUtilities.error(`Failed to update migration: ${error.message}`);
    }
  };

  const viewRemovedButton = currentMigration.state === 'Active' && userState.role === 'biologist' && currentMigration.user === userState.username;

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        padding: '20px', 
        margin: '20px', 
        borderRadius: '8px', 
        maxWidth: '50rem', 
        width: '100%', 
        marginLeft: 'auto', 
        marginRight: 'auto' 
      }}
    >
      <Typography variant="h4" component="h2" gutterBottom textAlign="center">
        Migration Details
      </Typography>
      <Typography variant="h5" component="h4" gutterBottom textAlign="center">
        {currentMigration.species}
      </Typography>
      <Box sx={{ marginBottom: '20px' }}>
        <MapComponent 
          position={{ lat: currentMigration.lat, lng: currentMigration.lng }} 
          externalStyles={{width: '50rem' }}
          readOnly />
      </Box>
      <Box sx={{ marginBottom: '20px' }}>
        <Grid container spacing={2}>
          <Grid item xs={4} textAlign="left">
            <Typography variant="body1" component="div">Start Date:</Typography>
          </Grid>
          <Grid item xs={8} textAlign="left">
            <Typography variant="body1" component="div">{new Date(currentMigration.startDate).toLocaleDateString()}</Typography>
          </Grid>
          <Grid item xs={4} textAlign="left">
            <Typography variant="body1" component="div">Description:</Typography>
          </Grid>
          <Grid item xs={8} textAlign="left">
            <Typography variant="body1" component="div">{currentMigration.description}</Typography>
          </Grid>
          <Grid item xs={4} textAlign="left">
            <Typography variant="body1" component="div">State:</Typography>
          </Grid>
          <Grid item xs={8} textAlign="left">
            <Typography variant="body1" component="div">{currentMigration.state}</Typography>
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: '10px',
          justifyContent: 'right',
          marginTop: '20px'
        }}
      >
        {viewRemovedButton && (
          <Button variant="contained" color="secondary" onClick={() => tryUpdateMigration(MigrationStates.REMOVED)}>
            Mark as Removed
          </Button>
        )}
        <Button variant="contained" onClick={() => navigate(-1)}>
          Return
        </Button>
      </Box>
    </Paper>
  );
}

export default ViewMigration;
