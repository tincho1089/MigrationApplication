import Box from '@mui/material/Box'
import PropTypes from 'prop-types'
import Grid from '@mui/material/Unstable_Grid2';
import { CustomCard } from '../CustomCard';
import Typography from '@mui/material/Typography';
import LocationOnIcon from '@mui/icons-material/LocationOn';

CustomDataGrid.prototype = {
  rows: PropTypes.array.isRequired,
}

export default function CustomDataGrid({
  rows
}: {
  rows: any[]
}) {

  if (rows.length === 0) {
    return (
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '50vh', 
        backgroundColor: '#f5f5f5', 
        borderRadius: '8px',
        padding: '20px',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        textAlign: 'center', 
        marginTop: '20px' 
      }}>
        <LocationOnIcon sx={{ fontSize: '60px', color: '#3f51b5', marginBottom: '10px' }} />
        <Typography variant='h5' component='div' sx={{ color: '#3f51b5', fontWeight: 'bold' }}>
          There are no elements available.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {
          rows.map((item, index) => (
            <Grid xs={12} sm={4} md={4} key={index}>
              <CustomCard migration={item} />
            </Grid>
          ))
        }
      </Grid>
    </Box>
  )
}
