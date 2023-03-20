import React, { useState,useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { PatternFormat } from "react-number-format";
import {
    NotificationContainer,
    NotificationManager,
  } from "react-notifications";
import axios from 'axios';
const PatientDetails = () => {
    var patient = useLocation();
    console.log("itemofpatientdata", patient);
    var patientData = patient.state.patient;

    const [disableFields, setDisableFields] = useState(true);
    const [getDiseases,setGetDiseases] = useState([])
    const [data, setData] = useState({
        id: patientData.id,
        first_name: patientData.first_name,
        surname: patientData.surname,
        middle_name: patientData.middle_name,
        date_of_birth: patientData.date_of_birth,
        age: patientData.age,
        gender: patientData.gender,
        address: patientData.address,
        mobile_no: patientData.mobile_no,
        email: patientData.email,
        occupation: patientData.occupation,
        cnic: patientData.cnic,
        physiotherapist_seen_before: patientData.physiotherapist_seen_before,
        patient_concerns_for_previous_physiotherapist: patientData.patient_concerns_for_previous_physiotherapist,
        patient_satisfactions_for_previous_physiotherapist: patientData.patient_satisfactions_for_previous_physiotherapist,


    });


    const handleInput = (e) => {
        let name, value;

        console.log(e);
        name = e.target.name;
        value = e.target.value;
        setData({ ...data, [name]: value });
    };
      const updatePatient = async () => {
        try {
          const updateUser = await axios
            .put(`/api/patients/${data.id}`, {
                id: data.id,
                first_name: data.first_name,
                surname: data.surname,
                middle_name: data.middle_name,
                date_of_birth: data.date_of_birth,
                age: data.age,
                gender: data.gender,
                address: data.address,
                mobile_no: data.mobile_no,
                email: data.email,
                occupation: data.occupation,
                cnic: data.cnic,
                physiotherapist_seen_before: data.physiotherapist_seen_before,
                patient_concerns_for_previous_physiotherapist:data.patient_concerns_for_previous_physiotherapist,
                patient_satisfactions_for_previous_physiotherapist:data.patient_satisfactions_for_previous_physiotherapist
            })
           
            updateUser && NotificationManager.success("Successfully Updated");

        } catch (error) {

        }
      };
      useEffect(()=>{
        axios.get('api/diseases').then((res)=>setGetDiseases(res.data))

      },[])

    return (
        <>
            <section className="content">
                <div className="container-fluid">
                    <div className="block-header">
                        <div className="row">
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <ul className="breadcrumb breadcrumb-style ">
                                    <li className="breadcrumb-item">
                                        <h4 className="page-title">Patient Details</h4>
                                    </li>
                                    <li className="breadcrumb-item bcrumb-1">
                                        <a href="../../index.html">
                                            <i className="fas fa-home"></i> Home
                                        </a>
                                    </li>
                                    <li className="breadcrumb-item bcrumb-2">
                                        <a href="#">Patient Management</a>
                                    </li>
                                    <li className="breadcrumb-item bcrumb-3"><a href="#">Registered Patient</a></li>
                                    <li className="breadcrumb-item active">Patient Details</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>

                {/* ************Patient Information*********** */}

                <div className="card">
                    <div className="card-body" style={{ margin: "10px" }}>
                        <h4>PATIENT INFORMATION</h4>
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>

                            <button style={{ padding: "0.5rem", border: "0.5px solid grey", borderRadius: "5px", fontWeight: "bold", background: "#365CAD", color: "white" }} onClick={() => {
                                setDisableFields(false);
                            }}>Edit</button>
                            <button style={{ marginLeft: '2rem', padding: "0.5rem", border: "0.5px solid grey", borderRadius: "5px", fontWeight: "bold", background: "#365CAD", color: "white" }} onClick={() => {
                                setDisableFields(true); updatePatient()
                            }} >Save</button>


                        </div>
                        <div className="row" style={{ marginTop: "2rem" }}>
                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                                <label htmlFor="surname">
                                    {" "}
                                    <strong>Surname:</strong>
                                </label>
                            </div>
                            <div className="col-xl-2 col-lg-2 col-sm-2 border ">
                                {" "}
                                <input type="text" name="surname" placeholder="Surname..." value={data.surname} onChange={handleInput} disabled={disableFields} />
                            </div>
                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                                <label htmlFor="first_name">
                                    {" "}
                                    <strong>First Name:</strong>
                                </label>
                            </div>
                            <div className="col-xl-2 col-lg-2 col-sm-2 border">
                                {" "}
                                <input type="text" name="first_name" placeholder="First Name..." value={data.first_name} onChange={handleInput} disabled={disableFields} />

                            </div>
                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                                <label htmlFor="middle_name">
                                    {" "}
                                    <strong>Middle Name:</strong>
                                </label>
                            </div>
                            <div className="col-xl-2 col-lg-2 col-sm-2 border">
                                {" "}
                                <input type="text" name="middle_name" placeholder="Middle Name..." value={data.middle_name} onChange={handleInput} disabled={disableFields} />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                                <label htmlFor="date_of_birth">
                                    {" "}
                                    <strong>Date of Birth:</strong>
                                </label>
                            </div>
                            <div className="col-xl-2 col-lg-2 col-sm-2 border">
                                <input
                                    type="date"
                                    name="date_of_birth"
                                    value={data.date_of_birth}
                                    onChange={handleInput}
                                    disabled={disableFields}
                                />
                            </div>
                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                                <label htmlFor="age">
                                    {" "}
                                    <strong>Age:</strong>
                                </label>
                            </div>
                            <div className="col-xl-2 col-lg-2 col-sm-2 border">
                                {" "}
                                <input
                                    name="age"
                                    type="text"
                                    placeholder="age..."
                                    onInput={(e) => {
                                        e.target.value = Math.max(0, parseInt(e.target.value))
                                            .toString()
                                            .slice(0, 3);
                                    }}
                                    value={data.age}
                                    onChange={handleInput}
                                    disabled={disableFields}
                                />

                            </div>
                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                                <label htmlFor="gender">
                                    {" "}
                                    <strong>Gender:</strong>
                                </label>
                            </div>
                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-1">
                                {" "}
                                <select name="gender" class="form-control dropdown" value={data.gender} onChange={handleInput} disabled={disableFields}>
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
                                    <strong>Address:</strong>
                                </label>
                            </div>
                            <div className="col-xl-10 col-lg-2 col-sm-2 border p-1">
                                <input type="text" name="address" placeholder="Address..." value={data.address} onChange={handleInput} disabled={disableFields} />
                            </div>


                        </div>

                        <div className="row">
                            <div className="col-xl-2 col-lg-2 col-sm-2 border  p-3">
                                <label htmlFor="homephone">
                                    {" "}
                                    <strong>Home Phone:</strong>
                                </label>
                            </div>
                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-1">
                                <input type="text" name="homephone" placeholder="Home Phone..." onChange={handleInput} disabled={disableFields} />
                            </div>
                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                                <label htmlFor="workphone">
                                    {" "}
                                    <strong>Work Phone:</strong>
                                </label>
                            </div>
                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-1">
                                <input type="text" name="workphone" placeholder="Work Phone..." onChange={handleInput} disabled={disableFields} />
                            </div>
                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                                <label htmlFor="mobile_no">
                                    <strong>Mobile No:</strong>
                                </label>
                            </div>
                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-1">
                                <input type="number" name="mobile_no" placeholder="Mobile No..." onInput={(e) => {
                                    e.target.value = Math.max(0, parseInt(e.target.value))
                                        .toString()
                                        .slice(0, 11);
                                }} value={data.mobile_no} onChange={handleInput} disabled={disableFields} />
                            </div>

                        </div>

                        <div className="row">
                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                                <label htmlFor="email">
                                    <strong>Email:</strong>
                                </label>
                            </div>
                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-1">
                                <input type="email" name="email" placeholder="Email..." value={data.email} onChange={handleInput} disabled={disableFields} />
                            </div>
                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                                <label htmlFor="occupation">
                                    <strong>Occupation:</strong>
                                </label>
                            </div>
                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-1">
                                <input type="text" name="occupation" placeholder="Occupation..." value={data.occupation} onChange={handleInput} disabled={disableFields} />
                            </div>
                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                                <label htmlFor="designation">
                                    <strong>Designation:</strong>
                                </label>
                            </div>
                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-1">
                                <input type="text" name="designation" placeholder="Designation..." onChange={handleInput} disabled={disableFields} />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                                <label htmlFor="doctorname">
                                    <strong>Your Doctor"s Name:</strong>
                                </label>
                            </div>
                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-1">
                                <input type="text" name="doctorname" placeholder="Your Doctor Name..." onChange={handleInput} disabled={disableFields} />
                            </div>
                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                                <label htmlFor="cnic">
                                    <strong>CNIC:</strong>
                                </label>
                            </div>


                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-1">

                                <PatternFormat
                                    style={{
                                        width: "100%",
                                        borderColor: "grey",
                                    }}
                                    required
                                    name="cnic"
                                    format="#####-#######-#"
                                    allowEmptyFormatting
                                    mask="x"
                                    value={data.cnic}
                                    onChange={handleInput}
                                    disabled={disableFields}
                                />
                            </div>
                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                                <label htmlFor="past_medical_history">
                                    <strong>Disease:</strong>
                                </label>
                            </div>

                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                           

<select class="form-control dropdown"
                              disabled={disableFields}
                                >
                                  <option value="none" selected disabled hidden>
                                    Select Disease... 
                                  </option>

                                  {getDiseases &&
                                    getDiseases.map((d) => (
                                      <option value={`${d.id}`} key={d.id}>
                                        {d.name}
                                      </option>
                                    ))}
                                </select>

                                 
                            </div>


                        </div>


                    </div>
                </div>

                {/* ***********Previous Treatment*************** */}
                <div className="card">
                    <div className="card-body" style={{ margin: "10px" }}>
                        <h4>PREVIOUS TREATMENT</h4>


                        <div className="row" style={{ marginTop: "2rem" }}>
                            <div className="col-xl-6 col-lg-2 col-sm-2 border p-3">
                                <label htmlFor="physiotherapist_seen_before">
                                    <strong>Have you seen another physiotherapist before?</strong>
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
                                    <select name="physiotherapist_seen_before" class="form-control dropdown" value={data.physiotherapist_seen_before} onChange={handleInput} disabled={disableFields}>
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
                                    <strong>If Yes, was there anything yu were not happy about?</strong>
                                </label>
                            </div>
                            <div className="col-xl-6 col-lg-2 col-sm-2 border p-1">
                                {/* <input type="text" name="patient_concerns_for_previous_physiotherapist " value={values.patient_concerns_for_previous_physiotherapist } onChange={handleChange} onBlur={handleBlur} /> */}
                                <input type="text" name="patient_concerns_for_previous_physiotherapist" value={data.patient_concerns_for_previous_physiotherapist} onChange={handleInput} disabled={disableFields} />
                            </div>



                        </div>

                        <div className="row">
                            <div className="col-xl-6 col-lg-2 col-sm-2 border p-3">
                                <label htmlFor="patient_satisfactions_for_previous_physiotherapist">
                                    <strong>What aspects were you most happy with?</strong>
                                </label>
                            </div>
                            <div className="col-xl-6 col-lg-2 col-sm-2 border p-1">
                                <input type="text" name="patient_satisfactions_for_previous_physiotherapist" value={data.patient_satisfactions_for_previous_physiotherapist} onChange={handleInput} disabled={disableFields} />
                            </div>



                        </div>

                        <div className="row">
                            <div className="col-xl-6 col-lg-2 col-sm-2 border p-3">
                                <label htmlFor="todaysession">
                                    <strong>What are the main things you would like to achieve by the end of today"s session?</strong>
                                </label>
                            </div>

                            <div className="col-xl-6 col-lg-2 col-sm-2 border p-1">
                                <input type="text" name="todaysession" onChange={handleInput} disabled={disableFields} />
                            </div>


                        </div>

                        <div className="row">
                            <div className="col-xl-6 col-lg-2 col-sm-2 border p-3">
                                <label htmlFor="stoppingyou">
                                    <strong>What is this problem you are here for stopping you from doing?</strong>
                                </label>
                            </div>

                            <div className="col-xl-6 col-lg-2 col-sm-2 border p-1">
                                <input type="text" name="stoppingyou" onChange={handleInput} disabled={disableFields} />
                            </div>


                        </div>
                        <div className="row">
                            <div className="col-xl-6 col-lg-2 col-sm-2 border p-3">
                                <label htmlFor="fixednow">
                                    <strong>Why is it important that you get this problem fixed NOW?</strong>
                                </label>
                            </div>

                            <div className="col-xl-6 col-lg-2 col-sm-2 border p-1">
                                <input type="text" name="fixednow" onChange={handleInput} disabled={disableFields} />
                            </div>


                        </div>


                    </div>

                </div>


                {/* ************In Case of Emergency*********** */}
                
                <div className="card">
                    <div className="card-body" style={{ margin: "10px" }}>
                        <h4>In Case of Emergency</h4>

                        <div className="row" style={{ marginTop: "2rem" }}>

                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                                <label htmlFor="contactperson">
                                    <strong>Contact Person:</strong>
                                </label>
                            </div>

                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-1">
                                <input type="text" name="contactperson" onChange={handleInput} disabled={disableFields} />
                            </div>
                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                                <label htmlFor="patientrelationship">
                                    <strong>Relationship to Patient:</strong>
                                </label>
                            </div>

                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-1">
                                <input type="text" name="patientrelationship" onChange={handleInput} disabled={disableFields} />
                            </div>
                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                                <label htmlFor="prevmobileno">
                                    <strong>Mobile No:</strong>
                                </label>
                            </div>

                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-1">
                                <input type="number" name="prevmobileno" onInput={(e) => {
                                    e.target.value = Math.max(0, parseInt(e.target.value))
                                        .toString()
                                        .slice(0, 11);
                                }} onChange={handleInput} disabled={disableFields} />

                            </div>
                        </div>
                    </div>
                  


                </div>


            </section>
        </>
    )
}

export default PatientDetails