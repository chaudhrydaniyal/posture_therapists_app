import React, { useState, useEffect } from "react";
import { Box, styled, Button, Icon } from "@mui/material";
import { Span } from "app/components/Typography";
import { Breadcrumb, SimpleCard } from "app/components";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import Table from "react-bootstrap/Table";
import Input from "app/components/UI Components/Input";
import complete_body from "./complete_body.jpg";
import ImageMarker, { Marker } from "react-image-marker";
// import Invoice from 'app/components/InvoiceData/Invoice';
import InvoiceData from "app/components/InvoiceData/InvoiceData";
const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

const VisitDetails = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  var visit = useLocation();
  var visitDetails = visit.state.visitsHistory;
  {
    console.log("visitDetails", visitDetails);
  }
  const [PatientPrescription, setPatientPrescription] = useState([]);
  const [data, setData] = useState({
    id: visitDetails.id,
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
    DiagnosisICD10code: visitDetails.DiagnosisICD10code,
    BriefMedicalHistory: visitDetails.BriefMedicalHistory,
    PhysicalTherapyEvaluationTreatment:
      visitDetails.PhysicalTherapyEvaluationTreatment,
    AnticipatedFrequencyDuration: visitDetails.AnticipatedFrequencyDuration,
    SpecialInstructions: visitDetails.SpecialInstructions,
    WeightBearingPrecautions: visitDetails.WeightBearingPrecautions,
    ActivityRestrictions: visitDetails.ActivityRestrictions,
    physicalAssessment: visitDetails.physical_assessment,

    audioFile: visitDetails.audioFile,
  });
  const [invoiceData, setInvoiceData] = useState([]);
  {
    console.log("map", data.physicalAssessment);
  }
  const handleInput = (e) => {
    let name, value;
    console.log(e);
    name = e.target.name;
    value = e.target.value;
    setData({ ...data, [name]: value });
  };

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_ORIGIN_URL + "api/patientvisits/",{
        headers:{
          Authorization: `Bearer ${localStorage.getItem('user')}`,
        }
      })
      .then((res) => {
        setPatientPrescription(res.data);
        console.log("resss", res);
      });
    axios
      .get(process.env.REACT_APP_ORIGIN_URL + `api/invoice/${data.id}`,{
        headers:{
          Authorization: `Bearer ${localStorage.getItem('user')}`,
        }
      })
      .then((res) => setInvoiceData(res.data));

    console.log("patientPrescription", PatientPrescription);
  }, []);

  return (
    <Container>
      {console.log("getIvoicedata", invoiceData)}

      {/* <section className="content"> */}

      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Visit Details" }]} />
      </Box>

      {/* ************************Patient Visit**************** */}
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Patient Diagnosis</Accordion.Header>
          <Accordion.Body>
            <div className="card">
              <div className="card-body">
                <h5>Personal Factors</h5>

                <div className="row" style={{ marginTop: "2rem" }}>
                  <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                    <label htmlFor="personal_conditions">
                      {" "}
                      <div>Personal Conditions:</div>
                    </label>
                  </div>
                  <div className="col-xl-4 col-lg-4 col-sm-4 border p-3">
                    {" "}
                    <Input
                      style={{ paddingLeft: "0.3rem" }}
                      type="text"
                      name="personal_conditions"
                      value={data.personal_conditions}
                      onChange={handleInput}
                    />
                  </div>
                  <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                    <label htmlFor="current_treatment">
                      {" "}
                      <div>Current Treatment:</div>
                    </label>
                  </div>
                  <div className="col-xl-4 col-lg-2 col-sm-2 border p-3">
                    {" "}
                    <Input
                      style={{ paddingLeft: "0.3rem" }}
                      type="text"
                      name="current_treatment"
                      value={data.current_treatment}
                      onChange={handleInput}
                    />
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
                    <Input
                      style={{ paddingLeft: "0.3rem" }}
                      type="text"
                      name="remarks"
                      label="Remarks"
                      className="Input_width"
                      value={data.remarks}
                      onChange={handleInput}
                    />
                  </div>
                </div>
                <h5 style={{ marginTop: "1rem" }}>
                  Body Structure And Function Impairments{" "}
                </h5>
                <div className="row" style={{ marginTop: "2rem" }}>
                  <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                    <label htmlFor="AssTrauma_diseases">
                      {" "}
                      <div>Ass.trauma & Disease:</div>
                    </label>
                  </div>
                  <div className="col-xl-4 col-lg-2 col-sm-2 border p-3">
                    {" "}
                    <Input
                      style={{ paddingLeft: "0.3rem" }}
                      type="text"
                      name="AssTrauma_diseases"
                      value={data.AssTrauma_diseases}
                      onChange={handleInput}
                    />
                  </div>
                  <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                    <label htmlFor="ROMstatus">
                      {" "}
                      <div>R.O.M status:</div>
                    </label>
                  </div>
                  <div className="col-xl-4 col-lg-2 col-sm-2 border p-3">
                    {" "}
                    <Input
                      style={{ paddingLeft: "0.3rem" }}
                      type="text"
                      name="ROMstatus"
                      value={data.ROMstatus}
                      onChange={handleInput}
                    />
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
                    <Input
                      style={{ paddingLeft: "0.3rem" }}
                      type="text"
                      name="muscle_status"
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
                    <Input
                      style={{ paddingLeft: "0.3rem" }}
                      name="skin_soft_tissues_pain"
                      type="text"
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
                    <Input
                      style={{ paddingLeft: "0.3rem" }}
                      type="text"
                      name="cardio_vascular_status"
                      value={visitDetails.cardio_vascular_status}
                      onChange={handleInput}
                    />
                  </div>
                </div>

                <h5 style={{ marginTop: "1rem" }}>
                  Activity Limitations & Participation Restriction{" "}
                </h5>
                <div className="row" style={{ marginTop: "2rem" }}>
                  <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                    <label htmlFor="general_mobility">
                      {" "}
                      <div>General Mobility (gait):</div>
                    </label>
                  </div>
                  <div className="col-xl-4 col-lg-2 col-sm-2 border p-3">
                    {" "}
                    <Input
                      style={{ paddingLeft: "0.3rem" }}
                      type="text"
                      name="general_mobility"
                      value={data.general_mobility}
                      onChange={handleInput}
                    />
                  </div>
                  <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                    <label htmlFor="transfers">
                      {" "}
                      <div>Transfers:</div>
                    </label>
                  </div>
                  <div className="col-xl-4 col-lg-2 col-sm-2 border p-3">
                    {" "}
                    <Input
                      style={{ paddingLeft: "0.3rem" }}
                      type="text"
                      name="transfers"
                      value={data.transfers}
                      onChange={handleInput}
                    />
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
                    <Input
                      style={{ paddingLeft: "0.3rem" }}
                      type="text"
                      name="balance"
                      value={data.balance}
                      onChange={handleInput}
                    />
                  </div>
                  <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                    <label htmlFor="upper_limb_functions">
                      {" "}
                      <div>Upper Limb Functions:</div>
                    </label>
                  </div>
                  <div className="col-xl-4 col-lg-2 col-sm-2 border p-3">
                    {" "}
                    <Input
                      style={{ paddingLeft: "0.3rem" }}
                      name="upper_limb_functions"
                      type="text"
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
                    <Input
                      style={{ paddingLeft: "0.3rem" }}
                      type="text"
                      name="daily_life_activities"
                      value={data.daily_life_activities}
                      onChange={handleInput}
                    />
                  </div>
                </div>
              </div>
            </div>

          </Accordion.Body>

        </Accordion.Item>

        <Accordion.Item eventKey="1">

          <Accordion.Header>Patient Prescription</Accordion.Header>

          <Accordion.Body>

            <div className="card">
              <div className="card-body">
                <h5>Diagnosis</h5>

                <div className="row" style={{ marginTop: "2rem" }}>
                  <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                    <label htmlFor="DiagnosisICD10code">
                      {" "}
                      <div>Diagnosis-ICD10-code:</div>
                    </label>
                  </div>
                  <div className="col-xl-4 col-lg-2 col-sm-2 border p-3">
                    {" "}
                    <Input
                      style={{ paddingLeft: "0.3rem" }}
                      type="text"
                      name="DiagnosisICD10code"
                      value={data.DiagnosisICD10code}
                    />
                  </div>
                  <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                    <label htmlFor="BriefMedicalHistory">
                      {" "}
                      <div>Brief-Medical-History:</div>
                    </label>
                  </div>
                  <div className="col-xl-4 col-lg-2 col-sm-2 border p-3">
                    {" "}
                    <Input
                      style={{ paddingLeft: "0.3rem" }}
                      type="text"
                      name="BriefMedicalHistory"
                      value={data.BriefMedicalHistory}
                    />
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
                    <Input
                      style={{ paddingLeft: "0.3rem" }}
                      type="text"
                      name="PhysicalTherapyEvaluationTreatment"
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
                    <Input
                      style={{ paddingLeft: "0.3rem" }}
                      type="text"
                      name="Other"

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
                    <Input
                      style={{ paddingLeft: "0.3rem" }}
                      type="text"
                      name="AnticipatedFrequencyDuration"
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
                    <Input
                      style={{ paddingLeft: "0.3rem" }}
                      type="text"
                      name="SpecialInstructions"
                      value={data.SpecialInstructions}
                    />
                  </div>
                </div>

                <div style={{ marginTop: "2rem" }}>
                  <Table bordered>
                    <thead>
                      <tr>
                        <th style={{ width: "20%" }}>Precaution</th>
                        <th>IF yes, Please describe/define </th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr>
                        <td>Weight bearing precaution?</td>
                        <td>
                          <Input
                            style={{ width: "100%", paddingLeft: "0.3rem" }}
                            name="WeightBearingPrecautions"
                            value={data.WeightBearingPrecautions}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>Activity restrictions?</td>
                        <td>
                          <Input
                            style={{ width: "100%", paddingLeft: "0.3rem" }}
                            name="ActivityRestrictions"
                            value={data.ActivityRestrictions}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>Other medical consideration?</td>

                        <td>
                          <Input
                            style={{ width: "100%", paddingLeft: "0.3rem" }}
                            name="OtherMedicalConsiderations"
                          />
                        </td>
                      </tr>
                    </tbody>
                
                  </Table>
                </div>
                <div style={{fontWeight:"600"}}>Doctor voice notes:</div>

                <div style={{ }}>
                      <audio controls>
                        <source
                          src={
                            process.env.REACT_APP_ORIGIN_URL +
                            `${data.audioFile}`
                          }
                          type="audio/ogg"
                        />
                        {console.log("audioFile", data.audioFile)}
                      </audio>
                    </div>

                <div id="AudioRecorder">
             
                </div>
                <div style={{display:"flex",justifyContent:"center"}}>
              
                <h6>
                BODY PAIN DIAGRAM<br></br>
                </h6><br></br>
                </div>
                <div style={{display:"flex",justifyContent:"center"}}>
                <p>Marks where patient felt the described sensations.</p>
                </div>
                <div style={{display:"flex",justifyContent:"center"}}>
              
                <div style={{ width: "4in", height: "5in", marginTop: "2rem" }}>
                  <ImageMarker
                    src={complete_body}
                    markers={data.physicalAssessment.map((item) => ({
                      top: item.x_coordinate,
                      left: item.y_coordinate,
                      id: item.id,
                    }))}
                  />
                </div>
                </div>
              </div>
            </div>

          </Accordion.Body>

        </Accordion.Item>


        <Accordion.Item eventKey="3">

          <Accordion.Header>Invoice</Accordion.Header>

          <Accordion.Body>
            
          <div style={{display:"flex",justifyContent:"center"}}>
            <InvoiceData patient_invoice_data={invoiceData} />
         </div>

          </Accordion.Body>

        </Accordion.Item>

      </Accordion>
      
    </Container>
  );
};

export default VisitDetails;
