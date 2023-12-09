import React from 'react';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import LeafletMap from '../animations/LeafletMap';
import Modal from 'react-modal';

const Maps = React.memo(({ area }) => {
    const [mapModalIsOpen, setMapModalIsOpen] = useState(false);
    const section = useSelector((state) => state.sections.section);
    const option = useSelector((state) => state.sections.option);

    const openModal = () => {
        setMapModalIsOpen(true);
    }

    let mapsData;
    if (!area) {
        mapsData = [[section, option]];
    }
    else {
        mapsData = [[section, option, area]];
    }

    return (
        <div>
            <button onClick={openModal}>Open Maps</button>
            <Modal isOpen={mapModalIsOpen} ariaHideApp={false} style={{ overlay: { zIndex: 1000 } }}>
                <LeafletMap mapsData={mapsData}/>
                <button onClick={() => setMapModalIsOpen(false)}>Close Maps</button>
            </Modal>
        </div>
    );
});

export default Maps;
