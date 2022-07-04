import ClearSky from './ClearSky';
import ClearSkyNight from './ClearSkyNight';
import Cloudy from './Cloudy';
import PartlyCloudyDay from './PartlyCloudyDay';
import PartlyCloudyNight from './PartlyCloudyNight';
import Rainy from './Rainy';
import ThunderStorm from './ThunderStorm';
import { OpenWeatherIconProps } from './types';

function OpenWeatherIcon(props: OpenWeatherIconProps) {
  if (props.icon === '01d') return <ClearSky />;
  if (props.icon === '01n') return <ClearSkyNight />;
  if (props.icon === '02d') return <PartlyCloudyDay />;
  if (props.icon === '02n') return <PartlyCloudyNight />;
  if (props.icon === '03d') return <Cloudy />;
  if (props.icon === '03n') return <Cloudy />;
  if (props.icon === '04d') return <Cloudy />;
  if (props.icon === '04n') return <Cloudy />;
  if (props.icon === '09d') return <Rainy />;
  if (props.icon === '09n') return <Rainy />;
  if (props.icon === '10d') return <Rainy />;
  if (props.icon === '10n') return <Rainy />;
  if (props.icon === '11d') return <ThunderStorm />;
  if (props.icon === '11n') return <ThunderStorm />;
  if (props.icon === '13d') return null;
  if (props.icon === '13n') return null;
  if (props.icon === '50d') return null;
  if (props.icon === '50n') return null;
  return null;
}

export default OpenWeatherIcon;
