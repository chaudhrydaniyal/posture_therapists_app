import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from 'axios';
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

const AddDisease = () => {
  const [open, setOpen] = React.useState(false);
  const [openEdit, setOpenEdit] = useState(false)
  const [disease, setDisease] = useState([])
  const [getDisease, setGetDisease] = useState([])
  const [editDisease, setEditDisease] = useState({
    id: null,
    name: ""

  })

  const [update, setUpdate] = useState("")
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenEdit = () => setOpenEdit(true)
  const handleCloseEdit = () => setOpenEdit(false)

  const apiDisease = () => {
    return (
      axios.post('api/diseases', {
        name: disease
      })

    )
  }
  const handleInput = (e) => {
    let name, value;

    console.log(e);
    name = e.target.name;
    value = e.target.value;
    setEditDisease({ ...editDisease, [name]: value });
  }


  useEffect(() => {
    axios.get('api/diseases/').then((res) => { setGetDisease(res.data); console.log("res", res) })

  }, [update])
  return (
    <>
      <section class="content">
        <div class="container-fluid">
          <div class="block-header">
            <div class="row">
              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <ul class="breadcrumb breadcrumb-style ">
                  <li class="breadcrumb-item">
                    <h4 class="page-title">Add Diseases</h4>
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
                  <li class="breadcrumb-item active">Add Diseases</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row clearfix">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="card">
                <div className="header">

                  {/* ***************Add Disease Modal************* */}

                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button onClick={handleOpen} style={{ fontWeight: 'bolder', fontSize: '15px' }}>Add Diseases</Button>
                    <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                          Add New Disease
                        </Typography>
                        {/* <hr></hr> */}
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                          <input placeholder='Enter Disease' value={disease} onChange={(e) => setDisease(e.target.value)} />
                        </Typography>
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>

                          <Button onClick={handleClose}> <strong>Close</strong></Button>
                          <Button onClick={() => { apiDisease(); handleClose(); setDisease(""); setUpdate(!update) }}> <strong>Add</strong></Button>
                        </div>
                      </Box>
                    </Modal>
                  </div>


                  {/******************Edit Disease Model*****************/}

                  <Modal
                    open={openEdit}
                    onClose={handleCloseEdit}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      <Typography id="modal-modal-title" variant="h6" component="h2">
                        Edit New Disease
                      </Typography>
                      {/* <hr></hr> */}
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <input placeholder='Enter Disease' value={editDisease.name} onChange={(e) => setEditDisease({ ...editDisease, name: e.target.value })} />
                      </Typography>
                      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>

                        <Button onClick={handleCloseEdit}> <strong>Close</strong></Button>
                        <Button onClick={() => {
                          axios.put(`api/diseases/${editDisease.id}`, {
                            // id:editDisease.id,
                            name: editDisease.name
                          })
                          ; handleCloseEdit(); setUpdate(!update)
                        }}> <strong>Add</strong></Button>
                      </div>
                    </Box>
                  </Modal>
                  {console.log("disease", editDisease)}

                  {/* *************************Add Disease Table******************************* */}

                  {/* <h2> */}
                  {/* <strong>Table</strong> With State Save</h2> */}
                  <ul className="header-dropdown m-r--5">
                    <li className="dropdown">
                      {/* <a href="#" onClick="return false;" className="dropdown-toggle"
                                            data-bs-toggle="dropdown" role="button" aria-haspopup="true"
                                            aria-expanded="false">
                                            <i className="material-icons">more_vert</i>
                                        </a> */}
                      {/* <ul className="dropdown-menu float-end">
                                            <li>
                                                <a href="#" onClick="return false;">Action</a>
                                            </li>
                                            <li>
                                                <a href="#" onClick="return false;">Another action</a>
                                            </li>
                                            <li>
                                                <a href="#" onClick="return false;">Something else here</a>
                                            </li>
                                        </ul> */}
                    </li>
                  </ul>
                </div>
                <div className="body">
                  <div className="table-responsive" style={{ display: 'flex', justifyContent: 'center' }}>
                    <table className="table table-bordered table-striped table-hover save-stage dataTable"
                      style={{ width: "50%" }}>
                      <thead>
                        <tr>
                          <th>Sr</th>
                          <th>Diseases</th>
                          <th>Delete</th>
                          <th>Edit</th>
                          {/* <th>CNIC</th>
                                                <th>Mobile No</th>
                                                <th>Practitioner Type</th>
                                                <th>Details</th> */}

                        </tr>
                      </thead>
                      <tbody>
                        {getDisease && getDisease.map((items, id) => (
                          <tr>
                            {console.log("items", items)}
                            <td>{id}</td>
                            <td>{items.name}</td>
                            <td><button onClick={async () => {
                              await axios.delete(`api/diseases/${items.id}`); setUpdate(!update)
                            }} style={{ backgroundColor: "#365CAD", color: "white", padding: "2px", borderRadius: '4px', }}
                            //   title="Delete"
                            >Delete</button></td>
                            <td><button style={{ padding: "2px", borderRadius: '4px' }} onClick={() => { setEditDisease({ id: items.id, name: items.name }); handleOpenEdit() }}>Edit</button></td>



                          </tr>

                        ))}



                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>


        </div>
      </section>

    </>
  )
}

export default AddDisease