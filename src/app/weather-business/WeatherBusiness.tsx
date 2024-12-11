import { isUndefined, map, omitBy } from 'lodash-es';
import { createContext, useEffect, useState } from 'react';
import { useQueries } from 'react-query';
import Banner from './banner/Banner';
import { City, MainData } from './core/models';
import { getAirPollutionInCity, getWeatherInCity } from './core/requests';
import MainContent from './main-content/MainContent';

export interface WeatherContextProps {
  units?: string;
  city?: City;
  data?: MainData;
  setUnits?: (unit: string) => void;
  setCity?: (city: City) => void;
}
export const WeatherContext = createContext<WeatherContextProps>({
  units: 'metric',
  city: { cityName: 'Ha Noi', coordinates: { lat: 21.0245, lon: 105.8412 } },
});

const WeatherBusiness = () => {
  const [units, setUnits] = useState<string>('metric');
  const [city, setCity] = useState<City>({
    cityName: 'Ha Noi',
    coordinates: { lat: 21.0245, lon: 105.8412 },
  });
  const [data, setData] = useState<MainData | undefined>(undefined);

  const convertedSearchObject = map(
    omitBy(
      {
        lat: city?.coordinates?.lat,
        lon: city?.coordinates?.lon,
        units: units,
      },
      (value) => isUndefined(value) || value === null,
    ),
    (value, key) => `${encodeURIComponent(key)}=${encodeURIComponent(value as string)}`,
  ).join('&');

  const [weatherQuery, airPollutionQuery] = useQueries([
    {
      queryKey: [`get-weather-in-city-${convertedSearchObject}`],
      queryFn: () => getWeatherInCity(convertedSearchObject),
      cacheTime: 0,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      enabled: !!city?.coordinates?.lat,
    },
    {
      queryKey: [`get-air-pollution-in-city-${convertedSearchObject}`],
      queryFn: () => getAirPollutionInCity(convertedSearchObject),
      cacheTime: 0,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      enabled: !!city?.coordinates?.lat,
    },
  ]);

  useEffect(() => {
    if (weatherQuery.data && airPollutionQuery.data) {
      setData?.({
        openWeather: weatherQuery.data,
        airPollution: airPollutionQuery.data,
      } as MainData);
    }
  }, [weatherQuery.data, airPollutionQuery.data]);

  return (
    <WeatherContext.Provider value={{ units, city, data, setUnits, setCity }}>
      <div className='flex flex-col'>
        <Banner />
        <MainContent />
      </div>
    </WeatherContext.Provider>
  );
};

export default WeatherBusiness;
