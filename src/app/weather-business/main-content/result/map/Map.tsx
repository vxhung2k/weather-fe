import { icon, LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useContext, useMemo } from 'react';
import { MapContainer, Marker, TileLayer, useMap, ZoomControl } from 'react-leaflet';
import { WeatherContext, WeatherContextProps } from '../../../WeatherBusiness';

const Map = () => {
  const { city } = useContext<WeatherContextProps>(WeatherContext);
  const position = useMemo(
    () => [city?.coordinates?.lat, city?.coordinates?.lon],
    [city?.coordinates?.lat, city?.coordinates?.lon],
  ) as LatLngExpression;
  const markerIcon = icon({
    iconUrl: '/marker.svg',
    iconRetinaUrl: '/marker.svg',
  });

  const ChangeView = ({ position }: { position: LatLngExpression }) => {
    const map = useMap();
    map.setView(position);
    return null;
  };

  return (
    <div className='w-full h-[280px]'>
      <MapContainer
        zoomControl={false}
        scrollWheelZoom={false}
        center={position as LatLngExpression}
        zoom={13}
        minZoom={13}
        maxZoom={18}
        className='z-[0] h-full w-full'
      >
        <ChangeView position={position} />
        <TileLayer
          url='https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}'
          subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
        />
        <Marker position={position as LatLngExpression} icon={markerIcon} />
        <ZoomControl position='bottomright' />
      </MapContainer>
    </div>
  );
};

export default Map;
