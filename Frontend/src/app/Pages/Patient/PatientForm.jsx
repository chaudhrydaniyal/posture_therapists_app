import React, { useEffect, useState } from "react"
import { useFormik } from "formik"
// import { registrationValidation } from "../../Components/Validation/validationSchema"
import axios from "axios"
import {
    NotificationContainer,
    NotificationManager,
} from "react-notifications";
import { PatternFormat } from "react-number-format";
import './Patient.css'
import { Box, styled, Button, Icon } from '@mui/material';
import { Span } from "app/components/Typography";
import { Breadcrumb, SimpleCard } from 'app/components';
import { patientValidation } from "app/components/Validation/ValidationSchema";


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
    occupation: "",
    designation: "",
    cnic: "",
    physiotherapist_seen_before: "",
    patient_concerns_for_previous_physiotherapist: "",
    patient_satisfactions_for_previous_physiotherapist: "",
    home_phone: null,
    work_phone: null,
    nothappy: "",
    happywith: "",
    todaysession: "",
    stoppingyou: "",
    fixednow: "",
    patientrelationship: "",
    prevmobileno: "",
    contactperson: "",
    doctorname: "",
}


const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: { margin: '16px' },
    '& .breadcrumb': {
        marginBottom: '30px',
        [theme.breakpoints.down('sm')]: { marginBottom: '16px' }
    }
}));


