import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { Migration, PrivateRoutes } from '@/models'
import { MapComponent } from '@/components';
import { useNavigate } from 'react-router-dom';


interface CustomCardProps {
  migration: Migration;
}

const CustomCard: React.FC<CustomCardProps> = ({ migration }) => {
  const navigate = useNavigate();

  const viewMigration = (params: Migration) => {
    navigate(`/${PrivateRoutes.PRIVATE}/${PrivateRoutes.VIEWMIGRATION}`, { state: { migration: params } });
  };

  return (
    <Card sx={{ maxWidth: '25rem', minWidth: '15rem' }}>
      <CardActionArea>
        <MapComponent 
          position={{ lat: migration.lat, lng: migration.lng }} 
          externalStyles={{height: '10rem'}} 
          readOnly
          disableDrag 
        />
        <CardContent style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
          <Typography gutterBottom variant="h5" component="div">
            {migration.species}
          </Typography>
          <Typography variant="body2" component="div" color="text.secondary">
            {migration.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end'}}>
        <Button size="small" color="primary" onClick={() => viewMigration(migration)}>
          View
        </Button>
      </CardActions>
    </Card>
  );
}

export default CustomCard;
