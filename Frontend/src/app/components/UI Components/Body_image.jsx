import React, { useState } from 'react';
import ImageMarker, { Marker } from 'react-image-marker';
import complete_body from '../Image/complete_body.jpg'
import Button from '@mui/material/Button';
import axios from 'axios';


const Body = () => {

  const [markers, setMarkers] = useState([]);
  
  const [addMarkerEnabled, setAddMarkerEnabled] = useState(false);

  const handleAddMarker = (marker) => {

    if (addMarkerEnabled) {
    setMarkers([...markers, marker]);
    console.log("markers",markers)
    }

  };

  
  const handleResetMarker =()=>{
    setMarkers([])
  }

 
  const handleToggleAddMarker = () => {
    setAddMarkerEnabled(!addMarkerEnabled);
  };
 

  const handleSubmit=async()=>{
    const imageData={
      image:{complete_body},
      marker:markers
    }
    try{

      const body_data = await axios.post(process.env.REACT_APP_ORIGIN_URL + '',imageData)
    }catch(error){
      console.log("image_data_error",error)

    }

  }

  return (
    <> 

<div style={{display:"flex",justifyContent:"center",marginTop:"1rem",marginBottom:"1rem"}}>

      <h6 >PHYSICAL ASSESSMENT<br></br>SEE  DIAGRAM</h6>

</div>
 
    <ImageMarker
      src={complete_body}
      markers={markers}
      onAddMarker={handleAddMarker}
    />

    <div style={{display:"flex",marginTop:"1rem",justifyContent:"center"}}>

    <Button style={{color:"white",background:"#ED2B2A",border:"none"}} onClick={handleResetMarker} >Reset</Button>

     <Button style={{marginLeft:"1rem"}} variant="contained" onClick={handleToggleAddMarker}>
        {addMarkerEnabled ? 'Disable' : 'Enable'}
      </Button>

</div>

    </>

  );
};

export default Body;
