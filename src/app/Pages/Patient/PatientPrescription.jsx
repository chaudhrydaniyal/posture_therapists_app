import React,{useState,useEffect} from 'react'
import Table from 'react-bootstrap/Table';
import { Box, styled, Button, Icon } from '@mui/material';
const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: { margin: '16px' },
    '& .breadcrumb': {
        marginBottom: '30px',
        [theme.breakpoints.down('sm')]: { marginBottom: '16px' }
    }
}));
const PatientPrescription = () => {
  return (
    <Container>
    <div className='card'>
    <div className='card-body'>
        <h4>Diagnosis</h4>

        <div className="row" style={{ marginTop: "2rem" }}>
            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                <label htmlFor="DiagnosisICD10code">
                    {" "}
                    <div>Diagnosis-ICD10-code:</div>
                </label>
            </div>
            <div className="col-xl-4 col-lg-2 col-sm-2 border p-3" >
                {" "}
                <input className="input_width" type="text" name="DiagnosisICD10code" placeholder="Diagnosis-ICD-10-code..."/>
            </div>
            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                <label htmlFor="BriefMedicalHistory">
                    {" "}
                    <div>Brief-Medical-History:</div>
                </label>
            </div>
            <div className="col-xl-4 col-lg-2 col-sm-2 border p-3">
                {" "}
                <input className="input_width" type="text" name="BriefMedicalHistory" placeholder="Brief-Medical-History..."/>

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
                />
            </div>



        </div>
       <div style={{marginTop:'2rem'}}>

        <Table bordered >
      <thead>
        <tr>
          <th>Precaution</th>
          <th>No/Yes</th>
          <th>IF yes, Please describe/define </th>
          
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Weight bearing precaution?</td>
          <td><input className='input_border' style={{width:'3rem'}} /></td>
          <td><input className='input_border' style={{width:'100%'}} /></td>
        
        </tr>
        <tr>
          <td>Activity restrictions?</td>
          <td><input className='input_border' style={{width:'3rem'}}/></td>
          <td><input className='input_border' style={{width:'100%'}} /></td>
          
        </tr>
        <tr>
          <td>Other medical consideration?</td>
          <td><input className='input_border' style={{width:'3rem'}}/></td>
          <td><input className='input_border' style={{width:'100%'}} /></td>
        </tr>
      </tbody>
    </Table>
</div>


    </div>
</div>
</Container>
  )
}

export default PatientPrescription