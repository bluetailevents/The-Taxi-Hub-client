import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Define the default icon for markers using Leaflet's icon URL
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const LeafletMap = ({ coordinates }) => {
  // This effect ensures the map is properly initialized
  useEffect(() => {
    const container = L.DomUtil.get('map');
    if (container != null) {
      container._leaflet_id = null;
    }
  }, []);

  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false} id="map" style={{ height: '100%', width: '100%' }}>
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
