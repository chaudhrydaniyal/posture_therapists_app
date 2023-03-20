import React,{useState} from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
const style = {
    position: 'absolute',
    top: '30%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  

const AddBranches = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  return (
   <>
   <>
        <section class="content">
        <div class="container-fluid">
          <div class="block-header">
            <div class="row">
              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <ul class="breadcrumb breadcrumb-style ">
                  <li class="breadcrumb-item">
                    <h4 class="page-title">Add Branches</h4>
                  </li>
                  <li class="breadcrumb-item bcrumb-1">
                    <a href="../../index.html">
                      <i class="fas fa-home"></i> Home
                    </a>
                  </li>
                  <li class="breadcrumb-item bcrumb-2">
                    <a href="#" >
                      Setup
                    </a>
                  </li>
                  <li class="breadcrumb-item active">Add Branches</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row clearfix">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div className="card">
                            <div className="header">




                                {/* ***************Add Branch Modal*********************** */}
                            <div style={{display:'flex',justifyContent:'center'}}>
      <Button onClick={handleOpen} style={{fontWeight:'bolder',fontSize:'15px'}}>Add Clinic Branches</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add New Branch
          </Typography>
          {/* <hr></hr> */}
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <input></input>
          </Typography>
          <div style={{display:'flex',justifyContent:'flex-end'}}>

          <Button onClick={handleClose}> <strong>Close</strong></Button>
          <Button onClick={handleOpen}> <strong>Add</strong></Button>
          </div>
        </Box>
      </Modal>
    </div>

    {/* *********Add Branch Modal******************* */}
    
                                {/* <h2> */}
                                    {/* <strong>Table</strong> With State Save</h2> */}
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
                                <div className="table-responsive" style={{display:'flex',justifyContent:'center'}}>
                                    <table className="table table-bordered table-striped table-hover save-stage dataTable"
                                        style={{ width: "50%"}}>
                                        <thead>
                                            <tr>
                                                <th>Sr</th>
                                                <th>Clinic Branches</th>
                                                <th>Delete</th>
                                                {/* <th>CNIC</th>
                                                <th>Mobile No</th>
                                                <th>Practitioner Type</th>
                                                <th>Details</th> */}
                        
                                            </tr>
                                        </thead>
                                        {/* <tbody>
                                     {doctors && doctors.map((items, id) => (
                                         <tr>
                                             {console.log("items", items)}
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



                                 </tbody> */}
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


          </div>
          </section>
          
    </>
   </>
  )
}

export default AddBranches