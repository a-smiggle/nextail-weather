import { Modal } from '@nextail/core';
import React, { Fragment, useState } from 'react';

import { FiveDayList } from '../../utils/types';
import WeatherDetails from '../WeatherDetails';

interface CustomProps {
  item: FiveDayList;
  key: number;
}

function ForecastWeatherItem(props: CustomProps) {
  const [open, setOpen] = useState(false);
  return (
    <Fragment key={props.key}>
      <div
        onClick={() => setOpen(true)}
        className="rounded-xl border-2 border-slate-700 p-2 text-center hover:bg-slate-700 hover:text-slate-300 dark:border-slate-300"
      >
        <h4>{new Date(props.item.dt_txt).toLocaleTimeString()}</h4>
        <div className="flex flex-col">
          <p>Min: {props.item.main.temp_min}</p>
          <p>Max: {props.item.main.temp_max}</p>
          <p className="capitalize">{props.item.weather[0].description}</p>
          <p className="pr-2 text-right text-sm font-bold">...</p>
        </div>
      </div>
      <Modal open={open} toggle={setOpen}>
        <div className="flex flex-col gap-2">
          <h2>{new Date(props.item.dt_txt).toLocaleString()}</h2>
          <WeatherDetails item={props.item} />
        </div>
      </Modal>
    </Fragment>
  );
}

export default ForecastWeatherItem;
