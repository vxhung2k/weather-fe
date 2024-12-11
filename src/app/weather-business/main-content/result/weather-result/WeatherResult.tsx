import { useContext } from 'react';
import { WeatherContext, WeatherContextProps } from '../../../WeatherBusiness';
import { isEqual, toNumber } from 'lodash-es';

const WeatherResult = () => {
  const now = new Date();
  const { city, data, units } = useContext<WeatherContextProps>(WeatherContext);
  const { temp, weather, feels_like, wind_speed, pressure, humidity, dew_point, visibility } =
    data?.openWeather?.current ?? {};
  const day = now.getDate();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const datetime = `${day}/${month}/${year}, ${hours}:${minutes}`;

  return (
    <div className='flex flex-col space-y-[16px] w-full'>
      <div className='flex flex-col space-y-[8px]'>
        <p className='text-red-500 '>{datetime}</p>
        <h2 className='text-[24px] leading-[30px] font-bold'>{city?.cityName}</h2>
      </div>
      <div className='flex flex-col space-y-[12px]'>
        <p className='flex items-center text-[32px] font-bold'>
          <img
            src={`http://openweathermap.org/img/wn/${weather?.[0]?.icon}.png`}
            alt='weather icon'
          />
          {temp}&deg;{isEqual(units, 'metric') ? 'C' : 'F'}
        </p>
        <span className='font-bold'>
          Feels like {feels_like}&deg;{isEqual(units, 'metric') ? 'C' : 'F'}.{' '}
          {weather?.[0]?.description}
        </span>
        <div className='border-l border-l-red-500'>
          <div className='ms-4 flex flex-col space-y-[4px]'>
            <div className='flex item-center justify-between'>
              <p className='text-[14px] leading-[18px]'>
                Wind Speed: {wind_speed} {isEqual(units, 'metric') ? 'm/s' : 'mph'} NNE
              </p>
              <p className='text-[14px] leading-[18px]'>
                <span>Pressure : </span>
                {pressure} hPa
              </p>
            </div>
            <div className='flex item-center justify-between'>
              <p className='text-[14px] leading-[18px]'>
                <span>Humidity : </span>
                {humidity}%
              </p>
              <p className='text-[14px] leading-[18px]'>
                <span>Dew point : </span>
                {dew_point}&deg;
              </p>
            </div>
            <p className='text-[15px] leading-[18px]'>
              <span>Visibility : </span>
              {toNumber(visibility) / 1000} km
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherResult;
