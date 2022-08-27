// Vendors
import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

interface Props {
  title: string;
  src: string;
}

const CardImg: React.FC<Props> = ({ title, src }) => {
  return (
    <Card>
      <CardActionArea>
        <CardMedia component="img" image={src} alt={title} />
        <CardContent>
          <Typography gutterBottom variant="subtitle1" component="div">
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Detail
        </Button>
      </CardActions>
    </Card>
  );
};

export default CardImg;
