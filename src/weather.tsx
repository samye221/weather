export interface Weather {
    dt_txt: string;
    city: string;
    humidity: number;
    pressure: number;
    temp: number;
    temp_max: number;
    temp_min: number;
}

export interface Day {
    dt_txt: string;
    main: Weather;
}

export interface WeekWeather {
    city: string;
    weather: Weather[]
}
