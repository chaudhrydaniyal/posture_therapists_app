import React, { useState } from 'react'
import { Box, styled, Button, Icon, } from '@mui/material';
import { Form } from 'react-bootstrap';
import { Span } from "app/components/Typography";
import { Breadcrumb, SimpleCard } from 'app/components';
import validator from 'validator';
import { PatternFormat } from "react-number-format";
import { NotificationContainer, NotificationManager, } from "react-notifications";




const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: { margin: '16px' },
    '& .breadcrumb': {
        marginBottom: '30px',
        [theme.breakpoints.down('sm')]: { marginBottom: '16px' }
    }
}));


const PatientVisit = ({ nextStep, handleFormData, values }) => {
    const [checkPatient, setCheckPatient] = useState("")

    const submitFormData = (e) => {
        e.preventDefault();


        // checking if value of first name and last name is empty show error else take to step 2
        console.log("value", values);
        if (
            validator.isEmpty(values.personal_conditions)
        ) {
            NotificationManager.error("Something went wrong ");

        } else {
            nextStep();
            console.log("nextstep");
        }
    }

    return (
        <Container>
            <NotificationContainer />
            {/* <section className="content"> */}

            <Box className="breadcrumb">
                <Breadcrumb routeSegments={[{ name: 'Patient Visit' }]} />
            </Box>

            {/* ************************Patient Visit**************** */}

            <div className='card'>
                <div className='card-body'>

                    <div>

                        <div>
                            <label>Patient CNIC:</label>
                        </div>
                        <div style={{ width: '10rem' }}>

                            <PatternFormat
                                className="input_border"
                                style={{
                                    width: "100%",
                                    borderColor: "grey",
                                }}
                                required
                                name="cnic"
                                format="#####-#######-#"
                                allowEmptyFormatting
                                mask="x"
                                value={checkPatient}
                            // onChange={handleChange}
                            // onBlur={handleBlur}
                            />

                            <div style={{ marginTop: '1rem' }}>
                                <Button color="primary" variant="contained" type="submit">

                                    <Span sx={{ textTransform: "capitalize" }}>Search</Span>
                                </Button>
                            </div>

                        </div>

                    </div>
                    <h4 style={{ marginTop: '1rem' }}>Personal Factors</h4>


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
                            <Button color="primary" variant="contained" type="submit">
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