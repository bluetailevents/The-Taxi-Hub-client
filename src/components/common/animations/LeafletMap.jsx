import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Define the default icon for markers using Leaflet's icon URL
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const ChangeView = ({ center, zoom }) => {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

const LeafletMap = ({ coordinates }) => {
  // This effect ensures the map is properly initialized
  useEffect(() => {
    const container = L.DomUtil.get('map');
    if (container != null) {
      container._leaflet_id = null;
    }
  }, []);

  return (
    <MapContainer 
        center={[coordinates[0][0], coordinates[0][1]]} 
        zoom={13} 
        scrollWheelZoom={false} 
        id="map" 
        style={{ 
            height: '100%', 
            width: '100%',
            zIndex: 0,
            position: 'absolute',
        }}
    >
      <ChangeView center={[coordinates[0][0], coordinates[0][1]]} zoom={15} />
      <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {coordinates.map((coord, index) => (
        <Marker key={index} position={coord}>
          <Popup>
            A marker for the coordinate.
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default LeafletMap;
