import React, { Fragment } from 'react';

import { useStore } from '../../utils/WeatherProvider';

function AirQaulityDetails() {
  const { airPollution } = useStore();

  const aqiValue = () => {
    if (airPollution?.list[0].main.aqi === 1) return 'Good';
    if (airPollution?.list[0].main.aqi === 2) return 'Fair';
    if (airPollution?.list[0].main.aqi === 3) return 'Moderate';
    if (airPollution?.list[0].main.aqi === 4) return 'Poor';
    if (airPollution?.list[0].main.aqi === 5) return 'Very Poor';
    return '';
  };

  return (
    <Fragment>
      <h2 className="py-8 text-center">Air Qaulity {aqiValue()}</h2>
      <div className="flex justify-center">
        <div className="grid grid-cols-2 grid-rows-4 gap-2 md:grid-cols-3 ">
          <div>
            <h3>Carbon Monoxide</h3>
            <p title="μg/m3">{airPollution?.list[0].components.co}</p>
          </div>
          <div>
            <h3>Nitrogen Monoxide</h3>
            <p title="μg/m3">{airPollution?.list[0].components.no}</p>
          </div>
          <div>
            <h3>Nitrogen Dioxide</h3>
            <p title="μg/m3">{airPollution?.list[0].components.no2}</p>
          </div>
          <div>
            <h3>Ozone</h3>
            <p title="μg/m3">{airPollution?.list[0].components.o3}</p>
          </div>
          <div>
            <h3>Suplhur Dioxide</h3>
            <p title="μg/m3">{airPollution?.list[0].components.so2}</p>
          </div>
          <div>
            <h3 title="Fine Particle Mater">FPM</h3>
            <p title="μg/m3">{airPollution?.list[0].components.pm2_5}</p>
          </div>
          <div>
            <h3 title="Coarse Particulate Matter">CPM</h3>
            <p title="μg/m3">{airPollution?.list[0].components.pm10}</p>
          </div>
          <div>
            <h3>Ammonia</h3>
            <p title="μg/m3">{airPollution?.list[0].components.nh3}</p>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default AirQaulityDetails;
