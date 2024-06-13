import React, { useEffect } from 'react';
import { TextField, MenuItem, Select, FormControl, InputLabel, Switch, FormControlLabel, Grid, Box } from '@mui/material';
import { useMigrations } from '@/hooks/useMigrations';
import { useFilter } from '../../context';
import { NewMigrationButton } from '../NewMigrationButton';
import { AppStore } from '@/redux/store';
import { useSelector } from 'react-redux';

const Filters = () => {
  const { loadMigrations } = useMigrations();
  const { stateFilter, setStateFilter, distance, setDistance, myMigrations, setMyMigrations } = useFilter();
  const userState = useSelector((store: AppStore) => store.user);

  useEffect(() => {
    loadMigrations(stateFilter, distance, myMigrations);
  }, [stateFilter, distance, myMigrations]); 

  const handleDistanceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDistance(Number(event.target.value));
  };

  const handleStateFilterChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setStateFilter(event.target.value as string);
  };

  const handleMyMigrationsToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMyMigrations(event.target.checked);
  };

  return (
    <Box sx={{ marginBottom: '16px', padding: '16px', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            label="Distance (km)"
            type="number"
            value={distance}
            onChange={handleDistanceChange}
            fullWidth
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="state-filter-label">State</InputLabel>
            <Select
              labelId="state-filter-label"
              value={stateFilter}
              onChange={handleStateFilterChange}
              label="State"
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Removed">Removed</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FormControlLabel
            control={<Switch checked={myMigrations} onChange={handleMyMigrationsToggle} />}
            label="My Migrations"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
        {
          userState.role === 'biologist' && (
              <NewMigrationButton></NewMigrationButton>
          )
        }
        </Grid>
      </Grid>
    </Box>
  );
};

export default Filters;
