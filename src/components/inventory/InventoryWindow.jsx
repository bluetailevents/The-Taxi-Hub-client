import React, { useEffect, useState } from 'react';
import axios from 'axios';

function InventoryWindow(props) {
  const [businesses, setBusinesses] = useState([]); // Define businesses as state

  useEffect(() => {
    async function fetchBusinessData() {
      try {
        const response = await axios.get(`http://localhost:5000/api/business/${props.id}`); // Use props.id to fetch data
        setBusinesses(response.data); // Update businesses state
      } catch (error) {
        console.error('Error fetching business data:', error);
      }
    }

    fetchBusinessData();
  }, [props.id]); // Include props.id in the dependency array

  return (
    <>
      <div>{/* You can map over businesses here and display the inventory */}</div>
      <div>InventoryWindow</div>
    </>
  );
}

export default InventoryWindow;
