import { map } from 'lodash-es';
import { useContext } from 'react';
import { headerData } from '../../../core/models';
import { WeatherContext, WeatherContextProps } from '../../../WeatherBusiness';

const AirPollution = () => {
  const { data } = useContext<WeatherContextProps>(WeatherContext);
  const { list } = data?.airPollution ?? {};

  // const data = [{}];

  return (
    <div className='w-full'>
      <h2>Air Pollution</h2>
      <table className='table-auto w-full text-center border-collapse text-sm text-gray-700'>
        <thead>
          <tr className='bg-gray-100'>
            {map(headerData, (header) => (
              <th key={header.id} className='border border-gray-300 p-2'>
                {header.title}
              </th>
            ))}
            {/* <th className='border border-gray-300 p-2'></th>
            <th className='border border-gray-300 p-2'>Morning</th>
            <th className='border border-gray-300 p-2'>Afternoon</th>
            <th className='border border-gray-300 p-2'>Evening</th>
            <th className='border border-gray-300 p-2'>Night</th> */}
          </tr>
        </thead>
        {/* <tbody>
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
        </tbody> */}
      </table>
    </div>
  );
};

export default AirPollution;
