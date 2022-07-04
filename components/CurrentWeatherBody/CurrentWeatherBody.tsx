import { Button } from '@nextail/core';
import React, { useEffect, useState } from 'react';

import { useStore } from '../../utils/WeatherProvider';
import AirQaulityDetails from '../AirQaulityDetails';
import WeatherDetails from '../WeatherDetails';

function CurrentWeatherBody() {
  const {
    units,
    updateUnits,
    currentWeather,
    currentWeatherImperial,
    currentWeatherKelvin,
    loaded,
  } = useStore();
  const [CurrentWeather, setCurrentWeather] = useState(currentWeather);

  useEffect(() => {
    if (units === 'metric') {
      setCurrentWeather(currentWeather);
    }
    if (units === 'imperial') {
      setCurrentWeather(currentWeatherImperial);
    }
    if (units === 'standard') {
      setCurrentWeather(currentWeatherKelvin);
    }
  }, [units, loaded]);

  return (
    <div className="h-full rounded-2xl bg-slate-400/25 p-4">
      <h1 className="absolute top-4 left-4">Current</h1>
      <div className="absolute top-4 right-4 flex gap-4">
        <Button
          title="Kelvin"
          mainStylings={{
            className: `${
              units === 'standard' ? 'text-3xl text-bold' : 'text-2xl'
            }`,
          }}
          onClick={() => updateUnits('standard')}
        >
          °K
        </Button>
        <Button
          title="Farenheit"
          mainStylings={{
            className: `${
              units === 'imperial' ? 'text-3xl text-bold' : 'text-2xl'
            }`,
          }}
          onClick={() => updateUnits('imperial')}
        >
          °F
        </Button>
        <Button
          title="Celsius"
          mainStylings={{
            className: `${
              units === 'metric' ? 'text-3xl text-bold' : 'text-2xl'
            }`,
          }}
          onClick={() => updateUnits('metric')}
        >
          °C
        </Button>
      </div>

      <WeatherDetails item={CurrentWeather} />
      <AirQaulityDetails />
    </div>
  );
}

export default CurrentWeatherBody;
