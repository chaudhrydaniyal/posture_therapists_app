import axios from 'axios'
import React, { useEffect, useState } from 'react'
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
const RegisteredDoctors = () => {
    const [doctors,setDoctors] = useState([])

    useEffect(()=>{
        axios.get('/api/users/').then((res)=>setDoctors(res.data))
    },[])
   
    return (
        <Container>
        <Box className="breadcrumb">
        <Breadcrumb routeSegments={[ { name: 'Available Doctors' }]} />
      </Box>

                
                <div className="row clearfix">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div className="card">
                           
                            <div className="body">
                                <div className="table-responsive">
                                    <table className="table table-bordered table-striped table-hover save-stage dataTable"
                                        style={{ width: "100%",marginTop:"2rem" }}>
                                        <thead>
                                            <tr>
                                                <th>Sr</th>
                                                <th>First Name</th>
                                                <th>Last Name</th>
                                                <th>CNIC</th>
                                                <th>Mobile No</th>
                                                <th>Practitioner Type</th>
                                                <th>Details</th>
                        
                                            </tr>
                                        </thead>
                                        <tbody>
                                     {doctors && doctors.map((items, id) => (
                                         <tr>
                                          
                                             <td>{id}</td>
                                             <td>{items.first_name}</td>
                                             <td>{items.surname}</td>
                                             <td>{items.cnic}</td>
                                             <td>{items.mobile_no}</td>
                                             <td>{items.practitioner_type}</td>
                                             <td><Link
                                                 to="/doctordetails"
                                                 state={{doctors: items}}

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

            </Container>

            
    )
}

export default RegisteredDoctors