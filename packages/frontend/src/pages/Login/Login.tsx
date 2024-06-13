import { createUserAdapter } from '@/adapters'
import { logIn } from '@/services'
import { Link, Paper, Box, Typography, TextField, Button } from '@mui/material'
import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { PrivateRoutes, PublicRoutes, User } from '../../models'
import { createUser, resetUser } from '../../redux/states/user'
import { clearLocalStorage } from '../../utilities'

function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>()
  const onSubmit: SubmitHandler<User> = (data) => tryLogIn(data)

  useEffect(() => {
    clearLocalStorage()
    dispatch(resetUser())
    navigate(`/${PublicRoutes.LOGIN}`, { replace: true })
  }, [])

  const tryLogIn = async (login: User) => {
    const data = await logIn(login)
    dispatch(createUser(createUserAdapter({
      jwtToken: data.jwtToken, 
      username: login.username, 
      role: data.role,
      lat: data.lat,
      lng: data.lng,
      id: data.id,
    })))
    navigate(`/${PrivateRoutes.PRIVATE}/${PrivateRoutes.MIGRATIONS}`, { replace: true })
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        padding: '20px',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: '40px 30px',
          maxWidth: '400px',
          width: '100%',
          textAlign: 'center',
          borderRadius: '12px',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#fff',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Log In Form
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            label="User Name"
            margin="normal"
            {...register('username', { required: true })}
            error={Boolean(errors.username)}
            helperText={errors.username ? 'Username is required' : ''}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 4,
                message: 'Password too short',
              },
            })}
            error={Boolean(errors.password)}
            helperText={errors.password?.message}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: '20px', backgroundColor: '#ff4081', '&:hover': { backgroundColor: '#ff79b0' } }}
          >
            Log In
          </Button>
          <Box sx={{ marginTop: '10px' }}>
            <Link
              color="secondary"
              underline="hover"
              onClick={() => navigate(`/${PublicRoutes.SIGNIN}`, { replace: true })}
              sx={{ cursor: 'pointer' }}
            >
              SIGN IN
            </Link>
          </Box>
        </form>
      </Paper>
    </Box>
  )
}

export default Login
