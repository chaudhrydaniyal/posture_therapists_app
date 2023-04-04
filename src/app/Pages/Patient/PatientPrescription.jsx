import React,{useState,useEffect} from 'react'
import Table from 'react-bootstrap/Table';
import { Box, styled, Button, Icon } from '@mui/material';
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';
import { Breadcrumb, SimpleCard } from 'app/components';
import axios from 'axios';
import { Form } from 'react-bootstrap';
import { Span } from "app/components/Typography";

const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: { margin: '16px' },
    '& .breadcrumb': {
        marginBottom: '30px',
        [theme.breakpoints.down('sm')]: { marginBottom: '16px' }
    }
}));


const PatientPrescription = ({nextStep, handleFormData,values,prevStep}) => {
    const [patientVisitData,setPatientVisitData] = useState({
        personal_conditions: values.personal_conditions,
            current_treatment: values.current_treatment,
            remarks: values.remarks,
            AssTrauma_diseases: values.AssTrauma_diseases,
            ROMstatus: values.ROMstatus,
            muscle_status: values.muscle_status,
            skin_soft_tissues_pain: values.skin_soft_tissues_pain,
            cardio_vascular_status: values.cardio_vascular_status,
            general_mobility: values.general_mobility,
            transfers: values.transfers,
            balance: values.balance,
            upper_limb_functions: values.upper_limb_functions,
            daily_life_activities: values.daily_life_activities,
            DiagnosisICD10code: values.DiagnosisICD10code,
        BriefMedicalHistory: values.BriefMedicalHistory,
        WeightBearingPrecautions: values.WeightBearingPrecautions,
        ActivityRestrictions: values.ActivityRestrictions,
        OtherMedicalConsiderations: values.OtherMedicalConsiderations,
        PhysicalTherapyEvaluationTreatment: values.PhysicalTherapyEvaluationTreatment,
        Other: values.Other,
        AnticipatedFrequencyDuration: values.AnticipatedFrequencyDuration,
        SpecialInstructions: values.SpecialInstructions
    })
    const [prescriptionDetails,setPrescriptionDetails] = useState({
        DiagnosisICD10code: "",
        BriefMedicalHistory: "",
        WeightBearingPrecautions: "",
        ActivityRestrictions: "",
        OtherMedicalConsiderations: "",
        PhysicalTherapyEvaluationTreatment: "",
        Other: "",
        AnticipatedFrequencyDuration: "",
        SpecialInstructions: ""
    })
    const recorderControls = useAudioRecorder()
    const addAudioElement = (blob) => {
        const url = URL.createObjectURL(blob);
        const audio = document.createElement("audio");
        audio.src = url;
        audio.controls = true;

        document.getElementById('AudioRecorder').appendChild(audio);
    };
    // const handleFormData = async (e) => {
    //     let name, value;
    
    //     name = e.target.name;
    //     value = e.target.value;
    
    //     await setPrescriptionDetails({
    //       ...prescriptionDetails,
    //       [name]: value,
    //     });
    //   };
    const handleInput = (e) => {
        setPrescriptionDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      };
    
    const submitFormData=(e)=>{
        e.preventDefault();
    };

    const handleSubmit= async()=>{
        try{
            await axios.post('/api/patientvisits',{...patientVisitData,...prescriptionDetails})
        } catch(error){
            console.log("error",error)
        }
        patientVisitData("")
        prescriptionDetails("")

    }

    
  return (
    <Container>
          <Box className="breadcrumb">
                <Breadcrumb routeSegments={[{ name: 'Patient Prescription' }]} />
            </Box>
    <div className='card'>
    <div className='card-body'>
        <h4>Diagnosis</h4>
<Form onSubmit={submitFormData}>
        <div className="row" style={{ marginTop: "2rem" }}>
            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                <label htmlFor="DiagnosisICD10code">
                    {" "}
                    <div>Diagnosis-ICD10-code:</div>
                </label>
            </div>
            <div className="col-xl-4 col-lg-2 col-sm-2 border p-3" >
                {" "}
                <input className="input_width" type="text" name="DiagnosisICD10code" placeholder="Diagnosis-ICD-10-code..." value={prescriptionDetails.DiagnosisICD10code} onChange={handleInput} />
            </div>
            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                <label htmlFor="BriefMedicalHistory">
                    {" "}
                    <div>Brief-Medical-History:</div>
                </label>
            </div>
            <div className="col-xl-4 col-lg-2 col-sm-2 border p-3">
                {" "}
                <input className="input_width" type="text" name="BriefMedicalHistory" placeholder="Brief-Medical-History..." value={prescriptionDetails.BriefMedicalHistory} onChange={handleInput} />

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
                    value={prescriptionDetails.PhysicalTherapyEvaluationTreatment}
                    onChange={handleInput}
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
                    value={prescriptionDetails.Other}
                    onChange={handleInput}
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
                    value={prescriptionDetails.AnticipatedFrequencyDuration}
                    onChange={handleInput}
                />
            </div>
            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                <label htmlFor="Special-Instructions">
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
                value={prescriptionDetails.SpecialInstructions}
                    onChange={handleInput}
                />
            </div>



        </div>
       <div style={{marginTop:'2rem'}}>

        <Table bordered >
      <thead>
        <tr>
          <th style={{width:'20%'}}>Precaution</th>
          {/* <th style={{width:'10%'}}>No/Yes</th> */}
          <th>IF yes, Please describe/define </th>
          
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Weight bearing precaution?</td>
          {/* <td><input className='input_border' style={{width:'3rem'}} /></td> */}
          <td><input className='input_border' style={{width:'100%'}} name="WeightBearingPrecautions" value={prescriptionDetails.WeightBearingPrecautions} onChange={handleInput} /></td>
        
        </tr>
        <tr>
          <td>Activity restrictions?</td>
          {/* <td><input className='input_border' style={{width:'3rem'}}/></td> */}
          <td><input className='input_border' style={{width:'100%'}} name="ActivityRestrictions" value={prescriptionDetails.ActivityRestrictions} onChange={handleInput} /></td>
          
        </tr>
        <tr>
          <td>Other medical consideration?</td>
          {/* <td><input className='input_border' style={{width:'3rem'}}/></td> */}
          <td><input className='input_border' style={{width:'100%'}} name="OtherMedicalConsiderations" onChange={handleInput} /></td>
        </tr>
      </tbody>
    </Table>
</div>
<div id='AudioRecorder'> 
                        <AudioRecorder
                            onRecordingComplete={(blob) => addAudioElement(blob)}
                            recorderControls={recorderControls}
                        />
                        <Button style={{marginTop:'3rem',color:'red'}} onClick={recorderControls.stopRecording}>Stop recording</Button>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                    <Button color="primary" variant="contained" onClick={prevStep} style={{marginRight:'2rem'}}>
                Previous
              </Button>
{/* <button style={{ padding: "0.5rem", border: "0.5px solid grey", borderRadius: "5px", fontWeight: "bold", background: "#365CAD", color: "white" }} type="button" onClick={handleSubmit}>Submit</button> */}
<Button color="primary" variant="contained" type="submit" onClick={handleSubmit}>
    <Icon>send</Icon>
    <Span sx={{ pl: 1, textTransform: "capitalize" }}>Submit</Span>
</Button>
</div>
</Form>

    </div>
</div>
</Container>
  )
}

export default PatientPrescription