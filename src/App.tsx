import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Weather, Day, WeekWeather } from './weather';
import WeatherList from './weatherList';

const baseUrl = 'http://api.openweathermap.org/data/2.5/forecast?q=';
const suffix = '&units=metric&appid=';
const apiToken = process.env.REACT_APP_API_TOKEN;
const countSuffix = '&cnt=7'

const App: React.FC = () => {
  const [city, setCity] = useState('Paris');
  const [weekWeather, setWeekWeather] = useState<Day[] | null>(null);
  const [weather, setWeather] = useState<Weather[] | null>(null);

  useEffect(() => {
    getWeather(city); 
  }, []);

  async function getWeather(location: string) {
    const response = await fetch(baseUrl + location + suffix + apiToken + countSuffix);
    if (response.status === 200){
      const jsonWeather = await response.json();
      const dayList: Day[] = jsonWeather.list.map((day: Day) => ({main: day.main, dt_txt: day.dt_txt, city: jsonWeather.city.name}));
      setWeekWeather(dayList);
    } else {
        setWeekWeather(null);
    }
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    getWeather(city);
  };

  return (
    weekWeather ? (
      <div>
        <h1>{city}</h1>
        <form onSubmit = {handleSubmit}>
          <input type="text" placeholder="Enter city"
                  onInput = {handleChange} />
          <button type="submit">Get Weather</button>
        </form>
      
        {weekWeather.map((weather) => <WeatherList weather = {weather} /> )} 
      </div> ) 
  : (
      <h2>No weather available</h2>
    )
  );
};

export default App;
