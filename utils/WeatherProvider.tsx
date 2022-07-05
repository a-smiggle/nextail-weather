import { useGeoLocation } from '@nextail/hooks';
import create from 'zustand';
import { persist } from 'zustand/middleware';

import {
  AirPollutionResponse,
  CurrentWeatherResponse,
  FiveDay,
  FiveDayList,
} from './types';

const openweatherAPI = process.env.OPENWEATHER_API;
const openCageAPI = process.env.OPEN_CAGE_API;

interface Location {
  lat: number;
  long: number;
}

interface LocationData {
  country: string;
  state: string;
  suburb: string;
}

interface WeatherState {
  units: 'metric' | 'imperial' | 'standard';
  loaded: boolean;
  location?: Location;
  locationData?: LocationData;
  locationDataUpdated: number;
  currentWeather: CurrentWeatherResponse | undefined;
  currentWeatherUpdated: number;
  currentWeatherKelvin: CurrentWeatherResponse | undefined;
  currentWeatherKelvinUpdated: number;
  currentWeatherImperial: CurrentWeatherResponse | undefined;
  currentWeatherImperialUpdated: number;
  fiveDayWeather: FiveDay | undefined;
  fiveDayWeatherUpdate: number;
  fiveDayWeatherKelvin: FiveDay | undefined;
  fiveDayWeatherKelvinUpdate: number;
  fiveDayWeatherImperial: FiveDay | undefined;
  fiveDayWeatherImperialUpdate: number;
  airPollution: AirPollutionResponse | undefined;
  airPollutionUpdate: number;
  updateUnits: (unit: 'metric' | 'imperial' | 'standard') => void;
  UpdateLocation: () => void;
  clearLocation: () => void;
  updateLocationData: () => void;
  clearLocationData: () => void;
  updateCurrentWeather: () => void;
  updateCurrentWeatherKelvin: () => void;
  updateCurrentWeatherImperial: () => void;
  updateFiveDayWeather: () => void;
  updateFiveDayWeatherKelvin: () => void;
  updateFiveDayWeatherImperial: () => void;
  updateAirPollution: () => void;
}

