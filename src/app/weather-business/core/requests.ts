import { AxiosResponse } from 'axios';
import axiosInstance from '../../../configs/axios/axios.config';
import { AirPollutionResponse, ListCityResponse, OpenWeatherResponse } from './models';

const getWeatherInCity = async (query?: string): Promise<OpenWeatherResponse | undefined> => {
  const response: AxiosResponse<OpenWeatherResponse> = await axiosInstance.get(
    `/onecall?appid=5796abbde9106b7da4febfae8c44c232&${query}`,
  );
  return response.data;
};
const findLocationWithSearch = async (query?: string): Promise<ListCityResponse | undefined> => {
  const response: AxiosResponse<ListCityResponse> = await axiosInstance.get(
    `/find?appid=5796abbde9106b7da4febfae8c44c232&${query}`,
  );
  return response.data;
};
const getAirPollutionInCity = async (query?: string): Promise<AirPollutionResponse | undefined> => {
  const response: AxiosResponse<AirPollutionResponse> = await axiosInstance.get(
    `/air_pollution?appid=5796abbde9106b7da4febfae8c44c232&${query}`,
  );
  return response.data;
};

export { getWeatherInCity, findLocationWithSearch, getAirPollutionInCity };
