import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
    Box,
    Icon,
    IconButton,
    styled,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
  } from "@mui/material";
  import { Link } from 'react-router-dom';
// import { Link } from 'react-router-dom'
import { Breadcrumb, SimpleCard } from 'app/components';


// import Sonnet from '../../components/Sonnet';

const StyledTable = styled(Table)(() => ({
    whiteSpace: "pre",
    "& thead": {
      "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
    },
    "& tbody": {
      "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
    },
  }));

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

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(()=>{
    axios.get('/api/users/').then((res)=>setDoctors(res.data))
},[])
    return (
        <Container>
        <Box className="breadcrumb">
        <Breadcrumb routeSegments={[ { name: 'Available Doctors' }]} />
      </Box>
    


                
                {/* <div className="row clearfix">
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
                                                 to="/registeredDoctors/doctordetails"
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
                </div> */}
<div className='card'>
    <div className='card-body'>


 <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell align="left">Sr</TableCell>
            <TableCell align="center">First Name</TableCell>
            <TableCell align="center">Last Name</TableCell>
            <TableCell align="center">CNIC</TableCell>
            <TableCell align="center">Mobile No</TableCell>
            <TableCell align="center">Practitioner Type</TableCell>
            <TableCell align="right">Details</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {doctors
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((items, id) => (
              <TableRow key={id}>
                <TableCell align="left">{id}</TableCell>
                <TableCell align="center">{items.first_name}</TableCell>
                <TableCell align="center">{items.surname}</TableCell>
                <TableCell align="center">{items.cnic}</TableCell>
                <TableCell align="center">{items.mobile_no}</TableCell>
                <TableCell align="center">{items.practitioner_type}</TableCell>
                <TableCell align="right"><Link
                                                 to="/registeredDoctors/doctordetails"
                                                 state={{doctors: items}}

                                                 style={{ textDecoration: "none" }}
                                             >
                                                 <button
                                                     style={{ padding: "0.2rem", border: "0.1px solid grey", borderRadius: "5px", fontWeight: "bold", background: "#365CAD", color: "white" }}
                                                     variant="success"
                                                 >
                                                     Details
                                                 </button>
                                             </Link>
                  
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </StyledTable>


      <TablePagination
        sx={{ px: 2 }}
        page={page}
        component="div"
        rowsPerPage={rowsPerPage}
        count={doctors.length}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[5,10, 25]}
        onRowsPerPageChange={handleChangeRowsPerPage}
        nextIconButtonProps={{ "aria-label": "Next Page" }}
        backIconButtonProps={{ "aria-label": "Previous Page" }}
      />
          </div>
</div>
            </Container>

            
    )
            }

export default RegisteredDoctors