// Vendors
import React, { memo } from 'react';
import Link from 'next/link';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

interface Props {
  id: string;
  title: string;
  src: string;
  showPoster: (value?: object) => void;
}

const CardImg: React.FC<Props> = ({ id, title, src, showPoster }) => {
  return (
    <Card>
      <CardActionArea onClick={() => showPoster()}>
        <CardMedia component="img" image={src} alt={title} />
        <CardContent>
          <Typography gutterBottom variant="subtitle1" component="div">
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Link href={`/movie/${id}`}>
          <Button size="small" color="primary">
            Detail
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default memo(CardImg);
