import React from 'react';
import 'leaflet/dist/leaflet.css';
import { IconContext } from 'react-icons';
import { FaMapMarkerAlt } from 'react-icons/fa';
import L from 'leaflet';
import ReactDOMServer from 'react-dom/server';

const MarkerIcon = () => {
    // Generate a random color
    const red = Math.floor(Math.random() * 128);  // Random number between 127 and 255
    const green = Math.floor(Math.random() * 128);  // Random number between 127 and 255
    const blue = Math.floor(Math.random() * 128);  // Random number between 127 and 255
    const color = `rgb(${red}, ${green}, ${blue})`;

    return (
        <IconContext.Provider value={{ color: color, size: '2em' }}>
            <div>
                <FaMapMarkerAlt />
            </div>
        </IconContext.Provider>
    );
};

const getMarkerIcon = (area) => {
    // Generate a unique color based on the area
    const red = Math.floor(area.length * 50 % 256);
    const green = Math.floor(area.length * 100 % 256);
    const blue = Math.floor(area.length * 150 % 256);
    const color = `rgb(${red}, ${green}, ${blue})`;

    const markerIcon = L.divIcon({
        className: 'custom-icon',
        html: ReactDOMServer.renderToString(<MarkerIcon color={color} />),
        iconSize: [30, 30],
        iconAnchor: [15, 30],
    });
    return markerIcon;
};


export default getMarkerIcon;
