import { useState, useEffect } from 'react';
import { signIn } from '@/services'
import { Link, TextField, Box, Paper, Typography, Button, Select, MenuItem, InputLabel, FormControl, Grid } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { PublicRoutes, User } from '../../models'
import { resetUser } from '../../redux/states/user'
import { clearLocalStorage } from '../../utilities'
import { MapComponent } from '@/components';

function Signin() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<User & { lat: string, lng: string }>();
  
  const onSubmit: SubmitHandler<User & { lat: string, lng: string }> = (data) => trySignIn(data)

  const [location, setLocation] = useState({ lat: '0', lng: '0' });

  useEffect(() => {
    clearLocalStorage()
    dispatch(resetUser())
    navigate(`/${PublicRoutes.SIGNIN}`, { replace: true })
  }, [])

  useEffect(() => {
    setValue('lat', location.lat);
    setValue('lng', location.lng);
  }, [location, setValue]);

  const trySignIn = async (Signin: User & { lat: string, lng: string }) => {
    await signIn(Signin)
    navigate(`/${PublicRoutes.LOGIN}`, { replace: true })
  }

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh', 
      }}
    >
      <Paper 
        elevation={3} 
        sx={{ 
          padding: '30px', 
          width: '100%', 
          maxWidth: '600px', 
          textAlign: 'center' 
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Sign In Form
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                margin="normal"
                id="name"
                label="Name"
                placeholder="name"
                {...register('name', { required: true })}
                error={!!errors.name}
                helperText={errors.name ? 'Name is required' : ''}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                margin="normal"
                id="username"
                label="User Name"
                placeholder="username"
                {...register('username', { required: true })}
                error={!!errors.username}
                helperText={errors.username ? 'Username is required' : ''}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                margin="normal"
                id="password"
                label="Password"
                type="password"
                placeholder="password"
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 4,
                    message: 'Password too short',
                  },
                })}
                error={!!errors.password}
                helperText={errors.password ? errors.password.message : ''}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel id="role-label">Role</InputLabel>
                <Select
                  labelId="role-label"
                  id="role"
                  {...register('role', { required: true })}
                  error={!!errors.role}
                  defaultValue="citizen"
                >
                  <MenuItem value="citizen">Citizen</MenuItem>
                  <MenuItem value="biologist">Biologist</MenuItem>
                </Select>
                {errors.role && <Typography color="error">Role is required</Typography>}
              </FormControl>
            </Grid>
          </Grid>
          <Typography variant="h5" component="h2" gutterBottom
            sx={{ fontSize: '0.9rem', color: 'gray', textAlign: 'left', borderBottom: '1px solid rgb(201 202 206)' }}
          >
            Set Your Location
          </Typography>
          <MapComponent 
            setLocation={setLocation} 
            position={location}
            externalStyles={{ width: '100%', height: '20rem' }}
           />
          <div>
            <input
              style={{ display: 'none' }}
              aria-label='lat'
              placeholder='lat'
              {...register('lat', { required: true })}
              aria-invalid={errors.lat ? 'true' : 'false'}
              value={location.lat}
              readOnly
            />
          </div>
          {errors.lat && <Typography color="error">Location is required</Typography>}
          
          <Button 
            fullWidth 
            variant="contained" 
            color="primary" 
            type="submit" 
            sx={{ marginTop: '20px', marginBottom: '10px' }}
          >
            Sign In
          </Button>
        </form>
        <Link 
            sx={{
              width: '100%',
              textAlign: 'center',
            }}
            component="button"
            variant="body2"
            onClick={() => navigate(`/${PublicRoutes.LOGIN}`, { replace: true })}
          >
            LOG IN
          </Link>
      </Paper>
    </Box>
  )
}

export default Signin
