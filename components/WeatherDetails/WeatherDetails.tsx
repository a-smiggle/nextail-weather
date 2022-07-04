import React, { Fragment } from 'react';

import { CurrentWeatherResponse, FiveDayList } from '../../utils/types';
import { useStore } from '../../utils/WeatherProvider';
import OpenWeatherIcon from '../WeatherIcons';

interface CustomProps {
  item?: CurrentWeatherResponse | FiveDayList;
}

function WeatherDetails(props: CustomProps) {
  const { units } = useStore();
  return (
    <Fragment>
      <div className="flex justify-between">
        <div>
          <OpenWeatherIcon icon={props.item?.weather[0].icon} />
          <h3 className="capitalize">{props.item?.weather[0].description}</h3>
        </div>
        <div>
          <div className="flex justify-center">
            <h1 className="text-5xl">{props.item?.main.temp}°</h1>
          </div>
          <div className="flex justify-center">
            <div>
              <h2>Min: {props.item?.main.temp_min}°</h2>
            </div>
          </div>
          <div className="flex justify-center">
            <div>
              <h2>Max:{props.item?.main.temp_max}°</h2>
            </div>
          </div>
          <div className="flex">
            <h3>Feels like: {props.item?.main.feels_like}°</h3>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="grid grid-cols-2 gap-2 pt-12 md:grid-cols-3">
          <div>
            <h3>Wind Speed</h3>
            <p>
              {props.item?.wind.speed} {units === 'imperial' ? 'mi/s' : 'm/s'}
            </p>
          </div>
          <div>
            <h3>Wind Gust</h3>
            <p>
              {props.item?.wind.gust} {units === 'imperial' ? 'mi/s' : 'm/s'}
            </p>
          </div>
          <div>
            <h3>Humidity</h3>
            <p>{props.item?.main.humidity} %</p>
          </div>
          <div>
            <h3>Pressure</h3>
            <p>{props.item?.main.pressure} hPa</p>
          </div>
          {props.item?.main.sea_level ? (
            <div>
              <h3>Sea Level</h3>
              <p>{props.item?.main.sea_level}</p>
            </div>
          ) : null}
          {props.item?.main.grnd_level ? (
            <div>
              <h3>Ground Level</h3>
              <p>{props.item?.main.grnd_level}</p>
            </div>
          ) : null}
          <div>
            <h3 title="Visibilty in m">Visibilty</h3>
            <p>{props.item?.visibility}</p>
          </div>
          <div>
            <h3>Cloud Coverage</h3>
            <p>{props.item?.clouds.all} %</p>
          </div>
          {props.item?.rain ? (
            <Fragment>
              <div>
                <h3 title="Rain Last Hour">Rain 1Hr</h3>
                <p>{props.item?.rain['1h']} mm</p>
              </div>
              <div>
                <h3 title="Rain Last Three Hours">Rain 3Hr</h3>
                <p>{props.item?.rain['3h']} mm</p>
              </div>
            </Fragment>
          ) : null}
          {props.item?.snow ? (
            <Fragment>
              <div>
                <h3 title="Rain Last Hour">Snow 1Hr</h3>
                <p className="text-right">{props.item?.snow['1h']} mm</p>
              </div>
              <div>
                <h3 title="Rain Last Three Hours">Snow 3Hr</h3>
                <p className="text-right">{props.item?.snow['3h']} mm</p>
              </div>
            </Fragment>
          ) : null}
        </div>
      </div>
    </Fragment>
  );
}

export default WeatherDetails;