export const useStore = create<WeatherState>()(
  persist(
    (set, get) => ({
      units: 'metric',
      loaded: false,
      location: undefined,
      locationData: undefined,
      locationDataUpdated: 0,
      currentWeather: undefined,
      currentWeatherUpdated: 0,
      currentWeatherKelvin: undefined,
      currentWeatherKelvinUpdated: 0,
      currentWeatherImperial: undefined,
      currentWeatherImperialUpdated: 0,
      fiveDayWeather: undefined,
      fiveDayWeatherUpdate: 0,
      fiveDayWeatherKelvin: undefined,
      fiveDayWeatherKelvinUpdate: 0,
      fiveDayWeatherImperial: undefined,
      fiveDayWeatherImperialUpdate: 0,
      airPollution: undefined,
      airPollutionUpdate: 0,
      updateUnits: (unit: 'metric' | 'imperial' | 'standard') => {
        set(() => ({ units: unit }));
        if (unit === 'metric') {
          get().updateCurrentWeather();
          get().updateFiveDayWeather();
        }
        if (unit === 'imperial') {
          get().updateCurrentWeatherImperial();
          get().updateFiveDayWeatherImperial();
        }
        if (unit === 'standard') {
          get().updateCurrentWeatherKelvin();
          get().updateFiveDayWeatherKelvin();
        }
      },
      UpdateLocation: () => {
        function handleLocation(la: number, lo: number) {
          set(() => ({ location: { lat: la, long: lo } }));
          get().updateLocationData();
          if (get().units === 'metric') {
            get().updateCurrentWeather();
            get().updateFiveDayWeather();
            get().updateAirPollution();
          }
          if (get().units === 'imperial') {
            get().updateCurrentWeatherImperial();
            get().updateFiveDayWeatherImperial();
            get().updateAirPollution();
          }
          if (get().units === 'standard') {
            get().updateCurrentWeatherKelvin();
            get().updateFiveDayWeatherKelvin();
            get().updateAirPollution();
          }
          get().updateAirPollution();
        }
        useGeoLocation().getCurrentPosition((position: GeolocationPosition) => {
          handleLocation(position.coords.latitude, position.coords.longitude);
        });
      },
      clearLocation: () => {
        set(() => ({ location: undefined }));
      },
      updateLocationData: async () => {
        if (
          (new Date().getTime() - get().locationDataUpdated) / 1000 / 60 >
          10
        ) {
          const RESP = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${
              get().location?.lat
            }+${
              get().location?.long
            }&key=${openCageAPI}&no_annotations=1&language=en`
          );
          if (RESP.ok) {
            const resp = await RESP.json();
            set(() => ({
              locationData: {
                country: resp.results[0].components.country,
                state: resp.results[0].components.state,
                suburb:
                  resp.results[0].components.suburb ||
                  resp.results[0].components.town,
              },
            }));
            set(() => ({ locationDataUpdated: new Date().getTime() }));
          }
        }
      },
      clearLocationData: () => {
        set(() => ({ locationData: undefined }));
      },
      updateCurrentWeather: async () => {
        set(() => ({ loaded: false }));
        if (
          (new Date().getTime() - get().currentWeatherUpdated) / 1000 / 60 >
          10
        ) {
          const RESP = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${
              get().location?.lat
            }&lon=${get().location?.long}&appid=${openweatherAPI}&units=${
              get().units
            }`
          );

          if (RESP.ok) {
            const resp = await RESP.json();
            set(() => ({ currentWeather: resp }));
            set(() => ({ currentWeatherUpdated: new Date().getTime() }));
          }
        }
        set(() => ({ loaded: true }));
      },
      updateCurrentWeatherKelvin: async () => {
        set(() => ({ loaded: false }));
        if (
          (new Date().getTime() - get().currentWeatherKelvinUpdated) /
            1000 /
            60 >
          10
        ) {
          const RESP = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${
              get().location?.lat
            }&lon=${get().location?.long}&appid=${openweatherAPI}&units=${
              get().units
            }`
          );

          if (RESP.ok) {
            const resp = await RESP.json();
            set(() => ({ currentWeatherKelvin: resp }));
            set(() => ({ currentWeatherKelvinUpdated: new Date().getTime() }));
          }
        }
        set(() => ({ loaded: true }));
      },
      updateCurrentWeatherImperial: async () => {
        set(() => ({ loaded: false }));
        if (
          (new Date().getTime() - get().currentWeatherImperialUpdated) /
            1000 /
            60 >
          10
        ) {
          const RESP = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${
              get().location?.lat
            }&lon=${get().location?.long}&appid=${openweatherAPI}&units=${
              get().units
            }`
          );

          if (RESP.ok) {
            const resp = await RESP.json();
            set(() => ({ currentWeatherImperial: resp }));
            set(() => ({
              currentWeatherImperialUpdated: new Date().getTime(),
            }));
          }
        }
        set(() => ({ loaded: true }));
      },
      updateFiveDayWeather: async () => {
        set(() => ({ loaded: false }));
        if (
          (new Date().getTime() - get().fiveDayWeatherUpdate) / 1000 / 60 >
          10
        ) {
          const RESP = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${
              get().location?.lat
            }&lon=${get().location?.long}&appid=${openweatherAPI}&units=${
              get().units
            }`
          );

          if (RESP.ok) {
            const resp = await RESP.json();
            const temp: FiveDay = {};
            resp.list.forEach((forecast: FiveDayList) => {
              const date = new Date(forecast.dt_txt).toDateString();
              if (!temp[date]) temp[date] = [];

              temp[date].push(forecast);
            });
            set(() => ({ fiveDayWeather: temp }));
            set(() => ({ fiveDayWeatherUpdate: new Date().getTime() }));
          }
        }
        set(() => ({ loaded: true }));
      },
      updateFiveDayWeatherKelvin: async () => {
        set(() => ({ loaded: false }));
        if (
          (new Date().getTime() - get().fiveDayWeatherKelvinUpdate) /
            1000 /
            60 >
          10
        ) {
          const RESP = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${
              get().location?.lat
            }&lon=${get().location?.long}&appid=${openweatherAPI}&units=${
              get().units
            }`
          );

          if (RESP.ok) {
            const resp = await RESP.json();
            const temp: FiveDay = {};
            resp.list.forEach((forecast: FiveDayList) => {
              const date = new Date(forecast.dt_txt).toDateString();
              if (!temp[date]) temp[date] = [];

              temp[date].push(forecast);
            });
            set(() => ({ fiveDayWeatherKelvin: temp }));
            set(() => ({ fiveDayWeatherKelvinUpdate: new Date().getTime() }));
          }
        }
        set(() => ({ loaded: true }));
      },
      updateFiveDayWeatherImperial: async () => {
        set(() => ({ loaded: false }));
        if (
          (new Date().getTime() - get().fiveDayWeatherImperialUpdate) /
            1000 /
            60 >
          10
        ) {
          const RESP = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${
              get().location?.lat
            }&lon=${get().location?.long}&appid=${openweatherAPI}&units=${
              get().units
            }`
          );

          if (RESP.ok) {
            const resp = await RESP.json();
            const temp: FiveDay = {};
            resp.list.forEach((forecast: FiveDayList) => {
              const date = new Date(forecast.dt_txt).toDateString();
              if (!temp[date]) temp[date] = [];

              temp[date].push(forecast);
            });
            set(() => ({ fiveDayWeatherImperial: temp }));
            set(() => ({ fiveDayWeatherImperialUpdate: new Date().getTime() }));
          }
        }
        set(() => ({ loaded: true }));
      },
      updateAirPollution: async () => {
        set(() => ({ loaded: false }));
        if (
          (new Date().getTime() - get().airPollutionUpdate) / 1000 / 60 >
          10
        ) {
          const RESP = await fetch(
            `https://api.openweathermap.org/data/2.5/air_pollution?lat=${
              get().location?.lat
            }&lon=${get().location?.long}&appid=${openweatherAPI}`
          );

          if (RESP.ok) {
            const resp = await RESP.json();
            set(() => ({ airPollution: resp }));
            set(() => ({ airPollutionUpdate: new Date().getTime() }));
          }
        }
        set(() => ({ loaded: true }));
      },
    }),
    {
      name: 'weather-storage',
    }
  )
);
