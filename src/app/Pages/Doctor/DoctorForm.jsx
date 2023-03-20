import React from 'react'
import { useFormik } from 'formik';
import axios from 'axios';
import { PatternFormat } from "react-number-format";
import {
    NotificationContainer,
    NotificationManager,
  } from "react-notifications";
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
        <>
            <section className="content">
                <div className="container-fluid">
                    <div className="block-header">
                        <div className="row">
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <ul className="breadcrumb breadcrumb-style ">
                                    <li className="breadcrumb-item">
                                        <h4 className="page-title">Doctor Registration</h4>
                                    </li>
                                    <li className="breadcrumb-item bcrumb-1">
                                        <a href="../../index.html">
                                            <i className="fas fa-home"></i> Home
                                        </a>
                                    </li>
                                    <li className="breadcrumb-item bcrumb-2">
                                        <a href="#">Doctor Management</a>
                                    </li>
                                    <li className="breadcrumb-item active">Doctor Registration</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>


                {/* ****************Doctor Information**************** */}

                <div className="card">
                    <div className="card-body" style={{ margin: "10px" }}>
                        <h4>DOCTOR INFORMATION</h4>

                        <div className="row" style={{ marginTop: "2rem" }}>
                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                                <label htmlFor="surname">
                                    {" "}
                                    <strong>Surname:</strong>
                                </label>
                            </div>
                            <div className="col-xl-2 col-lg-2 col-sm-2 border ">
                                {" "}
                                <input type="text" name="surname" placeholder="Surname..." value={values.surname} onChange={handleChange} onBlur={handleBlur} />
                            </div>
                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                                <label htmlFor="first_name">
                                    {" "}
                                    <strong>First Name:</strong>
                                </label>
                            </div>
                            <div className="col-xl-2 col-lg-2 col-sm-2 border">
                                {" "}
                                <input type="text" name="first_name" placeholder="First Name..." value={values.first_name} onChange={handleChange} onBlur={handleBlur} />

                            </div>
                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                                <label htmlFor="middle_name">
                                    {" "}
                                    <strong>Middle Name:</strong>
                                </label>
                            </div>
                            <div className="col-xl-2 col-lg-2 col-sm-2 border">
                                {" "}
                                <input type="text" name="middle_name" placeholder="Middle Name..." value={values.middle_name} onChange={handleChange} onBlur={handleBlur} />
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
                                    value={values.date_of_birth}
                                    onChange={handleChange} onBlur={handleBlur}
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
                                    value={values.age}
                                    onChange={handleChange} onBlur={handleBlur}
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
                                    <strong>Address:</strong>
                                </label>
                            </div>
                            <div className="col-xl-10 col-lg-2 col-sm-2 border p-1">
                                <input type="text" name="address" placeholder="Address..." value={values.address} onChange={handleChange} />
                            </div>


                        </div>

                        <div className="row">
                            <div className="col-xl-2 col-lg-2 col-sm-2 border  p-3">
                                <label htmlFor="home_phone">
                                    {" "}
                                    <strong>Home Phone:</strong>
                                </label>
                            </div>
                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-1">
                                <input type="text" name="home_phone" placeholder="Home Phone..." value={values.home_phone} onChange={handleChange} onBlur={handleBlur} />
                            </div>
                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                                <label htmlFor="work_phone">
                                    {" "}
                                    <strong>Work Phone:</strong>
                                </label>
                            </div>
                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-1">
                                <input type="text" name="work_phone" placeholder="Work Phone..." value={values.work_phone} onChange={handleChange} onBlur={handleBlur} />
                            </div>
                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                                <label htmlFor="mobile_no">
                                    <strong>Mobile No:</strong>
                                </label>
                            </div>
                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-1">
                                <input type="number" name="mobile_no" placeholder="Mobile No..." value={values.mobile_no} onChange={handleChange} onBlur={handleBlur} onInput={(e) => {
                                    e.target.value = Math.max(0, parseInt(e.target.value))
                                        .toString()
                                        .slice(0, 11);
                                }} />
                            </div>

                        </div>

                        <div className="row">
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
                                    value={values.cnic}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </div>

                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                                <label htmlFor="email">
                                    <strong>Email:</strong>
                                </label>
                            </div>
                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-1">
                                <input type="email" name="email" placeholder="Email..." value={values.email} onChange={handleChange} onBlur={handleBlur} />
                            </div>

                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                                <label htmlFor="practitioner_type">
                                    <strong>Practitioner Type:</strong>
                                </label>
                            </div>
                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-1">
                                <input type="text" name="practitioner_type" placeholder="Practitioner Type..." value={values.practitioner_type} onChange={handleChange} onBlur={handleBlur} />
                            </div>
                        </div>


                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <button style={{ padding: "0.5rem", border: "0.5px solid grey", borderRadius: "5px", fontWeight: "bold", background: "#365CAD", color: "white", marginTop: '2rem' }} onClick={handleSubmit}>Submit</button>
                        </div>


                    </div>
                </div>



            </section>
        </>
    )
}

export default DoctorForm