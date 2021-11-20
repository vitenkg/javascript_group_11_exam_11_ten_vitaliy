import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  IconButton,
  makeStyles,
  Typography
} from "@material-ui/core";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import {apiURL} from "../../config";

const useStyles = makeStyles({
  card: {
    height: '100%'
  },
  media: {
    height: 0,
    paddingTop: '56.25%'
  }
});

const ProductItem = ({title, price, id, image}) => {
  const classes = useStyles();
  let cardImage = null;
  if (image) {
    cardImage = apiURL + '/' + image;
  }

  return (
    <Grid item xs={12} sm={6} md={6} lg={4}>
      <Card className={classes.card}>
        <CardHeader title={title}/>
        <CardMedia
          image={cardImage}
          title={title}
          className={classes.media}
        />
        <CardContent>
          <Typography variant="subtitle1">
            {price} KGS
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton component={Link} to={'/items/' + id}>
            <ArrowForwardIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
};

ProductItem.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  image: PropTypes.string
};

export default ProductItem;