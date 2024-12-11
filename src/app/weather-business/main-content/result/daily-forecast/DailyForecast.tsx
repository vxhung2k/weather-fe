import { isEqual, map } from 'lodash-es';
import { useContext, useState } from 'react';
import { WeatherContext } from '../../../WeatherBusiness';
import DailyForecastItem from './daily-forecast-item/DailyForecastItem';

const DailyForecast = () => {
  const { data } = useContext(WeatherContext);
  const { daily } = data?.openWeather ?? {};
  const [indexActive, setIndexActive] = useState<number | null>(null);

  return (
    <div className='flex-1 w-full md:w-1/2 flex-col space-y-[8px] p-4 shadow-md h-fit rounded-[8px]'>
      <h2 className='text-[18px] font-bold'>8-day daily forecast</h2>
      {map(daily, (item, itemIndex) => (
        <DailyForecastItem
          key={itemIndex}
          index={itemIndex}
          data={item}
          isActive={isEqual(indexActive, itemIndex)}
          setIndexActive={setIndexActive}
        />
      ))}
    </div>
  );
};

export default DailyForecast;
