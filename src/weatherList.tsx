import * as React from 'react';
import {Day} from './weather';

const WeatherList: React.FC<{weather: Day }> = ({ weather }) => {

  const {humidity, pressure, temp, temp_max, temp_min} = weather.main;
  console.log('weather', weather)
 
    return (
      <div>
        <h2>Date: {weather.dt_txt}</h2>
        <h2>Temperature: {temp}</h2>
        <h2>Max temperature: {temp_max}</h2>
        <h2>Min temperature: {temp_min}</h2>
        <h2>Humidity: {humidity}</h2> 
        <h2>Pressure: {pressure}</h2>
      </div>
    );
}

export default WeatherList;
