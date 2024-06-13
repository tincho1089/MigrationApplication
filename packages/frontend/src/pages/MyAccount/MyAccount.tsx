import { MapComponent } from '@/components';
import { AppStore } from '@/redux/store';
import { updateLocation } from '@/services';
import { SnackbarUtilities } from '@/utilities';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Typography, Box, Paper, Button } from '@mui/material';
import { PrivateRoutes } from '@/models';
import { updateUser } from '@/redux/states/user';

function MyAccount() {
  const userState = useSelector((store: AppStore) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [location, setLocation] = useState({ lat: userState.lat, lng: userState.lng });

  useEffect(() => {
    setLocation({ lat: userState.lat, lng: userState.lng });
  }, [userState]);

  const tryUpdateLocation = async () => {
    try {
      const { data } = await updateLocation(userState.id, location.lat, location.lng);
      dispatch(updateUser({
        ...userState,
        lat: location.lat,
        lng: location.lng,
      }));
      SnackbarUtilities.success('User location has been updated!');
      navigate(`/${PrivateRoutes.PRIVATE}/${PrivateRoutes.MIGRATIONS}`, { replace: true });
    } catch (error: any) {
      SnackbarUtilities.error(`Failed to update user location: ${error.message}`);
    }
  };

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
        Change my location
      </Typography>
      <Box sx={{ marginBottom: '20px' }}>
        <MapComponent 
          setLocation={setLocation} 
          position={location}
          externalStyles={{width: '50rem' }}
        />
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
        <Button variant="contained" color="secondary" onClick={tryUpdateLocation}>
          Update Location
        </Button>
        <Button variant="contained" onClick={() => navigate(`/${PrivateRoutes.PRIVATE}/${PrivateRoutes.MIGRATIONS}`, { replace: true })}>
          Return
        </Button>
      </Box>
    </Paper>
  );
}

export default MyAccount;
