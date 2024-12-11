import { Navigate, RouteObject } from 'react-router-dom';
import { PATH_NAME } from './App.consts';
import InternalLayout from '../layout/InternalLayout';
import WeatherBusiness from './weather-business/WeatherBusiness';

export const routeObjects: RouteObject[] = [
  { path: '/', element: <Navigate to={`${PATH_NAME.INDEX}`} /> },
  {
    path: `/${PATH_NAME.INDEX}`,
    element: <InternalLayout />,
    children: [
      {
        path: `/${PATH_NAME.INDEX}`,
        element: <WeatherBusiness />,
      },
    ],
  },
];
