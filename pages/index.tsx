import type { NextPage } from 'next';

import CurrentWeatherBody from '../components/CurrentWeatherBody';
import ForecastWeatherBody from '../components/ForecastWeatherBody';
import Navbar from '../components/Navbar';
import { useStore } from '../utils/WeatherProvider';

const Home: NextPage = () => {
  const { UpdateLocation, locationData } = useStore();

  UpdateLocation();

  return (
    <div className="flex h-fit w-full grow flex-col overflow-hidden bg-white dark:bg-slate-700 dark:text-slate-300">
      <Navbar />
      <div className="flex justify-center">
        <div className="flex flex-col md:flex-row">
          <h1 className="md:pr-4">{locationData?.suburb}</h1>
          <h1 className="md:pr-4">{locationData?.state}</h1>
          <h1>{locationData?.country}</h1>
        </div>
      </div>

      <div className="grid h-full w-full gap-2 p-4 lg:grid-cols-6">
        <div className="relative h-fit rounded-2xl bg-slate-200/25 p-4 pt-14 lg:col-span-2">
          <CurrentWeatherBody />
        </div>
        <div className="relative grid h-full gap-2 rounded-2xl bg-slate-200/25 p-4 pt-14 lg:col-span-4 lg:grid-rows-5">
          <h1 className="absolute top-4 left-4">5 Day Forecast</h1>
          <ForecastWeatherBody />
        </div>
      </div>
    </div>
  );
};

export default Home;
