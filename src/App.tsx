import React from 'react';
import WeatherList from './weatherList';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

const App: React.FC = () => {


  return (
    <Router>
      <div>
        <Route path="/" exact component={WeatherList} />
        <Redirect from="/" to= '/city/paris' />
        <Route path="/city/:cityName" exact component={WeatherList} />
      </div>
    </Router>
  );
};

export default App;
