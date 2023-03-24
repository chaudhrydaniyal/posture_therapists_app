import React from 'react'
import { useFormik } from 'formik';
import axios from 'axios';
import { PatternFormat } from "react-number-format";
import {
    NotificationContainer,
    NotificationManager,
  } from "react-notifications";
  import { Box, styled,Button,Icon } from '@mui/material';
  import { Span } from "app/components/Typography";
import { Breadcrumb, SimpleCard } from 'app/components';
import '../Patient/Patient.css'
const initialValue = {
    surname: "",
    first_name: "",
    middle_name: "",
    date_of_birth: "",
    age: "",
    gender: "",
    address: "",
    mobile_no: "",
    email: "",
    cnic: "",
    practitioner_type:"",
    home_phone: "",
    work_phone: "",
}

const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: { margin: '16px' },
    '& .breadcrumb': {
      marginBottom: '30px',
      [theme.breakpoints.down('sm')]: { marginBottom: '16px' }
    }
  }));
const DoctorForm = () => {

    const { values, errors, handleBlur, handleChange, handleSubmit, touched } = useFormik({
        initialValues: initialValue,
        onSubmit:async(values,action)=>{
            try{
                const doctorForm = await axios.post('/api/users',{
                    surname: values.surname,
                    first_name: values.first_name,
                    middle_name: values.middle_name,
                    date_of_birth: values.date_of_birth,
                    age: values.age,
                    gender: values.gender,
                    address: values.address,
                    mobile_no: values.mobile_no,
                    email: values.email,
                    practitioner_type: values.practitioner_type,
                    cnic: values.cnic,
                    home_phone:values.home_phone,
                    work_phone:values.work_phone,
                })
                doctorForm && NotificationManager.success("Successfully Registered");

            }catch(error){
                console.log("error",error)

            }
            action.resetForm()

        }

    })
    return (
        <Container>

        {/* <section className="content"> */}

        <Box className="breadcrumb">
    <Breadcrumb routeSegments={[ { name: 'Doctor Registration' }]} />
  </Box>
        



                {/* ****************Doctor Information**************** */}

                <div className="card">
                    <div className="card-body" style={{ margin: "10px" }}>
                        <h4>DOCTOR INFORMATION</h4>

                        <div className="row" style={{ marginTop: "2rem" }}>
                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                                <label htmlFor="surname">
                                    {" "}
                                    <h6>Surname:</h6>
                                </label>
                            </div>
                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3 ">
                                {" "}
                                <input className="input_border" type="text" name="surname" placeholder="Surname..." value={values.surname} onChange={handleChange} onBlur={handleBlur} />
                            </div>
                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                                <label htmlFor="first_name">
                                    {" "}
                                    <h6>First Name:</h6>
                                </label>
                            </div>
                            <div className="col-xl-2 col-lg-2 col-sm-2 border">
                                {" "}
                                <input className="input_border" type="text" name="first_name" placeholder="First Name..." value={values.first_name} onChange={handleChange} onBlur={handleBlur} />

                            </div>
                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                                <label htmlFor="middle_name">
                                    {" "}
                                    <h6>Middle Name:</h6>
                                </label>
                            </div>
                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                                {" "}
                                <input className="input_border" type="text" name="middle_name" placeholder="Middle Name..." value={values.middle_name} onChange={handleChange} onBlur={handleBlur} />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                                <label htmlFor="date_of_birth">
                                    {" "}
                                    <h6>Date of Birth:</h6>
                                </label>
                            </div>
                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                                <input
                                    type="date"
                                    name="date_of_birth"
                                    value={values.date_of_birth}
                                    onChange={handleChange} onBlur={handleBlur}
                                />
                            </div>
                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                                <label htmlFor="age">
                                    {" "}
                                    <h6>Age:</h6>
                                </label>
                            </div>
                            <div className="col-xl-2 col-lg-2 col-sm-2  p-3">
                                {" "}
                                <input
                                className="input_border"
                                    name="age"
                                    type="text"
                                    placeholder="age..."
                                    onInput={(e) => {
                                        e.target.value = Math.max(0, parseInt(e.target.value))
                                            .toString()
                                            .slice(0, 3);
                                    }}
                                    value={values.age}
                                    onChange={handleChange} onBlur={handleBlur}
                                />

                            </div>
                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                                <label htmlFor="gender">
                                    {" "}
                                    <h6>Gender:</h6>
                                </label>
                            </div>
                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-1">
                                {" "}
                                <select name="gender" class="form-control dropdown" onChange={handleChange} value={values.gender} onBlur={handleBlur}>
                                    <option
                                        value=""
                                        selected="selected"
                                        disabled="disabled"
                                    >
                                        Select Gender...
                                    </option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>

                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xl-2 col-lg-2 col-sm-2 border  p-3">
                                <label htmlFor="address">
                                    {" "}
                                    <h6>Address:</h6>
                                </label>
                            </div>
                            <div className="col-xl-10 col-lg-2 col-sm-2 border p-3">
                                <input className="input_width" type="text" name="address" placeholder="Address..." value={values.address} onChange={handleChange} />
                            </div>


                        </div>

                        <div className="row">
                            <div className="col-xl-2 col-lg-2 col-sm-2 border  p-3">
                                <label htmlFor="home_phone">
                                    {" "}
                                    <h6>Home Phone:</h6>
                                </label>
                            </div>
                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                                <input className="input_border" type="text" name="home_phone" placeholder="Home Phone..." value={values.home_phone} onChange={handleChange} onBlur={handleBlur} />
                            </div>
                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                                <label htmlFor="work_phone">
                                    {" "}
                                    <h6>Work Phone:</h6>
                                </label>
                            </div>
                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                                <input className="input_border" type="text" name="work_phone" placeholder="Work Phone..." value={values.work_phone} onChange={handleChange} onBlur={handleBlur} />
                            </div>
                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                                <label htmlFor="mobile_no">
                                    <h6>Mobile No:</h6>
                                </label>
                            </div>
                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                                <input  className="input_border" type="number" name="mobile_no" placeholder="Mobile No..." value={values.mobile_no} onChange={handleChange} onBlur={handleBlur} onInput={(e) => {
                                    e.target.value = Math.max(0, parseInt(e.target.value))
                                        .toString()
                                        .slice(0, 11);
                                }} />
                            </div>

                        </div>

                        <div className="row">
                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                                <label htmlFor="cnic">
                                    <h6>CNIC:</h6>
                                </label>
                            </div>


                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">

                                <PatternFormat
                                    style={{
                                        width: "100%",
                                        borderColor: "grey",
                                    }}
                                    className="input_border" 
                                    required
                                    name="cnic"
                                    format="#####-#######-#"
                                    allowEmptyFormatting
                                    mask="x"
                                    value={values.cnic}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </div>

                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                                <label htmlFor="email">
                                    <h6>Email:</h6>
                                </label>
                            </div>
                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                                <input className="input_border" type="email" name="email" placeholder="Email..." value={values.email} onChange={handleChange} onBlur={handleBlur} />
                            </div>

                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                                <label htmlFor="practitioner_type">
                                    <h6>Practitioner Type:</h6>
                                </label>
                            </div>
                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                                <input className="input_border" type="text" name="practitioner_type" placeholder="Practitioner Type..." value={values.practitioner_type} onChange={handleChange} onBlur={handleBlur} />
                            </div>
                        </div>


                        <div style={{ display: 'flex', justifyContent: 'flex-end',marginTop:'2rem' }}>
                            {/* <button style={{ padding: "0.5rem", border: "0.5px solid grey", borderRadius: "5px", fontWeight: "bold", background: "#365CAD", color: "white", marginTop: '2rem' }} onClick={handleSubmit}>Submit</button> */}
                            <Button color="primary" variant="contained" type="submit" onClick={handleSubmit}>
          <Icon>send</Icon>
          <Span sx={{ pl: 1, textTransform: "capitalize" }} >Submit</Span>
        </Button>
</div>


                    </div>
                </div>
</Container>


    )
}

export default DoctorForm