import React, { Fragment, useEffect, useState } from 'react';

import { FiveDayList } from '../../utils/types';
import { useStore } from '../../utils/WeatherProvider';
import ForecastWeatherItem from './ForecastWeatherItem';

function ForecastWeatherBody() {
  const {
    units,
    fiveDayWeather,
    fiveDayWeatherImperial,
    fiveDayWeatherKelvin,
    loaded,
  } = useStore();
  const [CurrentFiveDayWeather, setCurrentFiveDayWeather] =
    useState(fiveDayWeather);
  useEffect(() => {
    if (units === 'metric') {
      setCurrentFiveDayWeather(fiveDayWeather);
    }
    if (units === 'imperial') {
      setCurrentFiveDayWeather(fiveDayWeatherImperial);
    }
    if (units === 'standard') {
      setCurrentFiveDayWeather(fiveDayWeatherKelvin);
    }
  }, [units, loaded]);

  const DateString = (day: number) =>
    new Date(new Date().setDate(new Date().getDate() + day)).toDateString();

  return (
    <Fragment>
      {CurrentFiveDayWeather
        ? Object.keys(CurrentFiveDayWeather).map((day, index) => {
            return (
              <div
                key={DateString(index)}
                className="h-full rounded-2xl bg-slate-400/25 p-4 lg:row-span-1"
              >
                <h2 className="pb-4">{DateString(index)}</h2>
                <div className="grid grid-cols-1 gap-2 md:grid-cols-4 lg:grid-cols-8">
                  {CurrentFiveDayWeather
                    ? CurrentFiveDayWeather[day].map(
                        (forecast: FiveDayList, fIndex: number) => {
                          return (
                            <ForecastWeatherItem key={fIndex} item={forecast} />
                          );
                        }
                      )
                    : null}
                </div>
              </div>
            );
          })
        : null}
    </Fragment>
  );
}

export default ForecastWeatherBody;
