import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {Weather} from './types';
import './styles/weatherCard.css'

const useStyles = makeStyles((theme) => ({
  root: {
    width: 130,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const WeatherCard: React.FC<{weather: Weather, index: number }> = ({ weather }) => {

  const {humidity, pressure, temp_max, temp_min, dt} = weather;
  const dayTemp = weather.temp.day;
  const morning = weather.temp.morn;
  const evening = weather.temp.eve;
  const night = weather.temp.night
  const morningFeelsLike = weather.feels_like.morn;
  const dayFeelsLike = weather.feels_like.day;
  const nightFeelsLike = weather.feels_like.night;
  const eveningFeelsLike = weather.feels_like.eve;
  const maxTemp = weather.temp.max;
  const minTemp = weather.temp.min;

  const icon: string | undefined = weather && weather.weather ? weather.weather[0].icon: undefined;
  const description: string | undefined = weather && weather.weather ? weather.weather[0].description: undefined;

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
    console.log('icon', icon)
  };

  const jours = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

  const rawDate = new Date(dt * 1000)
  const date = new Date(dt * 1000).toLocaleDateString("fr-FR")
  const day = rawDate.getDay()
 
    return (
      <div className="card">
        <Card className={`${classes.root}`}> 
          <div className="header"> 
            <p className="title">{jours[day]}</p>
            <p className="subTitle">{date}</p>
          </div>
    
          <CardMedia
            className={classes.media}
            image = {`http://openweathermap.org/img/wn/${icon}@2x.png` }
            title="weather emoticon"
          />
          <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
              <p className="cardContent"> {description}</p>
              
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              <p className="title">{`${dayTemp}°C` }</p>

            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
             <p className="cardContent">{`${maxTemp}°C max`}</p>
              
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              <p className="cardContent">{`${minTemp}°C min`}</p>
              
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>
                <p className="cardContent">{`Matin: ${morning}°C (Ressenti ${morningFeelsLike}°C)`}</p>           
              </Typography>
              <Typography paragraph>
                <p className="cardContent">{`Journée: ${dayTemp}°C (Ressenti ${dayFeelsLike}°C)`}</p>
               
              </Typography>  
              <Typography paragraph>
                <p className="cardContent">{`Soir: ${evening}°C (Ressenti ${eveningFeelsLike}°C)`}</p>
              </Typography>  
              <Typography paragraph>
                <p className="cardContent">{`Nuit: ${night}°C (Ressenti ${nightFeelsLike}°C)`}</p>
              </Typography>  
              <Typography paragraph>
                <p className="cardContent">{`Humidité: ${humidity}%`}</p>
              </Typography>  
              <Typography paragraph>
                <p className="cardContent">{`Pressure: ${pressure}`}</p>
              </Typography>  
            </CardContent>
          </Collapse>
        </Card>
      </div>
      
    );
}

export default WeatherCard;
