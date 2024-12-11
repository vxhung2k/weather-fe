import { isEqual, map } from 'lodash-es';
import { useContext } from 'react';
import { WeatherContext, WeatherContextProps } from '../../../WeatherBusiness';

const OtherFilter = () => {
  const { units, setUnits } = useContext<WeatherContextProps>(WeatherContext);
  const unitsDatas = [
    {
      id: 1,
      name: 'Metric: °C, m/s',
      value: 'metric',
    },
    {
      id: 2,
      name: 'Imperial: °F, mph',
      value: 'imperial',
    },
  ];

  const handleChangeUnit = (unit: string) => {
    setUnits?.(unit);
  };

  return (
    <div className='flex w-fit rounded-[4px] bg-[#ececed] space-x-2 px-4 py-2'>
      {map(unitsDatas, (unitsData) => (
        <div
          key={unitsData.id}
          className={`${
            isEqual(units, unitsData.value) ? 'bg-white' : ''
          } rounded-[4px] py-1 px-2 cursor-pointer`}
          onClick={() => handleChangeUnit(unitsData.value)}
        >
          <span className='text-[12px]'>{unitsData.name}</span>
        </div>
      ))}
    </div>
  );
};

export default OtherFilter;
