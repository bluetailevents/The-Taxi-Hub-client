import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { getCoordinates } from '../../../features/coordinates/coordinatesSlice';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
import '../../../css/Maps.css';
import { useMemo } from 'react';

const MyMap = () => {
    const map = useMap();

    useEffect(() => {
        map.whenReady(() => {
            map.invalidateSize();
        });
    }, [map]);

    return null;
};

const LeafletMap = ({ mapsData }) => {
    const dispatch = useDispatch();
    const { coordinates, isLoading } = useSelector((state) => state.coordinates);
    const [features, setFeatures] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState({});
    const DefaultIcon = useMemo(() => (
        L.icon({
            iconUrl: icon,
            shadowUrl: iconShadow,
            iconSize: [25, 41],
            shadowSize: [41, 41],
            iconAnchor: [12, 41],
            shadowAnchor: [12, 41],
            popupAnchor: [1, -34]
        })
    ), []);

    useEffect(() => {
        dispatch(getCoordinates());
    }, [dispatch]);

    useEffect(() => {
        if (coordinates && coordinates.length > 0 && coordinates[0]) {
            setFeatures(coordinates[0]?.features);
            const uniqueSectionsSubsectionsAreas = [...new Set(coordinates[0]?.features.map(feature => `${feature.properties.Section}-${feature.properties.Subsection}-${feature.properties.Area}`))];
            setSelectedOptions(uniqueSectionsSubsectionsAreas.reduce((acc, curr) => ({ ...acc, [curr]: mapsData.includes(curr) }), {}));
        }
    }, [coordinates, mapsData]); // Add coordinates and mapsData as dependencies
    
    if (isLoading) {
        return <div>Loading...</div>;
    }
    
    L.Marker.prototype.options.icon = DefaultIcon;

    const handleCheckboxChange = (event, type) => {
        const { name, checked } = event.target;
        if (type === "area") {
            setSelectedOptions((prevSelectedOptions) => ({
                ...prevSelectedOptions,
                [name]: checked,
            }));
        }
    };
    
    const sections = [...new Set(Object.keys(selectedOptions).map(option => option.split('-')[0]))];

    return (
        <div>
            <MapContainer center={[55.8404127, -4.1768859]} zoom={13} style={{ height: "85vh", width: "100%" }}>
                <MyMap />
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={[55.8404127, -4.1768859]} />
                {features && features.map((feature, index) => {
                    const coordinates = feature.geometry.coordinates;
                    if (Array.isArray(coordinates) && coordinates.length === 2 && typeof coordinates[0] === 'number' && typeof coordinates[1] === 'number') {
                        const [longitude, latitude] = coordinates;
                        if (selectedOptions[`${feature.properties.Section}-${feature.properties.Subsection}-${feature.properties.Area}`]) {
                            return (
                                <Marker
                                    key={index}
                                    position={[latitude, longitude]}
                                >
                                    <Popup>
                                        <span>Section: {feature.properties.Section}</span><br/>
                                        <span>Subsection: {feature.properties.Subsection}</span><br/>
                                        <span>Area: {feature.properties.Area}</span><br/>
                                        <span>Street: {feature.properties.Street}</span><br/>
                                        <span>Postcode: {feature.properties.Postcode}</span>
                                    </Popup>
                                </Marker>
                            );
                        }
                    }
                    return null; // Added to handle cases where the condition is not met
                })}
            </MapContainer>
            {!isLoading && features && features.length > 0 && (
    <div className="map-legend">
        {sections.map((section, index) => (
                    <div key={index}>
                        <input
                            type="checkbox"
                            id={section}
                            name={section}
                            checked={Object.keys(selectedOptions)
                                .filter((option) => option.startsWith(section + '-'))
                                .every((option) => selectedOptions[option])}
                            onChange={(event) => {
                                const checked = event.target.checked;
                                setSelectedOptions((prevSelectedOptions) => {
                                    const newSelectedOptions = { ...prevSelectedOptions };
                                    Object.keys(newSelectedOptions)
                                        .filter((option) => option.startsWith(section + '-'))
                                        .forEach((option) => (newSelectedOptions[option] = checked));
                                    return newSelectedOptions;
                                });
                            }}
                        />
                        <label htmlFor={section}>{section}</label>
                        <div style={{ marginLeft: '20px' }}>
    {Object.keys(selectedOptions)
        .filter((option) => option.startsWith(section + '-'))
        .map((option, index) => (
            <div key={index}>
                <input
                    type="checkbox"
                    id={option}
                    name={option}
                    checked={selectedOptions[option]}
                    onChange={(event) => handleCheckboxChange(event, "area")}
                />
                <label htmlFor={option}>{option.split('-')[1]}</label>
                {features
                    .filter(
                        (feature) =>
                            feature.properties.Section === section &&
                            feature.properties.Subsection === option.split('-')[1]
                    )
                    .map((feature) => (
                        <div key={`${section}-${option.split('-')[1]}-${feature.properties.Category}`}>
                            <input
                                type="checkbox"
                                id={`${section}-${option.split('.')[1]}-${feature.properties.Category}`}
                                name={`${section}-${option.split('.')[1]}-${feature.properties.Category}`}
                                checked={selectedOptions[`${section}-${option.split('.')[1]}-${feature.properties.Category}`]}
                                onChange={(event) => handleCheckboxChange(event, "area")}
                            />
                            <label htmlFor={`${section}-${option.split('-')[1]}-${feature.properties.Category}`}>
                                {feature.properties.Category}
                            </label>
                            <div style={{ marginLeft: '20px' }}>
                                <label>{feature.properties.Street}</label>
                            </div>
                        </div>
                    ))}
            </div>
        ))}
</div>
                    </div>
                ))}
    </div>
            )}
        </div>
        
    );   
};

export default LeafletMap;
