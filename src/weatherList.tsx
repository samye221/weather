import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Weather, Coordinates } from './types';
import WeatherCard from './weatherCard';
import './styles/weatherList.css';
import { RouteComponentProps } from 'react-router-dom';

interface ChildComponentProps extends RouteComponentProps<any> {}

const WeatherList: React.FC<ChildComponentProps> = ({history, match}) => {
  const [weekWeather, setWeekWeather] = useState<Weather[] | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [cityName, setCityName] = useState('Paris');
  
  const locationFromUrl = match.params.cityName;

  useEffect(() => {
    getWeahter(locationFromUrl); 
  }, []);

  useEffect(() => {setCityName(cityName)}, [])

  async function getWeatherByCityName(location: Coordinates) {
    const baseUrl = 'http://api.openweathermap.org/data/2.5/onecall?';
    const suffix = '&units=metric&appid=';
    const apiToken = process.env.REACT_APP_API_TOKEN;
    const countSuffix = '&cnt=50&lang=fr';
    const response = await fetch(baseUrl + 'lat=' + location.lat  + '&lon=' + location.lon + '&exclude=hourly,minutely' + suffix + apiToken + countSuffix);
    if (response.status === 200){
      const jsonWeather = await response.json();
      const dayList: Weather[] = jsonWeather.daily;
      setWeekWeather(dayList);
    } else {
        setWeekWeather(null);
    }
  }

  async function getWeahter(location: string) {
    const suffix = '&units=metric&appid=';
    const apiToken = process.env.REACT_APP_API_TOKEN;
    const response = await fetch('http://api.openweathermap.org/data/2.5/weather?q=' + location + suffix + apiToken);
    if (response.status === 200){
      const jsonWeather = await response.json();
      const cityCoord = jsonWeather.coord;
      console.log('jsonWeather', jsonWeather);
      
      getWeatherByCityName(cityCoord);
      history.push(`/city/${location}`);
      
      setErrorMessage('');
    } else {
        setErrorMessage('Aucune ville ne correspond');
    }
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    getWeahter(cityName);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCityName(event.target.value);
  };
  
  const capitalize = (str: string) => str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});


  return (
    weekWeather ? (
      <div className="container">
        <h1>{capitalize(locationFromUrl)}</h1>

        <div>
            <p className="searchText">Cherchez la météo pour d'autres villes</p>
            
            <form onSubmit = {handleSubmit}>
                <input type="text" placeholder="Enter city" onInput = {handleChange} />
                <button type="submit">go</button>
            </form>
            <p className="errorMessage">{errorMessage}</p>
        </div>
        
        <div className="CardWrapper">
          {weekWeather.map((weather: Weather, index: number) => <WeatherCard weather = {weather} index = {index} /> )} 
        </div>
        
      </div> ) 
  : (
      <h2>No weather available</h2>
    )
  );
};

export default WeatherList;
