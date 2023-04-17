import React from 'react'
import { useFormik } from 'formik';
import axios from 'axios';
import { PatternFormat } from "react-number-format";
import {
    NotificationContainer,
    NotificationManager,
} from "react-notifications";
import { Box, styled, Button, Icon } from '@mui/material';
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
    practitioner_type: "",
    home_phone: "",
    work_phone: "",
    remarks: ""
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
        onSubmit: async (values, action) => {
            try {
                const doctorForm = await axios.post(process.env.REACT_APP_ORIGIN_URL + 'api/users', {
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
                    home_phone: values.home_phone,
                    work_phone: values.work_phone,
                    remarks: values.remarks

                })
                NotificationManager.success("Successfully Registered");

            } catch (error) {
                NotificationManager.error("Something went wrong")
                console.log("error", error)

            }
            action.resetForm()

        }

    })
    function ageCalculator() {
        var userinput = values.date_of_birth;
        var dob = new Date(userinput);
        if (userinput == null || userinput == '') {
            //   document.getElementById("message").innerHTML = "**Choose a date please!";    
            return false;
        } else {

            //calculate month difference from current date in time  
            var month_diff = Date.now() - dob.getTime();

            //convert the calculated difference in date format  
            var age_dt = new Date(month_diff);

            //extract year from date      
            var year = age_dt.getUTCFullYear();

            //now calculate the age of the user  
            var age = Math.abs(year - 1970);
            values.age = age
            //display the calculated age  
            return age =
                "Age is: " + age + " years. ";
        }
    }
    return (
        <Container>

            {/* <section className="content"> */}

            <Box className="breadcrumb">
                <Breadcrumb routeSegments={[{ name: 'Doctor Registration' }]} />
            </Box>
            <NotificationContainer />



            {/* ****************Doctor Information**************** */}

            <div className="card">
                <div className="card-body" style={{ margin: "10px" }}>
                    <h4>DOCTOR INFORMATION</h4>

                    <div className="row" style={{ marginTop: "2rem" }}>
                        <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                            <label htmlFor="surname">
                                {" "}
                                <div>Surname:</div>
                            </label>
                        </div>
                        <div className="col-xl-2 col-lg-2 col-sm-2 border p-3 ">
                            {" "}
                            <input className="input_border" type="text" name="surname" placeholder="Surname..." value={values.surname} onChange={handleChange} onBlur={handleBlur} />
                        </div>
                        <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                            <label htmlFor="first_name">
                                {" "}
                                <div>First Name:</div>
                            </label>
                        </div>
                        <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                            {" "}
                            <input className="input_border" type="text" name="first_name" placeholder="First Name..." value={values.first_name} onChange={handleChange} onBlur={handleBlur} />

                        </div>
                        <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                            <label htmlFor="middle_name">
                                {" "}
                                <div>Middle Name:</div>
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
                                <div>Date of Birth:</div>
                            </label>
                        </div>
                        <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                            <input
                                type="date"
                                name="date_of_birth"
                                value={values.date_of_birth}
                                onChange={(e) => { handleChange(e); ageCalculator() }} onBlur={handleBlur}
                            />
                        </div>
                        <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                            <label htmlFor="age">
                                {" "}
                                <div>Age:</div>
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
                                <div>Gender:</div>
                            </label>
                        </div>
                        <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
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
                                <div>Address:</div>
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
                                <div>Home Phone:</div>
                            </label>
                        </div>
                        <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                            <input className="input_border" type="text" name="home_phone" placeholder="Home Phone..." value={values.home_phone} onChange={handleChange} onBlur={handleBlur} />
                        </div>
                        <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                            <label htmlFor="work_phone">
                                {" "}
                                <div>Work Phone:</div>
                            </label>
                        </div>
                        <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                            <input className="input_border" type="text" name="work_phone" placeholder="Work Phone..." value={values.work_phone} onChange={handleChange} onBlur={handleBlur} />
                        </div>
                        <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                            <label htmlFor="mobile_no">
                                <div>Mobile No:</div>
                            </label>
                        </div>
                        <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                            <input className="input_border" type="number" name="mobile_no" placeholder="Mobile No..." value={values.mobile_no} onChange={handleChange} onBlur={handleBlur} onInput={(e) => {
                                e.target.value = Math.max(0, parseInt(e.target.value))
                                    .toString()
                                    .slice(0, 11);
                            }} />
                        </div>

                    </div>

                    <div className="row">
                        <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                            <label htmlFor="cnic">
                                <div>CNIC:</div>
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
                                <div>Email:</div>
                            </label>
                        </div>
                        <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                            <input className="input_border" type="email" name="email" placeholder="Email..." value={values.email} onChange={handleChange} onBlur={handleBlur} />
                        </div>

                        <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                            <label htmlFor="practitioner_type">
                                <div>Practitioner Type:</div>
                            </label>
                        </div>
                        <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                            <input className="input_border" type="text" name="practitioner_type" placeholder="Practitioner Type..." value={values.practitioner_type} onChange={handleChange} onBlur={handleBlur} />
                        </div>

                    </div>
                    <div className="row">
                        <div className="col-xl-2 col-lg-2 col-sm-2 border  p-3">
                            <label htmlFor="remarks">
                                {" "}
                                <div>Remarks:</div>
                            </label>
                        </div>
                        <div className="col-xl-10 col-lg-2 col-sm-2 border p-3">
                            <input className="input_width" type="text" name="remarks" placeholder="remarks..." value={values.remarks} onChange={handleChange} />
                        </div>


                    </div>


                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem' }}>
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