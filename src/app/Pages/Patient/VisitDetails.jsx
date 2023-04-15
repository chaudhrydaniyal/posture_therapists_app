import React, {useState,useEffect} from 'react'
import { Box, styled, Button, Icon } from '@mui/material';
import { Span } from "app/components/Typography";
import { Breadcrumb, SimpleCard } from 'app/components';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Accordion from 'react-bootstrap/Accordion';
import Table from 'react-bootstrap/Table';


const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: { margin: '16px' },
    '& .breadcrumb': {
        marginBottom: '30px',
        [theme.breakpoints.down('sm')]: { marginBottom: '16px' }
    }
}));


const VisitDetails = () => {
    

    // eslint-disable-next-line react-hooks/rules-of-hooks
    var visit = useLocation();
    var visitDetails = visit.state.visitsHistory
{console.log("visitDetails",visitDetails)}
    const [PatientPrescription,setPatientPrescription] = useState([])
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
    DiagnosisICD10code:visitDetails.DiagnosisICD10code,
    BriefMedicalHistory:visitDetails.BriefMedicalHistory,
    PhysicalTherapyEvaluationTreatment:visitDetails.PhysicalTherapyEvaluationTreatment,
    AnticipatedFrequencyDuration:visitDetails.AnticipatedFrequencyDuration,
    SpecialInstructions:visitDetails.SpecialInstructions,
    WeightBearingPrecautions:visitDetails.WeightBearingPrecautions,
    ActivityRestrictions:visitDetails.ActivityRestrictions,
    audioFile:visitDetails.audioFile

    })
    
    const handleInput = (e) => {
        let name, value;

        console.log(e);
        name = e.target.name;
        value = e.target.value;
        setData({ ...data, [name]: value });
    };

    useEffect(()=>{
        axios.get('/api/patientvisits/').then((res)=>{setPatientPrescription(res.data);console.log('resss',res)})
        console.log("patientPrescription",PatientPrescription)

    },[])

  return (
    <Container>

    {/* <section className="content"> */}

    <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: 'Visit Details' }]} />
    </Box>

    {/* ************************Patient Visit**************** */}
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Patient Diagnosis</Accordion.Header>
        <Accordion.Body>

    <div className='card'>
        <div className='card-body'>
            <h4>Personal Factors</h4>

            <div className="row" style={{ marginTop: "2rem" }}>
                <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                    <label htmlFor="personal_conditions">
                        {" "}
                        <div>Personal Conditions:</div>
                    </label>
                </div>
                <div className="col-xl-4 col-lg-4 col-sm-4 border p-3" >
                    {" "}
                    <input className="input_width" type="text" name="personal_conditions" placeholder="personal conditions..." defaultValue={data.personal_conditions} onChange={handleInput}/>
                </div>
                <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                    <label htmlFor="current_treatment">
                        {" "}
                        <div>Current Treatment:</div>
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
                        <div>Remarks:</div>
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
                        <div>Ass.trauma & Disease:</div>
                    </label>
                </div>
                <div className="col-xl-4 col-lg-2 col-sm-2 border p-3" >
                    {" "}
                    <input className="input_width" type="text" name="AssTrauma_diseases" placeholder="Ass.trauma & disease..." value={data.AssTrauma_diseases} onChange={handleInput} />
                </div>
                <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                    <label htmlFor="ROMstatus">
                        {" "}
                        <div>R.O.M status:</div>
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
                        <div>Muscle status:</div>
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
                        <div>Skin & Soft tissue/pain:</div>
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
                        <div>Cardio vascular status:</div>
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
                        <div>General Mobility(gait):</div>
                    </label>
                </div>
                <div className="col-xl-4 col-lg-2 col-sm-2 border p-3" >
                    {" "}
                    <input className="input_width" type="text" name="general_mobility" placeholder="general mobility..." value={data.general_mobility} onChange={handleInput}/>
                </div>
                <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                    <label htmlFor="transfers">
                        {" "}
                        <div>Transfers:</div>
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
                        <div>Balance:</div>
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
                        <div>Upper Limb Functions :</div>
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
                        <div>Daily Life Activities:</div>
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
    </Accordion.Body>
    </Accordion.Item>
    <Accordion.Item eventKey="1">
        <Accordion.Header>Patient Prescription</Accordion.Header>
        <Accordion.Body>
        <div className='card'>
                <div className='card-body'>
                    <h4>Prescription</h4>
                    
                        <div className="row" style={{ marginTop: "2rem" }}>
                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                                <label htmlFor="DiagnosisICD10code">
                                    {" "}
                                    <div>Diagnosis-ICD10-code:</div>
                                </label>
                            </div>
                            <div className="col-xl-4 col-lg-2 col-sm-2 border p-3" >
                                {" "}
                                <input className="input_width" type="text" name="DiagnosisICD10code" placeholder="Diagnosis-ICD-10-code..." value={data.DiagnosisICD10code}/>
                            </div>
                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                                <label htmlFor="BriefMedicalHistory">
                                    {" "}
                                    <div>Brief-Medical-History:</div>
                                </label>
                            </div>
                            <div className="col-xl-4 col-lg-2 col-sm-2 border p-3">
                                {" "}
                                <input className="input_width" type="text" name="BriefMedicalHistory" placeholder="Brief-Medical-History..." value={data.BriefMedicalHistory}/>

                            </div>

                        </div>

                        <div className="row">
                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                                <label htmlFor="PhysicalTherapyEvaluationTreatment">
                                    {" "}
                                    <div>Physical-Therapy-Evaluation-Treatment:</div>
                                </label>
                            </div>
                            <div className="col-xl-4 col-lg-2 col-sm-2 border p-3">
                                <input
                                    type="text"
                                    name="PhysicalTherapyEvaluationTreatment"
                                    placeholder="PhysicalTherapyEvaluationTreatment..."
                                    className="input_width"
                                    value={data.PhysicalTherapyEvaluationTreatment}
            
                                />
                            </div>
                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                                <label htmlFor="Other">
                                    {" "}
                                    <div>Other:</div>
                                </label>
                            </div>
                            <div className="col-xl-4 col-lg-2 col-sm-2 border p-3">
                                <input
                                    type="text"
                                    name="Other"
                                    placeholder="Other..."
                                    className="input_width"
                                    // value={PatientPrescription.Other}
        
                                />
                            </div>

                        </div>

                        <div className="row">
                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                                <label htmlFor="AnticipatedFrequencyDuration">
                                    {" "}
                                    <div>Anticipated-Frequency-Duration:</div>
                                </label>
                            </div>
                            <div className="col-xl-4 col-lg-2 col-sm-2 border p-3">
                                <input
                                    type="text"
                                    name="AnticipatedFrequencyDuration"
                                    placeholder="Anticipated-Frequency-Duration..."
                                    className="input_width"
                                    value={data.AnticipatedFrequencyDuration}
                                    
                                />
                            </div>
                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                                <label htmlFor="SpecialInstructions">
                                    {" "}
                                    <div>Special-Instructions:</div>
                                </label>
                            </div>
                            <div className="col-xl-4 col-lg-2 col-sm-2 border p-3">
                                <input
                                    type="text"
                                    name="SpecialInstructions"
                                    placeholder="SpecialInstructions..."
                                    className="input_width"
                                    value={data.SpecialInstructions}
                            
                                />
                            </div>


                        </div>
                        <div style={{ marginTop: '2rem' }}>

                            <Table bordered >
                                <thead>
                                    <tr>
                                        <th style={{ width: '20%' }}>Precaution</th>
                                        {/* <th style={{width:'10%'}}>No/Yes</th> */}
                                        <th>IF yes, Please describe/define </th>

                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Weight bearing precaution?</td>
                                        {/* <td><input className='input_border' style={{width:'3rem'}} /></td> */}
                                        <td><input className='input_border' style={{ width: '100%' }} name="WeightBearingPrecautions" value={data.WeightBearingPrecautions}/></td>

                                    </tr>
                                    <tr>
                                        <td>Activity restrictions?</td>
                                        {/* <td><input className='input_border' style={{width:'3rem'}}/></td> */}
                                        <td><input className='input_border' style={{ width: '100%' }} name="ActivityRestrictions" value={data.ActivityRestrictions}/></td>

                                    </tr>
                                    <tr>
                                        <td>Other medical consideration?</td>
                                        {/* <td><input className='input_border' style={{width:'3rem'}}/></td> */}
                                        <td><input className='input_border' style={{ width: '100%' }} name="OtherMedicalConsiderations" /></td>
                                    </tr>
                                </tbody>
                                <div style={{marginTop:'2rem'}}>
                                <audio controls>
                                    <source src={`/${data.audioFile}`} type="audio/ogg"/>
                                    {console.log("audioFile",data.audioFile)}

                                </audio>
                                </div>
                            </Table>
                        </div>
                </div>
            </div>
        </Accordion.Body>
    </Accordion.Item>
    <Accordion.Item eventKey="3">
        <Accordion.Header>Invoice</Accordion.Header>
        <Accordion.Body>

        </Accordion.Body>
    </Accordion.Item>
    </Accordion>
</Container>
  )
}

export default VisitDetails