const PatientForm = () => {

    const [diseases, setDiseases] = useState([])

    const { values, errors, handleChange, handleBlur, touched, handleSubmit } = useFormik({

        initialValues: initialValue,
        validationSchema:patientValidation,
        onSubmit: async (values, action) => {
            console.log("error")
            try {
                const patientForm = await axios.post(process.env.REACT_APP_ORIGIN_URL + 'api/patients', {
                    surname: values.surname,
                    first_name: values.first_name,
                    middle_name: values.middle_name,
                    date_of_birth: values.date_of_birth,
                    age: values.age,
                    gender: values.gender,
                    address: values.address,
                    mobile_no: values.mobile_no,
                    email: values.email,
                    occupation: values.occupation,
                    designation: values.designation,
                    home_phone:values.home_phone,
                    work_phone:values.work_phone,
                    cnic: values.cnic,
                    physiotherapist_seen_before: values.physiotherapist_seen_before,
                    patient_concerns_for_previous_physiotherapist: values.patient_satisfactions_for_previous_physiotherapist,
                    patient_satisfactions_for_previous_physiotherapist: values.patient_satisfactions_for_previous_physiotherapist,

                })
                NotificationManager.success("Successfully Registered");
            } catch (error) {
                console.log("error", error)
                NotificationManager.error("Something went wrong")
            }
            action.resetForm()
        }


    })

    function ageCalculator() {  
        var userinput = values.date_of_birth;  
        var dob = new Date(userinput);  
        if(userinput==null || userinput=='') {  
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
          values.age=age
        //display the calculated age  
        return age=    
                 "Age is: " + age + " years. ";  
        }  
    }  
    
    const test = () => {
        console.log("values", values)
    }

    useEffect(()=>{
        axios.get(process.env.REACT_APP_ORIGIN_URL + 'api/diseases').then((res)=>{setDiseases(res.data);console.log("res",res)}
        )
    },[])

    
    return (
        // <>
        <Container>

            {/* <section className="content"> */}

            <Box className="breadcrumb">
        <Breadcrumb routeSegments={[ { name: 'Patient Registration' }]} />
      </Box>
      <NotificationContainer/>
            

            {/* ***********************Patient Information********************* */}

            <div className="card">
                <div className="card-body" style={{ margin: "10px" }}>
                    <h5>PATIENT INFORMATION</h5>

                    <div className="row" style={{ marginTop: "2rem" }}>
                        <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                            <label htmlFor="surname">
                                {" "}
                                <div>Surname:</div>
                            </label>
                        </div>
                        <div className="col-xl-2 col-lg-2 col-sm-2 border p-3" >
                            {" "}
                            <input style={{paddingLeft:'0.3rem'}} className="input_border" type="text" name="surname" placeholder="Surname..." value={values.surname} onChange={handleChange} onBlur={handleBlur} />
                        </div>
                        <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                            <label htmlFor="first_name">
                                {" "}
                                <div>First Name:</div>
                            </label>
                        </div>
                        <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                            {" "}
                            <input style={{paddingLeft:'0.3rem'}} className="input_border" type="text" name="first_name" placeholder="First Name..." value={values.first_name} onChange={handleChange} onBlur={handleBlur} />
                            {errors.first_name && touched.first_name ? (<p style={{ color: "red" }}>{errors.first_name}</p>) : null}
                        </div>
                        <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                            <label htmlFor="middle_name">
                                {" "}
                                <div>Middle Name:</div>
                            </label>
                        </div>
                        <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                            {" "}
                            <input style={{paddingLeft:'0.3rem'}} className="input_border" type="text" name="middle_name" placeholder="Middle Name..." value={values.middle_name} onChange={handleChange} onBlur={handleBlur} />
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
                                id="dob"
                                onChange={(e)=>{handleChange(e);ageCalculator()}} onBlur={handleBlur}
                            />
                            {errors.date_of_birth && touched.date_of_birth ? (<p style={{color:"red"}}>{errors.date_of_birth}</p>):null}
                        </div>
                        <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                            <label htmlFor="age">
                                {" "}
                                <div>Age:</div>
                            </label>
                        </div>
                        <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                            {" "}
                            <input
                            style={{paddingLeft:'0.3rem'}}
                                className="input_border"
                                name="age"
                                type="text"
                                placeholder="age..."
                                onInput={(e) => {
                                    e.target.value = Math.max(0, parseInt(e.target.value))
                                        .toString()
                                        .slice(0, 3);
                                }}
                                // value={values.age}
                                value={values.age}
                                // defaultValue={ageCalculator()}
                                onChange={handleChange} onBlur={handleBlur}
                            />
                            {/* {errors.age && touched.age ? (<p style={{ color: "red" }}>{errors.age}</p>) : null} */}
                        </div>
                        <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                            <label htmlFor="gender">
                                {" "}
                                <div>Gender:</div>
                            </label>
                        </div>
                        <div className="col-xl-2 col-lg-2 col-sm-2 border p-2">
                            {" "}
                            <select name="gender" class="form-control dropdown" onChange={handleChange} value={values.gender}>
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
                            {errors.gender && touched.gender ? (<p style={{ color: "red" }}>{errors.gender}</p>) : null}
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
                            <input style={{paddingLeft:'0.3rem'}} className="input_width" type="text" name="address" placeholder="Address..." value={values.address} onChange={handleChange} />
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
                            <input style={{paddingLeft:'0.3rem'}} className="input_border" type="number" name="home_phone" placeholder="Home Phone..." value={values.home_phone} onChange={handleChange} onBlur={handleBlur} />
                        </div>
                        <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                            <label htmlFor="work_phone">
                                {" "}
                                <div>Work Phone:</div>
                            </label>
                        </div>
                        <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                            <input style={{paddingLeft:'0.3rem'}} className="input_border" type="text" name="work_phone" placeholder="Work Phone..." value={values.work_phone} onChange={handleChange} onBlur={handleBlur} />
                        </div>
                        <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                            <label htmlFor="mobile_no">
                                <div>Mobile No:</div>
                            </label>
                        </div>
                        <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                            <input style={{paddingLeft:'0.3rem'}} className="input_border" type="number" name="mobile_no" placeholder="Mobile No..." value={values.mobile_no} onChange={handleChange} onBlur={handleBlur} onInput={(e) => {
                                e.target.value = Math.max(0, parseInt(e.target.value))
                                    .toString()
                                    .slice(0, 11);
                            }} />
                        {errors.mobile_no && touched.mobile_no ? (<p style={{ color: "red" }}>{errors.mobile_no}</p>) : null}
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                            <label htmlFor="email">
                                <div>Email:</div>
                            </label>
                        </div>
                        <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                            <input style={{paddingLeft:'0.3rem'}} className="input_border" type="email" name="email" placeholder="Email..." value={values.email} onChange={handleChange} onBlur={handleBlur} />
                        </div>
                        <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                            <label htmlFor="occupation">
                                <div>Occupation:</div>
                            </label>
                        </div>
                        <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                            <input style={{paddingLeft:'0.3rem'}} className="input_border" type="text" name="occupation" placeholder="Occupation..." value={values.occupation} onChange={handleChange} onBlur={handleBlur} />
                        </div>
                        <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                            <label htmlFor="designation">
                                <div>Designation:</div>
                            </label>
                        </div>
                        <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                            <input style={{paddingLeft:'0.3rem'}} className="input_border" type="text" name="designation" placeholder="Designation..." value={values.designation} onChange={handleChange} onBlur={handleBlur} />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                            <label htmlFor="doctorname">
                                <div>Your Doctor"s Name:</div>
                            </label>
                        </div>
                        <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                            <input style={{paddingLeft:'0.3rem'}} className="input_border" type="text" name="doctorname" placeholder="Your Doctor Name..." />
                        </div>
                        <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                            <label htmlFor="cnic">
                                <div>CNIC:</div>
                            </label>
                        </div>


                        <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">

                            <PatternFormat
                                className="input_border"
                                style={{
                                    width: "100%",
                                    borderColor: "grey",
                                    paddingLeft:'0.3rem'
                                }}
                                required
                                name="cnic"
                                format="#####-#######-#"
                                allowEmptyFormatting
                                mask="x"
                                defaultValue={values.cnic}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.cnic && touched.cnic ? (<p style={{color:"red"}}>{errors.cnic}</p>):null }
                        </div>

                        <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                            <label htmlFor="past_medical_history">
                                <div>Disease:</div>
                            </label>
                        </div>

                        <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                            {/* <select name="past_medical_history" class="form-control dropdown" >
                                        <option
                                            value=""
                                            selected="selected"
                                            disabled="disabled"
                                        >
                                            Select ...
                                        </option>
                                        <option>Yes</option>
                                        <option>No</option>

                                    </select> */}

                            <select class="form-control dropdown"
                            //   onClick={(e) => {
                            //     setSelectDepartment(e.target.value);
                            //     setUpdate(!update);
                            //   }}

                            >
                                <option value="none" selected disabled hidden>
                                    Select Disease...
                                </option>

                                {diseases &&
                                    diseases.map((d) => (
                                        <option value={`${d.id}`} key={d.id}>
                                            {d.name}
                                        </option>
                                    ))}
                            </select>


                        </div>


                    </div>


                    </div>
                </div>

    {/* ************In Case of Emergency******************* */}
                
    <div className="card" style={{marginTop:'2rem'}}>
                    <div className="card-body" style={{ margin: "10px" }}>
                        <h5>In Case of Emergency</h5>

                        <div className="row" style={{ marginTop: "2rem" }}>

                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                                <label htmlFor="contactperson">
                                    <div>Contact Person:</div>
                                </label>
                            </div>

                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-2">
                                <input style={{paddingLeft:'0.3rem'}} className="input_border" type="text" name="contactperson" value={values.contactperson} onChange={handleChange} onBlur={handleBlur} />
                            </div>
                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                                <label htmlFor="patientrelationship">
                                    <div>Relationship to Patient:</div>
                                </label>
                            </div>

                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-2">
                                <input style={{paddingLeft:'0.3rem'}} className="input_border" type="text" name="patientrelationship" value={values.patientrelationship} onChange={handleChange} onBlur={handleBlur} />
                            </div>
                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                                <label htmlFor="prevmobileno">
                                    <div>Mobile No:</div>
                                </label>
                            </div>

                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-2">
                                <input style={{paddingLeft:'0.3rem'}} className="input_border" type="number" name="prevmobileno" value={values.prevmobileno} onChange={handleChange} onBlur={handleBlur} onInput={(e) => {
                                    e.target.value = Math.max(0, parseInt(e.target.value))
                                        .toString()
                                        .slice(0, 11);
                                }} />
                                {/* {errors.prevmobileno && touched.prevmobileno ? (<p style={{ color: "red" }}>{errors.prevmobileno}</p>) : null} */}
                            </div>
                        </div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "flex-end", margin: "1rem" }}>
                        
                    </div>


                </div>


            {/* *****************Previous Treatment************ */}



            <div className="card" style={{ marginTop: '2rem' }}>
                <div className="card-body" style={{ margin: "10px" }}>
                    <h5>PREVIOUS TREATMENT</h5>


                    <div className="row" style={{ marginTop: "2rem" }}>
                        <div className="col-xl-6 col-lg-2 col-sm-2 border p-3">
                            <label htmlFor="physiotherapist_seen_before">
                                <div>Have you seen another physiotherapist before?</div>
                            </label>
                        </div>
                        <div className="col-xl-6 col-lg-2 col-sm-2 border p-1">
                            <div style={{ marginLeft: "4rem" }}>
                                {/* <input name="physiotherapist_seen_before" type="radio" onChange={handleChange} value={values.physiotherapist_seen_before} />
                                    <span>
                                        Yes
                                    </span>

                                    <span style={{ marginLeft: "3rem" }}>
                                        <input name="physiotherapist_seen_before" type="radio" onChange={handleChange} value={values.physiotherapist_seen_before} />
                                        <span>
                                            No
                                        </span>
                                    </span> */}

                                {" "}
                                <select name="physiotherapist_seen_before" class="form-control dropdown" onChange={handleChange} value={values.physiotherapist_seen_before}>
                                    <option
                                        value=""
                                        selected="selected"
                                        disabled="disabled"
                                    >
                                        Select ...
                                    </option>
                                    <option>Yes</option>
                                    <option>No</option>

                                </select>




                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-6 col-lg-2 col-sm-2 border p-3">
                            <label htmlFor="patient_concerns_for_previous_physiotherapist">
                                <div>If Yes, was there anything you were not happy about?</div>
                            </label>
                        </div>
                        <div className="col-xl-6 col-lg-2 col-sm-2 border p-2">
                            {/* <input type="text" name="patient_concerns_for_previous_physiotherapist " value={values.patient_concerns_for_previous_physiotherapist } onChange={handleChange} onBlur={handleBlur} /> */}
                            <input style={{paddingLeft:'0.3rem'}} className="input_width" type="text" name="patient_concerns_for_previous_physiotherapist" value={values.patient_concerns_for_previous_physiotherapist} onChange={handleChange} onBlur={handleBlur} />
                        </div>



                    </div>

                    <div className="row">
                        <div className="col-xl-6 col-lg-2 col-sm-2 border p-3">
                            <label htmlFor="patient_satisfactions_for_previous_physiotherapist">
                                <div>What aspects were you most happy with?</div>
                            </label>
                        </div>
                        <div className="col-xl-6 col-lg-2 col-sm-2 border p-2">
                            <input style={{paddingLeft:'0.3rem'}} className="input_width" type="text" name="patient_satisfactions_for_previous_physiotherapist" value={values.patient_satisfactions_for_previous_physiotherapist} onChange={handleChange} onBlur={handleBlur} />
                        </div>



                    </div>

                    <div className="row">
                        <div className="col-xl-6 col-lg-2 col-sm-2 border p-3">
                            <label htmlFor="todaysession">
                                <div>What are the main things you would like to achieve by the end of today"s session?</div>
                            </label>
                        </div>

                        <div className="col-xl-6 col-lg-2 col-sm-2 border p-2">
                            <input style={{paddingLeft:'0.3rem'}} className="input_width" type="text" name="todaysession" value={values.todaysession} onChange={handleChange} onBlur={handleBlur} />
                        </div>


                    </div>

                    <div className="row">
                        <div className="col-xl-6 col-lg-2 col-sm-2 border p-3">
                            <label htmlFor="stoppingyou">
                                <div>What is this problem you are here for stopping you from doing?</div>
                            </label>
                        </div>

                        <div className="col-xl-6 col-lg-2 col-sm-2 border p-2">
                            <input style={{paddingLeft:'0.3rem'}} className="input_width" type="text" name="stoppingyou" value={values.stoppingyou} onChange={handleChange} onBlur={handleBlur} />
                        </div>


                    </div>
                    <div className="row">
                        <div className="col-xl-6 col-lg-2 col-sm-2 border p-3">
                            <label htmlFor="fixednow">
                                <div>Why is it important that you get this problem fixed NOW?</div>
                            </label>
                        </div>

                        <div className="col-xl-6 col-lg-2 col-sm-2 border p-2">
                            <input style={{paddingLeft:'0.3rem'}} className="input_width" type="text" name="fixednow" value={values.fixednow} onChange={handleChange} onBlur={handleBlur} />
                        </div>


                    </div>
                    <div style={{ display: "flex", justifyContent: "flex-end", margin: "1rem" }}>
                    <div>

                        {/* <button style={{ padding: "0.5rem", border: "0.5px solid grey", borderRadius: "5px", fontWeight: "bold", background: "#365CAD", color: "white" }} type="button" onClick={handleSubmit}>Submit</button> */}
                        <Button color="primary" variant="contained" type="submit" onClick={handleSubmit}>
                            <Icon>send</Icon>
                            <Span sx={{ pl: 1, textTransform: "capitalize" }}>Submit</Span>
                        </Button>

                        &nbsp;
{/* 
                        <Button color="primary" variant="contained" type="submit" onClick={handleSubmit}>
                            <Span sx={{ pl: 1, textTransform: "capitalize" }}>Schedule appointment</Span>
                        </Button> */}

                    </div>
                </div>

                </div>

            </div>

         

            


    </Container>


    )
}

export default PatientForm