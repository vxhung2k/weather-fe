import { toNumber } from 'lodash-es';

export const PATH_NAME = {
  INDEX: 'home',
};

export const defaultCity = {
  cityName: 'Ha Noi',
  coordinates: {
    lat: toNumber(import.meta.env.VITE_COORDINATES_LAT) ?? 21.0245,
    lon: toNumber(import.meta.env.VITE_COORDINATES_LON) ?? 105.8412,
  },
};
