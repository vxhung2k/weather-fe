export interface Coordinates {
  lat: number;
  lon: number;
}
export interface City {
  cityName?: string;
  coordinates?: Coordinates;
}
export interface Weather {
  description?: string;
  icon?: string;
  id?: number;
  main?: string;
}
export interface Temp {
  day?: number;
  min?: number;
  max?: number;
  night?: number;
  eve?: number;
  morn?: number;
}

export interface FeelsLike {
  day?: number;
  night?: number;
  eve?: number;
  morn?: number;
}
export interface Current {
  clouds?: number;
  dew_point?: number;
  dt?: number;
  feels_like?: number;
  humidity?: number;
  pressure?: number;
  sunrise?: number;
  sunset?: number;
  temp?: number;
  uvi?: number;
  visibility?: number;
  weather?: Weather[];
  wind_deg?: number;
  wind_gust?: number;
  wind_speed?: number;
}
export interface Daily {
  dt?: number;
  sunrise?: number;
  sunset?: number;
  moonrise?: number;
  moonset?: number;
  moon_phase?: number;
  temp?: Temp;
  feels_like?: FeelsLike;
  pressure?: number;
  humidity?: number;
  dew_point?: number;
  wind_speed?: number;
  wind_deg?: number;
  wind_gust?: number;
  weather?: Weather[];
  clouds?: number;
  pop?: number;
  uvi?: number;
  rain?: number;
}
export interface OpenWeather {
  lat?: number;
  lon?: number;
  timezone?: string;
  timezone_offset?: number;
  current?: Current;
  daily?: Daily[];
}
//for response
export interface Response<T> {
  data?: T;
  message?: string;
  statusCode?: number;
}
export type OpenWeatherResponse = Response<OpenWeather>;
//for list country

export interface List {
  coord?: Coordinates;
  name?: string;
  sys?: {
    country?: string;
  };
  weather?: Weather[];
  main?: { temp?: number };
}
export interface ListCity {
  list?: List[];
}

export type ListCityResponse = ListCity;
//for air pollution
export interface Components {
  co?: number;
  no?: number;
  no2?: number;
  o3?: number;
  so2?: number;
  pm2_5?: number;
  pm10?: number;
  nh3?: number;
}
export interface ListAirPollution {
  components?: Components;
  dt?: number;
  main?: {
    aqi?: number;
  };
}
export interface AirPollution {
  coord?: Coordinates;
  list?: ListAirPollution[];
}
export type AirPollutionResponse = AirPollution;

//context data
export interface MainData {
  airPollution?: AirPollution;
  openWeather?: OpenWeather;
}
