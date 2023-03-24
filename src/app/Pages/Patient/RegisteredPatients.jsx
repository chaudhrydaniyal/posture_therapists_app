import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Box, styled } from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';

const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: { margin: '16px' },
    '& .breadcrumb': {
      marginBottom: '30px',
      [theme.breakpoints.down('sm')]: { marginBottom: '16px' }
    }
  }));
const RegisteredPatients = () => {
    const [patients, setPatients] = useState([])


    useEffect(() => {
        axios.get('/api/patients/').then((res) => { setPatients(res.data) }).catch(e=>console.log("E",e))

    }, [])

    return (
        <Container>
        <Box className="breadcrumb">
        <Breadcrumb routeSegments={[ { name: 'Registered Patients' }]} />
      </Box>
<div className='card'>
                            <div className="body">
                                <div className="table-responsive">
                                    <table className="table table-bordered table-striped table-hover save-stage dataTable"
                                        style={{ width: "100%",margin:'2rem',marginLeft:'0.5rem',marginRight:'0.5rem'}}>
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
                        
</Container>
                    
    )
}

export default RegisteredPatients