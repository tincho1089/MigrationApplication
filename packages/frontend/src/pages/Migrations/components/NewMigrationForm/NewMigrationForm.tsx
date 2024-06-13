import React, { useState, useEffect } from 'react';
import { newMigration } from '@/models';
import { EmptyMigrationState } from '@/redux/states/migration';
import { addMigrationEvent } from '@/services';
import { sharingInformationService } from '@/utilities';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useCustomContext, useFilter } from '../../context';
import { MapComponent } from '@/components';
import { useMigrations } from '@/hooks/useMigrations';
import { TextField, TextareaAutosize, styled, Grid, Button, Typography } from '@mui/material';

const blue = {
  100: '#DAECFF',
  200: '#b6daff',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  900: '#003A75',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};


const CustomTextareaAutosize = styled(TextareaAutosize)(
  ({ theme }) => `
  box-sizing: border-box;
  width: 100%;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 8px 12px;
  border-radius: 8px;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
  }

  &:focus-visible {
    outline: 0;
  }
`
);

const NewMigrationForm: React.FC = () => {
  const { loadMigrations } = useMigrations();
  const { stateFilter, distance, myMigrations } = useFilter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<newMigration>();
  const { emitMessage } = useCustomContext();

  const [location, setLocation] = useState({ lat: '0', lng: '0' });

  useEffect(() => {
    setValue('lat', location.lat);
    setValue('lng', location.lng);
  }, [location, setValue]);

  const tryAddMigration = async (migration: newMigration) => {
    migration.state = 'Active';
    const { data } = await addMigrationEvent(migration);
    emitMessage(data);
    sharingInformationService.setSubject(false);
    reset(EmptyMigrationState[0]);
    loadMigrations(stateFilter, distance, myMigrations);
  };

  const onSubmit: SubmitHandler<newMigration> = (data) => tryAddMigration(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h4" gutterBottom>New Migration</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="outlined-required"
            label="Species"
            defaultValue=""
            fullWidth
            {...register('species', { required: true })}
            error={!!errors.species}
            helperText={errors.species ? 'Species is required' : ''}
            InputProps={{
              style: { backgroundColor: '#fff' }, // Fondo blanco
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="outlined-required"
            label="Start Date"
            type="date"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            {...register('startDate', { required: true })}
            error={!!errors.startDate}
            helperText={errors.startDate ? 'Start Date is required' : ''}
            InputProps={{
              style: { backgroundColor: '#fff' }, // Fondo blanco
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <MapComponent setLocation={setLocation} position={location} />
        </Grid>
        <Grid item xs={12}>
          <CustomTextareaAutosize
            required
            id="outlined-required"
            placeholder='Description'
            minRows={4}
            {...register('description', { required: true })}
            error={!!errors.description}
            helperText={errors.description ? 'Description is required' : ''}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Add Migration Event
          </Button>
        </Grid>
      </Grid>
      {Object.keys(errors).length > 0 && <div style={{ color: 'red' }}>There are errors, please correct them.</div>}
    </form>
  );
};

export default NewMigrationForm;
