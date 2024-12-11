import { map } from 'lodash-es';
import { useContext } from 'react';
import { WeatherContext } from '../../../WeatherBusiness';

const AirPollution = () => {
  const { data } = useContext(WeatherContext);
  const { components, main } = data?.airPollution?.list?.[0] ?? {};
  const { co, no, no2, o3, so2, pm2_5, pm10, nh3 } = components ?? {};

  const tableData = [
    {
      id: 1,
      title: '',
      value: 'Value',
    },
    {
      id: 2,
      title: <span>CO</span>,
      value: co,
    },
    {
      id: 3,
      title: <span>NO</span>,
      value: no,
    },
    {
      id: 4,
      title: (
        <span>
          NO<sub>2</sub>
        </span>
      ),
      value: no2,
    },
    {
      id: 5,
      title: (
        <span>
          O<sub>3</sub>
        </span>
      ),
      value: o3,
    },
    {
      id: 6,
      title: (
        <span>
          SO<sub>2</sub>
        </span>
      ),
      value: so2,
    },
    {
      id: 7,
      title: (
        <span>
          PM<sub>2.5</sub>
        </span>
      ),
      value: pm2_5,
    },
    {
      id: 8,
      title: (
        <span>
          PM<sub>10</sub>
        </span>
      ),
      value: pm10,
    },
    {
      id: 9,
      title: (
        <span>
          NH<sub>3</sub>
        </span>
      ),
      value: nh3,
    },
  ];

  return (
    <div className='flex-1 md:w-1/2 w-full flex flex-col space-y-[16px] p-4 shadow-md h-fit rounded-[8px]'>
      <h2 className='text-[18px] font-bold'>Air Pollution</h2>
      <div className='overflow-x-auto'>
        <table className='table-auto text-center border-collapse text-sm text-gray-700 w-full'>
          <thead>
            <tr className='bg-gray-100'>
              {map(tableData, (data) => (
                <th key={data.id} className='border border-gray-300 p-2'>
                  {data.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {map(tableData, (data) => (
                <td key={data.id} className='border border-gray-300 p-2'>
                  {data.value}
                </td>
              ))}
            </tr>
            <tr>
              <td className='border border-gray-300 p-2'>Evaluation</td>
              <td colSpan={8} className='border border-gray-300 p-2'>
                The level of air cleanliness is : {main?.aqi}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AirPollution;
