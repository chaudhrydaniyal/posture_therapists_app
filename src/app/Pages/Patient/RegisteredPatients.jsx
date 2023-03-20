import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
const RegisteredPatients = () => {
    const [patients, setPatients] = useState([])


    useEffect(() => {
        axios.get('/api/patients/').then((res) => { setPatients(res.data) }).catch(e=>console.log("E",e))

    }, [])

    return (
        <div>
            <section className="content">
                <div className="container-fluid">
                    <div className="block-header">
                        <div className="row">
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <ul className="breadcrumb breadcrumb-style ">
                                    <li className="breadcrumb-item">
                                        <h4 className="page-title">Registered Patient</h4>
                                    </li>
                                    <li className="breadcrumb-item bcrumb-1">
                                        <a href="../../index.html">
                                            <i className="fas fa-home"></i> Home
                                        </a>
                                    </li>
                                    <li className="breadcrumb-item bcrumb-2">
                                        <a href="#">Patient Management</a>
                                    </li>
                                    <li className="breadcrumb-item active">Registered Patient</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="row clearfix">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div className="card">
                            <div className="header">
              
                                <ul className="header-dropdown m-r--5">
                                    <li className="dropdown">
                                        <a href="#" onClick="return false;" className="dropdown-toggle"
                                            data-bs-toggle="dropdown" role="button" aria-haspopup="true"
                                            aria-expanded="false">
                                            <i className="material-icons">more_vert</i>
                                        </a>
                                        <ul className="dropdown-menu float-end">
                                            <li>
                                                <a href="#" onClick="return false;">Action</a>
                                            </li>
                                            <li>
                                                <a href="#" onClick="return false;">Another action</a>
                                            </li>
                                            <li>
                                                <a href="#" onClick="return false;">Something else here</a>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                            <div className="body">
                                <div className="table-responsive">
                                    <table className="table table-bordered table-striped table-hover save-stage dataTable"
                                        style={{ width: "100%" }}>
                                        <thead>
                                            <tr>
                                                <th>Token No</th>
                                                <th>First Name</th>
                                                <th>Last Name</th>
                                                <th>CNIC</th>
                                                <th>Mobile No</th>
                                                <th>Date Registered</th>
                                                <th>Details</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {patients && patients.map((items, id) => (
                                                <tr>
                                                    {console.log("items", items)}
                                                    <td>{id}</td>
                                                    <td>{items.first_name}</td>
                                                    <td>{items.surname}</td>
                                                    <td>{items.cnic}</td>
                                                    <td>{items.mobile_no}</td>
                                                    <td>{items.date_registered}</td>
                                                    <td><Link
                                                        to="/patientdetails"
                                                        state={{ patient: items }}

                                                        style={{ textDecoration: "none" }}
                                                    >
                                                        <button
                                                            style={{ padding: "0.2rem", border: "0.1px solid grey", borderRadius: "5px", fontWeight: "bold", background: "#365CAD", color: "white" }}
                                                            variant="success"
                                                        >
                                                            Details
                                                        </button>
                                                    </Link></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
           </section>
            </div>
    )
}

export default RegisteredPatients