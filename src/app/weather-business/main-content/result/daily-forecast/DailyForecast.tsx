import { map } from 'lodash-es';
import { useContext } from 'react';
import { WeatherContext, WeatherContextProps } from '../../../WeatherBusiness';
import DailyForecastItem from './daily-forecast-item/DailyForecastItem';

const DailyForecast = () => {
  const { data } = useContext<WeatherContextProps>(WeatherContext);
  const { daily } = data?.openWeather ?? {};

  return (
    <div className='flex flex-col w-full space-y-[8px]'>
      <h2 className='text-[18px] font-bold'>8-day daily forecast</h2>
      {map(daily, (item, itemIndex) => (
        <DailyForecastItem key={itemIndex} index={itemIndex} data={item} />
      ))}
    </div>
  );
};

export default DailyForecast;
