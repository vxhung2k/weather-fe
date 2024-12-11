import AirPollution from './air-pollution/AirPollution';
import DailyForecast from './daily-forecast/DailyForecast';
import Map from './map/Map';
import WeatherResult from './weather-result/WeatherResult';

const Result = () => {
  return (
    <div className='flex flex-col w-full space-y-[32px]'>
      <div className='flex flex-col space-y-[16px] md:flex-row md:space-y-0 md:space-x-[16px]'>
        <WeatherResult />
        <Map />
      </div>
      <div className='flex flex-col space-y-[16px] md:flex-row md:space-y-0 md:space-x-[16px]'>
        <AirPollution />
        <DailyForecast />
      </div>
    </div>
  );
};

export default Result;
