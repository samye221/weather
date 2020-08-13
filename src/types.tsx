import { InformationEvent } from "http";

export interface Weather {
    dt: number;
    city: string;
    humidity: number;
    pressure: number;
    temp: Temp;
    temp_max: number;
    temp_min: number;
    weather: Info[];
    feels_like: Temp;
}

export interface Temp {
    day: number;
    eve: number;
    max: number;
    min: number;
    morn: number;
    night: number;
}

export interface Info {
    icon?: string;
    main?: string;
    description?: string
}

export interface Coordinates {
    lat: number;
    lon: number
}
