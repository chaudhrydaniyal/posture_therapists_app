import React,{useState,useEffect} from 'react'
import { Box, styled, Button, Icon } from '@mui/material';
import { Span } from "app/components/Typography";
import { Breadcrumb, SimpleCard } from 'app/components';
import axios from 'axios';
import { useLocation } from 'react-router-dom';



const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: { margin: '16px' },
    '& .breadcrumb': {
        marginBottom: '30px',
        [theme.breakpoints.down('sm')]: { marginBottom: '16px' }
    }
}));


const VisitDetails = () => {
    var visit = useLocation();
    var visitDetails = visit.state.visitsHistory

    const [data,setData] = useState({ 
    personal_conditions: visitDetails.personal_conditions,
    current_treatment: visitDetails.current_treatment,
    remarks: visitDetails.remarks,
    AssTrauma_diseases: visitDetails.AssTrauma_diseases,
    ROMstatus: visitDetails.ROMstatus,
    muscle_status: visitDetails.muscle_status,
    skin_soft_tissues_pain: visitDetails.skin_soft_tissues_pain,
    cardio_vascular_status: visitDetails.cardio_vascular_status,
    general_mobility: visitDetails.general_mobility,
    transfers: visitDetails.transfers,
    balance: visitDetails.balance,
    upper_limb_functions: visitDetails.upper_limb_functions,
    daily_life_activities: visitDetails.daily_life_activities,

    })

    const handleInput = (e) => {
        let name, value;

        console.log(e);
        name = e.target.name;
        value = e.target.value;
        setData({ ...data, [name]: value });
    };

  return (
    <Container>

    {/* <section className="content"> */}

    <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: 'Patient Registration' }]} />
    </Box>

    {/* ************************Patient Visit**************** */}

    <div className='card'>
        <div className='card-body'>
            <h4>Personal Factors</h4>

            <div className="row" style={{ marginTop: "2rem" }}>
                <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                    <label htmlFor="personal_conditions">
                        {" "}
                        <h6>Personal Conditions:</h6>
                    </label>
                </div>
                <div className="col-xl-4 col-lg-2 col-sm-2 border p-3" >
                    {" "}
                    <input className="input_width" type="text" name="personal_conditions" placeholder="personal conditions..." value={data.personal_conditions} onChange={handleInput}/>
                </div>
                <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                    <label htmlFor="current_treatment">
                        {" "}
                        <h6>Current Treatment:</h6>
                    </label>
                </div>
                <div className="col-xl-4 col-lg-2 col-sm-2 border p-3">
                    {" "}
                    <input className="input_width" type="text" name="current_treatment" placeholder="current treatment..." value={data.current_treatment} onChange={handleInput}/>

                </div>

            </div>

            <div className="row">
                <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                    <label htmlFor="remarks">
                        {" "}
                        <h6>Remarks:</h6>
                    </label>
                </div>
                <div className="col-xl-4 col-lg-2 col-sm-2 border p-3">
                    <input
                        type="text"
                        name="remarks"
                        placeholder="remarks..."
                        className="input_width"
                        value={data.remarks}
                        onChange={handleInput}

                    />
                </div>



            </div>
            <h4 style={{ marginTop: '1rem' }}>Body Structure And Function Impairments   </h4>
            <div className="row" style={{ marginTop: "2rem" }}>
                <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                    <label htmlFor="AssTrauma_diseases">
                        {" "}
                        <h6>Ass.trauma & Disease:</h6>
                    </label>
                </div>
                <div className="col-xl-4 col-lg-2 col-sm-2 border p-3" >
                    {" "}
                    <input className="input_width" type="text" name="AssTrauma_diseases" placeholder="Ass.trauma & disease..." value={data.AssTrauma_diseases} onChange={handleInput} />
                </div>
                <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                    <label htmlFor="ROMstatus">
                        {" "}
                        <h6>R.O.M status:</h6>
                    </label>
                </div>
                <div className="col-xl-4 col-lg-2 col-sm-2 border p-3">
                    {" "}
                    <input className="input_width" type="text" name="ROMstatus" placeholder="R.O.M status..." value={data.ROMstatus} onChange={handleInput}/>

                </div>


            </div>

            <div className="row">
                <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                    <label htmlFor="muscle_status">
                        {" "}
                        <h6>Muscle status:</h6>
                    </label>
                </div>
                <div className="col-xl-4 col-lg-2 col-sm-2 border p-3">
                    <input
                        className="input_width"
                        type="text"
                        name="muscle_status"
                        placeholder="muscle status..."
                        value={data.muscle_status}
                        onChange={handleInput}

                    />
                </div>
                <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                    <label htmlFor="skin_soft_tissues_pain">
                        {" "}
                        <h6>Skin & Soft tissue/pain:</h6>
                    </label>
                </div>
                <div className="col-xl-4 col-lg-2 col-sm-2 border p-3">
                    {" "}
                    <input
                        className="input_width"
                        name="skin_soft_tissues_pain"
                        type="text"
                        placeholder="skin & soft tissue/pain..."
                        value={data.skin_soft_tissues_pain}
                        onChange={handleInput}


                    />

                </div>


            </div>

            <div className="row">
                <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                    <label htmlFor="cardio_vascular_status">
                        {" "}
                        <h6>Cardio vascular status:</h6>
                    </label>
                </div>
                <div className="col-xl-4 col-lg-2 col-sm-2 border p-3">
                    <input
                        className="input_width"
                        type="text"
                        name="cardio_vascular_status"
                        placeholder="cardio vascular status..."
                        value={data.cardio_vascular_status}
                        onChange={handleInput}

                    />
                </div>




            </div>

            <h4 style={{ marginTop: '1rem' }}>Activity Limitations & Participation Restriction  </h4>
            <div className="row" style={{ marginTop: "2rem" }}>
                <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                    <label htmlFor="general_mobility">
                        {" "}
                        <h6>General Mobility(gait):</h6>
                    </label>
                </div>
                <div className="col-xl-4 col-lg-2 col-sm-2 border p-3" >
                    {" "}
                    <input className="input_width" type="text" name="general_mobility" placeholder="general mobility..." value={data.general_mobility} onChange={handleInput}/>
                </div>
                <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                    <label htmlFor="transfers">
                        {" "}
                        <h6>Transfers:</h6>
                    </label>
                </div>
                <div className="col-xl-4 col-lg-2 col-sm-2 border p-3">
                    {" "}
                    <input className="input_width" type="text" name="transfers" placeholder="transfers..." value={data.transfers} onChange={handleInput}/>

                </div>


            </div>

            <div className="row">
                <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                    <label htmlFor="balance">
                        {" "}
                        <h6>Balance:</h6>
                    </label>
                </div>
                <div className="col-xl-4 col-lg-2 col-sm-2 border p-3">
                    <input
                        className="input_width"
                        type="text"
                        name="balance"
                        placeholder="balance..."
                        value={data.balance}
                        onChange={handleInput}

                    />
                </div>
                <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                    <label htmlFor="upper_limb_functions">
                        {" "}
                        <h6>Upper Limb Functions :</h6>
                    </label>
                </div>
                <div className="col-xl-4 col-lg-2 col-sm-2 border p-3">
                    {" "}
                    <input
                        className="input_width"
                        name="upper_limb_functions"
                        type="text"
                        placeholder="upper limb functions..."
                        value={data.upper_limb_functions}
                        onChange={handleInput}

                    />

                </div>


            </div>

            <div className="row">
                <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                    <label htmlFor="daily_life_activities">
                        {" "}
                        <h6>Daily Life Activities:</h6>
                    </label>
                </div>
                <div className="col-xl-4 col-lg-2 col-sm-2 border p-3">
                    <input
                        className="input_width"
                        type="text"
                        name="daily_life_activities"
                        placeholder="daily life activities..."
                        value={data.daily_life_activities}
                        onChange={handleInput} 

                    />
                </div>




            </div>
            {/* <div style={{display:'flex',justifyContent:'flex-end',marginTop:'1rem'}}>

{/* <button style={{ padding: "0.5rem", border: "0.5px solid grey", borderRadius: "5px", fontWeight: "bold", background: "#365CAD", color: "white" }} type="button" onClick={handleSubmit}>Submit</button> */}
{/* <Button color="primary" variant="contained" type="submit" onClick={handleSubmit}>
<Icon>send</Icon>
<Span sx={{ pl: 1, textTransform: "capitalize" }}>Submit</Span>
</Button>
</div>  */}


        </div>
    </div>
</Container>
  )
}

export default VisitDetails