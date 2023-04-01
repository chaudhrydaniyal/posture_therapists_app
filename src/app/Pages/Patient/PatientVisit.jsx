import React from 'react'
import { Box, styled, Button, Icon } from '@mui/material';
import { Span } from "app/components/Typography";
import { Breadcrumb, SimpleCard } from 'app/components';
import { useFormik } from 'formik';
import { Await } from 'react-router-dom';
import axios from 'axios';

const initialValue = {
    personal_conditions: "",
    current_treatment: "",
    remarks: "",
    AssTrauma_diseases: "",
    ROMstatus: "",
    muscle_status: "",
    skin_soft_tissues_pain: "",
    cardio_vascular_status: "",
    general_mobility: "",
    transfers: "",
    balance: "",
    upper_limb_functions: "",
    daily_life_activities: "",
}

const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: { margin: '16px' },
    '& .breadcrumb': {
        marginBottom: '30px',
        [theme.breakpoints.down('sm')]: { marginBottom: '16px' }
    }
}));

const PatientVisit = () => {
    const {values,errors,handleChange,handleBlur,handleSubmit} = useFormik({
        initialValues:initialValue,
        onSubmit:async(values,action)=>{
            try{
                const PatientVisit = await axios.post('/api/patientvisits/',{
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
                    
                })

            } catch(error){
                console.log("error",error)

            }
            action.resetForm()

        }
    })
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
                                <div>Personal Conditions:</div>
                            </label>
                        </div>
                        <div className="col-xl-4 col-lg-2 col-sm-2 border p-3" >
                            {" "}
                            <input className="input_width" type="text" name="personal_conditions" placeholder="personal conditions..." value={values.personal_conditions} onChange={handleChange} onBlur={handleBlur}/>
                        </div>
                        <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                            <label htmlFor="current_treatment">
                                {" "}
                                <div>Current Treatment:</div>
                            </label>
                        </div>
                        <div className="col-xl-4 col-lg-2 col-sm-2 border p-3">
                            {" "}
                            <input className="input_width" type="text" name="current_treatment" placeholder="current treatment..." value={values.current_treatment} onChange={handleChange} onBlur={handleBlur}/>

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
                                value={values.remarks}
                                onChange={handleChange} onBlur={handleBlur}

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
                            <input className="input_width" type="text" name="AssTrauma_diseases" placeholder="Ass.trauma & disease..." value={values.AssTrauma_diseases} onChange={handleChange} onBlur={handleBlur}/>
                        </div>
                        <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                            <label htmlFor="ROMstatus">
                                {" "}
                                <div>R.O.M status:</div>
                            </label>
                        </div>
                        <div className="col-xl-4 col-lg-2 col-sm-2 border p-3">
                            {" "}
                            <input className="input_width" type="text" name="ROMstatus" placeholder="R.O.M status..." value={values.ROMstatus} onChange={handleChange} onBlur={handleBlur}/>

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
                                value={values.muscle_status}
                                onChange={handleChange} onBlur={handleBlur}

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
                                value={values.skin_soft_tissues_pain}
                                onChange={handleChange} onBlur={handleBlur}


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
                                value={values.cardio_vascular_status}
                                onChange={handleChange} onBlur={handleBlur}

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
                            <input className="input_width" type="text" name="general_mobility" placeholder="general mobility..." value={values.general_mobility} onChange={handleChange} onBlur={handleBlur}/>
                        </div>
                        <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                            <label htmlFor="transfers">
                                {" "}
                                <div>Transfers:</div>
                            </label>
                        </div>
                        <div className="col-xl-4 col-lg-2 col-sm-2 border p-3">
                            {" "}
                            <input className="input_width" type="text" name="transfers" placeholder="transfers..." value={values.transfers} onChange={handleChange} onBlur={handleBlur}/>

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
                                value={values.balance}
                                onChange={handleChange} onBlur={handleBlur}

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
                                value={values.upper_limb_functions}
                                onChange={handleChange} onBlur={handleBlur}

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
                                value={values.daily_life_activities}
                                onChange={handleChange} onBlur={handleBlur}

                            />
                        </div>




                    </div>
                    <div style={{display:'flex',justifyContent:'flex-end',marginTop:'1rem'}}>

{/* <button style={{ padding: "0.5rem", border: "0.5px solid grey", borderRadius: "5px", fontWeight: "bold", background: "#365CAD", color: "white" }} type="button" onClick={handleSubmit}>Submit</button> */}
<Button color="primary" variant="contained" type="submit" onClick={handleSubmit}>
<Icon>send</Icon>
<Span sx={{ pl: 1, textTransform: "capitalize" }}>Submit</Span>
</Button>
</div>


                </div>
            </div>
        </Container>
    )
}

export default PatientVisit     