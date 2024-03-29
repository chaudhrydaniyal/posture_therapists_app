import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
// import Table from 'react-bootstrap/Table';
import {
  Box,
  styled,
  Button,
  Icon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import { Breadcrumb, SimpleCard } from "app/components";
import axios from "axios";
import { Form } from "react-bootstrap";
import { Span } from "app/components/Typography";
import Typography from "@mui/material/Typography";
// import Select from 'react-select';
import Modal from "@mui/material/Modal";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
// import Body from 'app/components/UI Components/Body_image';
import ImageMarker, { Marker } from "react-image-marker";
import complete_body from "./complete_body.jpg";
import PatientVisit from "./PatientVisit";
import Input  from "app/components/UI Components/Input";
// import Button from '@mui/material/Button';

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

const style = {
  position: "absolute",
  top: "30%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const StyledTable = styled(Table)(() => ({
  whiteSpace: "pre",
  "& thead": {
    "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
  },
  "& tbody": {
    "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
  },
}));

const PatientPrescription = ({
  nextStep,
  handleFormData,
  values,
  prevStep,
}) => {
  const navigate = useNavigate();

  const [audioFileBlob, setAudioFileBlob] = useState({});
  const [update, setUpdate] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [getService, setGetService] = useState([]);
  const [open, setOpen] = useState(false);
  const [servicelist, setservicelist] = useState(null);
  const [selectedService, setSelectedService] = useState([]);
  const [discount, setDiscount] = useState(null);
  const [patientVisitData, setPatientVisitData] = useState({
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
    PhysicalTherapyEvaluationTreatment:
      values.PhysicalTherapyEvaluationTreatment,
    Other: values.Other,
    AnticipatedFrequencyDuration: values.AnticipatedFrequencyDuration,
    SpecialInstructions: values.SpecialInstructions,
    patient: values.patient,
  });
  const [prescriptionDetails, setPrescriptionDetails] = useState({
    DiagnosisICD10code: "",
    BriefMedicalHistory: "",
    WeightBearingPrecautions: "",
    ActivityRestrictions: "",
    OtherMedicalConsiderations: "",
    PhysicalTherapyEvaluationTreatment: "",
    Other: "",
    AnticipatedFrequencyDuration: "",
    SpecialInstructions: "",
  });

  const [markers, setMarkers] = useState([]);
  const [addMarkerEnabled, setAddMarkerEnabled] = useState(false);

  const handleAddMarker = (marker) => {
    if (addMarkerEnabled) {
      setMarkers([...markers, marker]);
      console.log("markers", markers);
    }
  };

  const handleResetMarker = () => {
    setMarkers([]);
  };

  const handleToggleAddMarker = () => {
    setAddMarkerEnabled(!addMarkerEnabled);
  };

  // const handleSubmitImage=async()=>{
  //   const imageData={
  //     image:{complete_body},
  //     marker:markers
  //   }
  //   try{

  //     const body_data = await axios.post(process.env.REACT_APP_ORIGIN_URL + '',imageData)
  //   }catch(error){
  //     console.log("image_data_error",error)

  //   }

  // }

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const recorderControls = useAudioRecorder();
  const addAudioElement = (blob) => {
    const url = URL.createObjectURL(blob);
    const audio = document.createElement("audio");
    audio.src = url;
    audio.controls = true;
    setAudioFileBlob(blob);
    console.log("addaudioelement", blob);
    document.getElementById("AudioRecorder").appendChild(audio);
  };

  const handleInput = (e) => {
    setPrescriptionDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitFormData = (e) => {
    e.preventDefault();
  };

  const handleSubmit = async () => {
    let form_data = new FormData();

    for (var key in patientVisitData) {
      form_data.append(key, patientVisitData[key]);
    }
    for (var key in prescriptionDetails) {
      form_data.append(key, prescriptionDetails[key]);
    }
    form_data.append("audioFile", audioFileBlob);
    form_data.append("physical_assessment", JSON.stringify(markers));
    // try {
    //     const PatientVisit = await axios.post(process.env.REACT_APP_ORIGIN_URL + 'api/patientvisits/', form_data, { 'content-type': 'multipart/form-data' })
    // console.log("patient visit",PatientVisit)
    // } catch (error) {
    //     console.log("error", error)
    // }
    try {
      const response = await axios.post(
        process.env.REACT_APP_ORIGIN_URL + "api/patientvisits/",
        form_data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem('user')}`,
          }
          
        }
      );
      console.log("Patient visit", response.data);

      // Access the response data and navigate to the '/invoice' page
      navigate("/invoice", {
        state: {
          patient_visit_id: response.data.id,
          patient_id: response.data.patient,
        },
      });
    } catch (error) {
      console.log("Error", error);
    }
  };

  //    history.push({
  // pathname:  "/invoice",
  // state: {
  //   response: messageFromServer
  // }
  //  });

  // navigate('/invoice',{state:{patient_visit_id:PatientVisit.data.id,patient_id:PatientVisit.data.patient}});

  // }

  const handlecharges = (e) => {
    console.log("object value", e.target.value);
    setservicelist(e.target.value);
    setSelectedService([
      ...selectedService,
      getService.filter((g) => g.id == e.target.value)[0],
    ]);
  };

  const deleteById = (id) => {
    const index = selectedService.findIndex((service) => service.id === id);
    if (index !== -1) {
      const temp = selectedService;
      temp.splice(index, 1);
      setSelectedService(temp);
      console.log("selectedSERV", selectedService, temp);

      setSelectedService([...selectedService]);
    } else {
      console.log("Service with id", id, "not found");
    }
    console.log("index", index);
  };

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_ORIGIN_URL + "api/services/",{
        headers:{
          Authorization: `Bearer ${localStorage.getItem('user')}`,
        }
      })
      .then((res) => {
        setGetService(res.data);
        console.log("services", res);
      });
    console.log("getService", values.patient);
  }, []);

    return (
        <div>

            <Box className="breadcrumb">
                <Breadcrumb routeSegments={[{ name: 'Patient Visit' }]} />
            </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create Invoice
          </Typography>
          {/* <hr></hr> */}
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div style={{ display: "flex" }}>
              <div>
                <div>
                  <label>
                    <strong>Select Services:</strong>
                  </label>
                </div>
                <div style={{ marginTop: "0.5rem" }}>
                  <Form.Select
                    value={servicelist}
                    name="servicecharges"
                    onChange={(e) => handlecharges(e)}
                  >
                    <option value="none" selected disabled hidden>
                      Select Service...
                    </option>
                    {getService &&
                      getService.map((items, i) => (
                        <option
                          value={`${items.id}`}
                          key={items.id}
                        >{`${items.service_name} PKR ${items.charges}`}</option>
                      ))}
                  </Form.Select>
                  {!servicelist ? (
                    <p style={{ color: "red" }}>Please select the service</p>
                  ) : null}
                </div>
              </div>
              <div>
                <div>
                  <label>
                    <strong>Discount %:</strong>
                  </label>
                </div>
                <div style={{ marginTop: "0.5rem", marginLeft: "0.5rem" }}>
                  <Input
                    type="number"
                    style={{
                      height: "2.2rem",
                      width: "auto",
                      border: "0.5px solid gray",
                      borderRadius: "5px",
                      paddingLeft: "0.5rem",
                    }}
                    value={discount}
                    placeholder="%"
                    onChange={(e) => setDiscount(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </Typography>

          <StyledTable>
            <TableHead>
              <TableRow>
                <TableCell align="left">Services</TableCell>
                <TableCell align="center">Charges</TableCell>
                <TableCell align="right">Remove</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedService
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((items, id, index) => (
                  <TableRow key={id}>
                    <TableCell align="left">{items.service_name}</TableCell>
                    <TableCell align="center">{items.charges}</TableCell>
                    <TableCell align="right">
                      <button
                        onClick={() => deleteById(items.id)}
                        style={{
                          background: "none",
                          border: "none",
                          marginTop: "0.5rem",
                        }}
                      >
                        &#x274C;
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </StyledTable>

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={handleClose}>
              {" "}
              <strong>Close</strong>
            </Button>
            <Button
              onClick={() => {
                handleClose();
              }}
            >
              <Link to="/invoice" state={{ selectedService, discount }}>
                {" "}
                <strong>Generate</strong>
              </Link>
            </Button>
          </div>
        </Box>
      </Modal>

      <div className="card">
        <div className="card-body">
          <h4>Diagnosis</h4>
          <div style={{ width: "4in", height: "5in" ,marginLeft:"30%"}}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "1rem",
                marginBottom: "1rem",
              }}
            >
              <h6>
                BODY PAIN DIAGRAM
                <br></br>
              </h6>
            </div>
                <p>Please mark the areas on body where patient feel the described sensations.</p>
            <ImageMarker
              src={complete_body}
              markers={markers}
              onAddMarker={handleAddMarker}
            />
            <div
              style={{
                display: "flex",
                marginTop: "1rem",
                justifyContent: "center",
            
              }}
            >
              <Button
                style={{
                  color: "white",
                  background: "#ED2B2A",
                  border: "none",
                }}
                onClick={handleResetMarker}
              >
                Reset
              </Button>
              <Button
                style={{ marginLeft: "1rem" }}
                variant="contained"
                onClick={handleToggleAddMarker}
              >
                {addMarkerEnabled ? "Disable" : "Enable"}
              </Button>
            </div>
          </div>
          <br></br>
          <Form onSubmit={submitFormData} style={{marginTop:"1rem"}}>
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
                  type="text"
                  name="DiagnosisICD10code"
                  label="Diagnosis-ICD-10-code"
                  value={prescriptionDetails.DiagnosisICD10code}
                  onChange={handleInput}
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
                  type="text"
                  name="BriefMedicalHistory"
                  label="Brief-Medical-History"
                  value={prescriptionDetails.BriefMedicalHistory}
                  onChange={handleInput}
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
                  type="text"
                  name="PhysicalTherapyEvaluationTreatment"
                  label="Physical_Therapy_Evaluation_Treatment"
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
                <Input
                  type="text"
                  name="Other"
                  label="Other"
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
                <Input
                  type="text"
                  name="AnticipatedFrequencyDuration"
                  label="Anticipated-Frequency-Duration"

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
                <Input
                  type="text"
                  name="SpecialInstructions"
                  label="Special_Instructions"
                 
                  value={prescriptionDetails.SpecialInstructions}
                  onChange={handleInput}
                />
              </div>
            </div>
            <div style={{ marginTop: "2rem" }}>
              <Table bordered>
                <thead>
                  <tr>
                    <th style={{ width: "20%" }}>Precaution</th>
                    <th>If yes, Please describe/define </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Weight bearing precaution?</td>
                    <td>
                      <Input
                
                        style={{ width: "100%" }}
                        name="WeightBearingPrecautions"
                        value={prescriptionDetails.WeightBearingPrecautions}
                        onChange={handleInput}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Activity restrictions?</td>
                    <td>
                      <Input
      
                        style={{ width: "100%" }}
                        name="ActivityRestrictions"
                        value={prescriptionDetails.ActivityRestrictions}
                        onChange={handleInput}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Other medical consideration?</td>
                    <td>
                      <Input
                 
                        style={{ width: "100%" }}
                        name="OtherMedicalConsiderations"
                        onChange={handleInput}
                      />
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
            <div id="AudioRecorder" style={{marginTop:"3rem"}}>
              
              <div style={{fontWeight:"600"}}>Doctor voice notes:</div>
              
              <AudioRecorder
                onRecordingComplete={(blob) => addAudioElement(blob)}
                recorderControls={recorderControls}
              />

              <Button
                style={{ color: "red" }}
                onClick={recorderControls.stopRecording}
              >
                Stop recording
              </Button>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "1rem",
              }}
            >
              <Button
                color="primary"
                variant="contained"
                onClick={prevStep}
                style={{ marginRight: "2rem" }}
              >
                Previous
              </Button>

              <Button
                color="primary"
                variant="contained"
                type="submit"
                onClick={() => {
                  handleSubmit();
                }}
              >
                <Icon>send</Icon>
                <Span sx={{ pl: 1, textTransform: "capitalize" }}>Submit</Span>
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default PatientPrescription;
