interface Coordinates {
  lon: number;
  lat: number;
}

interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface MainWeather {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
  temp_kf?: number;
}

interface Wind {
  speed: number;
  deg: number;
  gust: number;
}

interface Clouds {
  all: number;
}

interface Rain {
  '1h'?: number;
  '3h': number;
}

interface Snow {
  '1h'?: number;
  '3h': number;
}

interface System {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
}

export interface WeatherBase {
  weather: Weather[];
  wind: Wind;
  clouds: Clouds;
  rain?: Rain;
  snow?: Snow;
  main: MainWeather;
  visibility: number;
  dt: number;
}

export interface CurrentWeatherResponse extends WeatherBase {
  coord: Coordinates;
  base: string;
  sys: System;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

interface FiveDaySystem {
  pod: string;
}

export interface FiveDayList extends WeatherBase {
  dt_txt: string;
  pop: number;
  sys: FiveDaySystem;
}

export interface DayForecast {
  day: FiveDayList[];
}

export interface Forecast {
  forcast?: DayForecast[];
}

interface City {
  id: number;
  name: string;
  coord: Coordinates;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

export interface FiveDayWeatherResponse {
  cod: number;
  message: number;
  cnt: number;
  list: FiveDayList[];
  city: City;
}

interface AirPollutionMain {
  aqi: number;
}

interface AirPollutionComponents {
  co: number;
  no: number;
  no2: number;
  o3: number;
  so2: number;
  pm2_5: number;
  pm10: number;
  nh3: number;
}

interface AirPollutionList {
  dt: number;
  main: AirPollutionMain;
  components: AirPollutionComponents;
}

export interface AirPollutionResponse {
  coord: Coordinates;
  list: AirPollutionList[];
}

export interface FiveDay {
  [key: string]: FiveDayList[];
}
