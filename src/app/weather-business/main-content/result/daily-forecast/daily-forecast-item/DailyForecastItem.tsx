import { useContext, useState } from 'react';
import { Daily } from '../../../../core/models';
import { WeatherContext, WeatherContextProps } from '../../../../WeatherBusiness';
import { isEqual, map, toNumber } from 'lodash-es';
import dayjs from 'dayjs';
import { getNext8Days } from '../../../../../../utils/getNext8Days';

interface Props {
  index?: number;
  data?: Daily;
}

const DailyForecastItem = ({ index, data }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { units } = useContext<WeatherContextProps>(WeatherContext);
  const {
    weather,
    temp,
    wind_speed,
    pressure,
    humidity,
    dew_point,
    feels_like,
    sunset,
    rain,
    sunrise,
  } = data ?? {};
  const { description, icon } = weather?.[0] ?? {};
  const metricUnits = isEqual(units, 'metric') ? 'C' : 'F';
  const tableData = [
    {
      headerName: 'Temperature',
      morning: temp?.morn,
      afternoon: temp?.day,
      evening: temp?.eve,
      night: temp?.night,
    },
    {
      headerName: 'Feels like',
      morning: feels_like?.morn,
      afternoon: feels_like?.day,
      evening: feels_like?.eve,
      night: feels_like?.night,
    },
  ];
  const next8Days = getNext8Days();

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='w-full'>
      <button
        type='button'
        className='flex w-full justify-between items-center rounded-[8px] hover:bg-[#ececed] px-3'
        onClick={toggleAccordion}
      >
        <span className='text-[14px] leading-[18px]'>{next8Days?.[toNumber(index)]?.date}</span>
        <div className='flex items-center space-x-4 w-9/12 justify-between'>
          <div className='flex items-center space-x-1'>
            <img src={`http://openweathermap.org/img/wn/${icon}.png`} alt='weather icon' />
            <span className='text-[16px] leading-[20px] font-bold'>
              {temp?.max} / {temp?.min}&deg;
              {metricUnits}
            </span>
          </div>
          <span className='text-gray-500 text-[12px] leading-[15px] font-semibold'>
            {description}
          </span>
          <svg
            className={`w-6 h-6 ${isOpen ? 'transform rotate-180' : ''}`}
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              d='M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
              clipRule='evenodd'
            />
          </svg>
        </div>
      </button>
      {isOpen && (
        <div className='flex flex-col space-y-[24px]'>
          <div className='flex items-center space-x-2'>
            <img src={`http://openweathermap.org/img/wn/${icon}.png`} alt='weather icon' />
            <p className='flex flex-col space-y-[8px]'>
              <span className='text-[18px] leading-[23px] font-bold'>{description}</span>
              <span className='text-[14px] leading-[16px] font-normal'>
                The high will be {temp?.max}&deg;{metricUnits}, the low will be {temp?.min}&deg;
                {metricUnits}
              </span>
            </p>
          </div>
          <div className='flex flex-col space-y-3 pl-4 border-l border-l-red-600'>
            <div className='flex items-center justify-between text-gray-700 text-[14px] leading-[18px]'>
              <p className='flex items-center space-x-2'>
                <span className='text-lg'>🌦</span>
                <span>{rain ?? 0}%</span>
              </p>
              <p className='flex items-center space-x-2'>
                <span className='text-sm'>🌬️</span>
                <span>
                  {wind_speed} {isEqual(units, 'metric') ? 'm/s' : 'mph'} NNE
                </span>
              </p>
              <p className='flex items-center space-x-2'>
                <span className='text-sm'>🧭</span>
                <span>{pressure} hPa</span>
              </p>
            </div>
            <div className=' flex justify-between text-gray-500 text-[14px] leading-[18px]'>
              <p>
                Humidity: <span className='text-gray-700'>{humidity}%</span>
              </p>
              <p>
                Dew point:
                <span className='text-gray-700'>
                  {dew_point}&deg;{metricUnits}
                </span>
              </p>
            </div>
          </div>
          <table className='table-auto w-full text-center border-collapse text-sm text-gray-700'>
            <thead>
              <tr className='bg-gray-100'>
                <th className='border border-gray-300 p-2'></th>
                <th className='border border-gray-300 p-2'>Morning</th>
                <th className='border border-gray-300 p-2'>Afternoon</th>
                <th className='border border-gray-300 p-2'>Evening</th>
                <th className='border border-gray-300 p-2'>Night</th>
              </tr>
            </thead>
            <tbody>
              {map(tableData, (data, dataIndex) => (
                <tr key={dataIndex}>
                  <td className='border border-gray-300 p-2'>{data.headerName}</td>
                  <td className='border border-gray-300 p-2'>
                    {data.morning}&deg; {metricUnits}
                  </td>
                  <td className='border border-gray-300 p-2'>
                    {data.afternoon}&deg; {metricUnits}
                  </td>
                  <td className='border border-gray-300 p-2'>
                    {data.evening}&deg; {metricUnits}
                  </td>
                  <td className='border border-gray-300 p-2'>
                    {data.night}&deg; {metricUnits}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className='flex space-x-[16px]'>
            <p className='flex flex-col justify-center font-semibold'>
              <span className='text-[10px] text-gray-500 leading-[15px] font-thin'>SUNRISE</span>
              <span className='text-gray-700'>
                {dayjs.unix(toNumber(sunrise)).utc().tz('Asia/Bangkok').format('HH:mm')}
              </span>
            </p>
            <p className='flex flex-col justify-center font-semibold'>
              <span className='text-[10px] text-gray-500 leading-[15px] font-thin'>SUNSET</span>
              <span className='text-gray-700'>
                {dayjs.unix(toNumber(sunset)).utc().tz('Asia/Bangkok').format('HH:mm')}
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyForecastItem;
