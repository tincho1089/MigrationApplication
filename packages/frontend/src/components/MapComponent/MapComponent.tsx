import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, Map as LeafletMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L, { LatLng } from 'leaflet';

// Corrige el problema de los iconos de Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

interface Location {
  lat: string;
  lng: string;
}

interface LocationMarkerProps {
  setLocation?: (location: Location) => void;
  position: LatLng;
  readOnly?: boolean;
  disableClicks?: boolean; // Añadimos la propiedad disableClicks
}

const LocationMarker: React.FC<LocationMarkerProps> = ({ setLocation, position, readOnly, disableClicks }) => {
  const map = useMapEvents({
    click(e) {
      if (!readOnly && !disableClicks && setLocation) {
        const { lat, lng } = e.latlng;
        setLocation({ lat: lat.toString(), lng: lng.toString() });
      }
    },
    locationfound(e) {
      if (!readOnly && !disableClicks && setLocation) {
        const { lat, lng } = e.latlng;
        setLocation({ lat: lat.toString(), lng: lng.toString() });
        map.setView(e.latlng, map.getZoom());
      }
    },
  });

  useEffect(() => {
    if (!readOnly && !disableClicks) {
      map.locate({ setView: true });
    }
  }, [map, readOnly, disableClicks]);

  return <Marker position={position} />;
};

interface MapComponentProps {
  setLocation?: (location: Location) => void;
  position: Location;
  readOnly?: boolean;
  externalStyles?: React.CSSProperties; // Añadimos la propiedad externalStyles
  disableDrag?: boolean; // Añadimos la propiedad disableDrag
}

const MapComponent: React.FC<MapComponentProps> = ({ setLocation, position = { lat: '0', lng: '0' }, readOnly, externalStyles, disableDrag }) => {
  const latLngPosition = new LatLng(parseFloat(position.lat), parseFloat(position.lng));
  const mapRef = useRef<LeafletMap>(null);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setView(latLngPosition, 13);
      if (disableDrag) {
        mapRef.current.dragging.disable();
      } else {
        mapRef.current.dragging.enable();
      }
    }
  }, [latLngPosition, disableDrag]);

  const defaultStyles = {
    height: '400px',
    width: '100%',
    ...externalStyles // Los estilos externos sobrescriben los internos si hay conflictos
  };

  return (
    <MapContainer
      center={latLngPosition}
      zoom={13}
      style={defaultStyles} // Aplicamos los estilos
      ref={mapRef}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <LocationMarker setLocation={setLocation} position={latLngPosition} readOnly={readOnly} />
    </MapContainer>
  );
};

export default MapComponent;
