import React, { useState, useEffect } from 'react'
import { Box, styled, Button, Icon } from '@mui/material';
import { Form } from 'react-bootstrap';
import { Span } from "app/components/Typography";
import { Breadcrumb, SimpleCard } from 'app/components';
import { useFormik } from 'formik';
import { Await } from 'react-router-dom';
import validator from 'validator';
import axios from 'axios';
import {

    Select,
    MenuItem

  } from '@mui/material';
import {
    NotificationContainer,
    NotificationManager,
} from "react-notifications";


// const initialValue = {
//     personal_conditions: "",
//     current_treatment: "",
//     remarks: "",
//     AssTrauma_diseases: "",
//     ROMstatus: "",
//     muscle_status: "",
//     skin_soft_tissues_pain: "",
//     cardio_vascular_status: "",
//     general_mobility: "",
//     transfers: "",
//     balance: "",
//     upper_limb_functions: "",
//     daily_life_activities: "",
// }

const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: { margin: '16px' },
    '& .breadcrumb': {
        marginBottom: '30px',
        [theme.breakpoints.down('sm')]: { marginBottom: '16px' }
    }
}));

const PatientVisit = ({ nextStep, handleFormData, values }) => {
    const [error, setError] = useState(false);
    const [audioFileBlob, setAudioFileBlob] = useState({})

    // const { values, errors, handleChange, handleBlur, handleSubmit } = useFormik({
    //     initialValues: initialValue,
    //     onSubmit: async (values, action) => {
    //         try {
    //             const PatientVisit = await axios.post('api/patientvisits/', {
    //                 personal_conditions: values.personal_conditions,
    //                 current_treatment: values.current_treatment,
    //                 remarks: values.remarks,
    //                 AssTrauma_diseases: values.AssTrauma_diseases,
    //                 ROMstatus: values.ROMstatus,
    //                 muscle_status: values.muscle_status,
    //                 skin_soft_tissues_pain: values.skin_soft_tissues_pain,
    //                 cardio_vascular_status: values.cardio_vascular_status,
    //                 general_mobility: values.general_mobility,
    //                 transfers: values.transfers,
    //                 balance: values.balance,
    //                 upper_limb_functions: values.upper_limb_functions,
    //                 daily_life_activities: values.daily_life_activities,

    //             })

    //         } catch (error) {
    //             console.log("error", error)

    //         }
    //         action.resetForm()

    //     }
    // })


    const [patients, setPatients] = useState([])
    const [selectedPatient, setSelectedPatient] = useState(null)



    useEffect(() => {
        axios.get(process.env.REACT_APP_ORIGIN_URL + 'api/patients/').then((res) => { setPatients(res.data) }).catch(e => console.log("E", e))
    }, [])


    const submitFormData = (e) => {
        e.preventDefault();

        // checking if value of first name and last name is empty show error else take to step 2
        console.log("value", values);
        if (
            validator.isEmpty(values.personal_conditions) ||

            values.patient == null
            // validator.isEmpty(values.current_treatment) ||
            // validator.isEmpty(values.remarks) ||
            // validator.isEmpty(values.AssTrauma_diseases) ||
            // validator.isEmpty(values.ROMstatus) ||
            // validator.isEmpty(values.muscle_status) ||
            // validator.isEmpty(values.skin_soft_tissues_pain) ||
            // validator.isEmpty(values.cardio_vascular_status) ||
            // validator.isEmpty(values.general_mobility) ||
            // validator.isEmpty(values.transfers) ||
            // validator.isEmpty(values.balance) ||
            // validator.isEmpty(values.upper_limb_functions) ||
            // validator.isEmpty(values.daily_life_activities)
        ) {
            NotificationManager.error("Please enter the required fields")
            console.log("setError");
        } else {
            nextStep();
            console.log("nextstep");
        }
    }






    return (
        <Container>

            {/* <section className="content"> */}

            <Box className="breadcrumb">
                <Breadcrumb routeSegments={[{ name: 'Patient Visit' }]} />
            </Box>
            <NotificationContainer />
            {/* ************************Patient Visit**************** */}

            <div className='card'>
                <div className='card-body'>

                    <h5>Select the patient:</h5>

                    <Select size="small" style={{width:600, margin:"30px"}} onChange={(e)=>{setSelectedPatient(e.target.value)

                    values.patient = e.target.value
                    
                    
                    console.log("selected patient", selectedPatient)
                    }}>
                        {patients.map((p)=>          <MenuItem value={p.id}>{p.first_name}</MenuItem>
)}
         
        </Select>



                    <h5>Personal Factors</h5>



                    <Form onSubmit={submitFormData}>

                        <div className="row" style={{ marginTop: "2rem" }}>
                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                                <label htmlFor="personal_conditions">
                                    {" "}
                                    <div>Personal Conditions:</div>
                                </label>
                            </div>
                            <div className="col-xl-4 col-lg-2 col-sm-2 border p-3" >
                                {" "}
                                <input className="input_width" type="text" name="personal_conditions" placeholder="personal conditions..." defaultValue={values.personal_conditions} onChange={handleFormData("personal_conditions")} />
                            </div>
                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                                <label htmlFor="current_treatment">
                                    {" "}
                                    <div>Current Treatment:</div>
                                </label>
                            </div>
                            <div className="col-xl-4 col-lg-2 col-sm-2 border p-3">
                                {" "}
                                <input className="input_width" type="text" name="current_treatment" placeholder="current treatment..." defaultValue={values.current_treatment} onChange={handleFormData("current_treatment")} />

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
                                    defaultValue={values.remarks}
                                    onChange={handleFormData("remarks")}


                                />
                            </div>



                        </div>
                        <h5 style={{ marginTop: '1rem' }}>Body Structure And Function Impairments   </h5>
                        <div className="row" style={{ marginTop: "2rem" }}>
                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                                <label htmlFor="AssTrauma_diseases">
                                    {" "}
                                    <div>Ass.trauma & Disease:</div>
                                </label>
                            </div>
                            <div className="col-xl-4 col-lg-2 col-sm-2 border p-3" >
                                {" "}
                                <input className="input_width" type="text" name="AssTrauma_diseases" placeholder="Ass.trauma & disease..." defaultValue={values.AssTrauma_diseases} onChange={handleFormData("AssTrauma_diseases")} />
                            </div>
                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                                <label htmlFor="ROMstatus">
                                    {" "}
                                    <div>R.O.M status:</div>
                                </label>
                            </div>
                            <div className="col-xl-4 col-lg-2 col-sm-2 border p-3">
                                {" "}
                                <input className="input_width" type="text" name="ROMstatus" placeholder="R.O.M status..." defaultValue={values.ROMstatus} onChange={handleFormData("ROMstatus")} />

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
                                    defaultValue={values.muscle_status}
                                    onChange={handleFormData("muscle_status")}


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
                                    defaultValue={values.skin_soft_tissues_pain}
                                    onChange={handleFormData("skin_soft_tissues_pain")}


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
                                    defaultValue={values.cardio_vascular_status}
                                    onChange={handleFormData("cardio_vascular_status")}


                                />
                            </div>




                        </div>

                        <h5 style={{ marginTop: '1rem' }}>Activity Limitations & Participation Restriction  </h5>
                        <div className="row" style={{ marginTop: "2rem" }}>
                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                                <label htmlFor="general_mobility">
                                    {" "}
                                    <div>General Mobility(gait):</div>
                                </label>
                            </div>
                            <div className="col-xl-4 col-lg-2 col-sm-2 border p-3" >
                                {" "}
                                <input className="input_width" type="text" name="general_mobility" placeholder="general mobility..." defaultValue={values.general_mobility} onChange={handleFormData("general_mobility")} />
                            </div>
                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                                <label htmlFor="transfers">
                                    {" "}
                                    <div>Transfers:</div>
                                </label>
                            </div>
                            <div className="col-xl-4 col-lg-2 col-sm-2 border p-3">
                                {" "}
                                <input className="input_width" type="text" name="transfers" placeholder="transfers..." defaultValue={values.transfers} onChange={handleFormData("transfers")} />

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
                                    defaultValue={values.balance}
                                    onChange={handleFormData("balance")}


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
                                    defaultValue={values.upper_limb_functions}
                                    onChange={handleFormData("upper_limb_functions")}

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
                                    defaultValue={values.daily_life_activities}
                                    onChange={handleFormData("daily_life_activities")}


                                />
                            </div>




                        </div>












                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>

                            {/* <button style={{ padding: "0.5rem", border: "0.5px solid grey", borderRadius: "5px", fontWeight: "bold", background: "#365CAD", color: "white" }} type="button" onClick={handleSubmit}>Submit</button> */}
                            <Button color="primary" variant="contained" type="submit">
                                {/* <Icon>send</Icon> */}
                                <Span sx={{ pl: 1, textTransform: "capitalize" }}>Next</Span>
                            </Button>
                        </div>
                    </Form>




                </div>
            </div>
        </Container>
    )
}

export default PatientVisit     