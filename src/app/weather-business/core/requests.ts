import { AxiosResponse } from 'axios';
import axiosInstance from '../../../configs/axios/axios.config';
import { AirPollutionResponse, ListCityResponse, OpenWeatherResponse } from './models';

const apiKey = import.meta.env.VITE_API_KEY ?? '';

const getWeatherInCity = async (query?: string): Promise<OpenWeatherResponse | undefined> => {
  const response: AxiosResponse<OpenWeatherResponse> = await axiosInstance.get(
    `/onecall?appid=${apiKey}&${query}`,
  );
  return response.data;
};
const findLocationWithSearch = async (query?: string): Promise<ListCityResponse | undefined> => {
  const response: AxiosResponse<ListCityResponse> = await axiosInstance.get(
    `/find?appid=${apiKey}&${query}`,
  );
  return response.data;
};
const getAirPollutionInCity = async (query?: string): Promise<AirPollutionResponse | undefined> => {
  const response: AxiosResponse<AirPollutionResponse> = await axiosInstance.get(
    `/air_pollution?appid=${apiKey}&${query}`,
  );
  return response.data;
};

export { getWeatherInCity, findLocationWithSearch, getAirPollutionInCity };
