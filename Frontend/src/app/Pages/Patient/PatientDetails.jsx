import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { PatternFormat } from "react-number-format";
import {
    NotificationContainer,
    NotificationManager,
} from "react-notifications";
import axios from 'axios';
import {
    Box, styled, Button, Icon,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow
} from '@mui/material';
import { Span } from "app/components/Typography";
import { Link } from 'react-router-dom';

import { Breadcrumb, SimpleCard } from 'app/components';
import './Patient.css'
import PatientVisit from './PatientVisit';


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


const PatientDetails = () => {
    var patient = useLocation();
    console.log("itemofpatientdata", patient);
    var patientData = patient.state.patient;

    const [disableFields, setDisableFields] = useState(true);
    const [patientInformation, setPatientInformation] = useState(true)
    const [patientVisits, setPatientVisits] = useState(false)
    const [getDiseases, setGetDiseases] = useState([])
    const [doctors, setDoctors] = useState([])
    const [visitsHistory, setVisitsHistory] = useState([])

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (_, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

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
    const openPatientInformation = () => {
        setPatientInformation(true)
    }

    const closePatientInformation = () => {
        setPatientInformation(false)
    }

    const openPatientVisits = () => {
        setPatientVisits(true)
    }

    const closePatientVisits = () => {
        setPatientVisits(false)
    }


    const handleInput = async (e) => {
        let name, value;

        console.log(e);
        name = e.target.name;
        value = e.target.value;
        await setData({ ...data, [name]: value });
    };


    const updatePatient = async () => {
        try {
            const updateUser = await axios
                .put(process.env.REACT_APP_ORIGIN_URL + `api/patients/${data.id}`, {
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
                    patient_concerns_for_previous_physiotherapist: data.patient_concerns_for_previous_physiotherapist,
                    patient_satisfactions_for_previous_physiotherapist: data.patient_satisfactions_for_previous_physiotherapist
                })

            NotificationManager.success("Successfully Updated");

        } catch (error) {
            NotificationManager.error("Something went wrong")

        }
    };

    function ageCalculator(e) {
        var userinput = data.date_of_birth;
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

            // data.age= age

            setData({ ...data, date_of_birth: e.target.value, age: age })
            //display the calculated age  
            return age =
                "Age is: " + age + " years. ";
        }
    }



    useEffect(() => {
        axios.get(process.env.REACT_APP_ORIGIN_URL + 'api/diseases').then((res) => setGetDiseases(res.data));
        axios.get(process.env.REACT_APP_ORIGIN_URL + `api/patientvisits/${data.id}`).then((res) => { setVisitsHistory(res.data); console.log("res333", res) })

    }, [])

    return (
        <Container>
            <Box className="breadcrumb">
                <Breadcrumb routeSegments={[{ name: 'Patient Details' }]} />
            </Box>
            <NotificationContainer />

            <div class="tab" >
                <input type="radio" name="css-tabs" id="tab-1" defaultChecked class="tab-switch" onClick={() => { openPatientInformation(); closePatientVisits() }} />
                <label for="tab-1" class="tab-label" >Patient Information</label>

            </div>
            <div class="tab">
                <input type="radio" name="css-tabs" id="tab-2" class="tab-switch" onClick={() => { closePatientInformation(); openPatientVisits() }} />
                <label for="tab-2" class="tab-label">Patient Visits</label>
            </div>

            <br />
            <br />
            {/* <div style={{display:"flex"}}>
        <button style={{border:"none"}} onClick={()=>{openPatientInformation();closePatientVisits()}}>Patient Information</button>
        <button style={{border:"none",marginLeft:'2rem'}} onClick={()=>{closePatientInformation();openPatientVisits()}}>Patient Visits</button>
        </div> */}





            {/* ************Patient Information*********** */}
            <div style={{ marginTop: '0' }}>
                {patientInformation ? (<><div className="card" style={{ borderTopLeftRadius: "0" }}>
                    <div className="card-body" style={{ margin: "10px" }}>
                        <h5>PATIENT INFORMATION</h5>
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>

                            <Button color='primary' variant="contained"
                                onClick={() => {
                                    setDisableFields(false);
                                }}><Span sx={{ pl: 0, textTransform: "capitalize" }}>Edit</Span></Button>
                            <Button style={{ marginLeft: '1rem' }} color='primary' variant="contained"
                                onClick={() => {
                                    setDisableFields(true); updatePatient()
                                }} ><Span sx={{ pl: 0, textTransform: "capitalize" }}>Save</Span></Button>


                        </div>
                        <div className="row" style={{ marginTop: "2rem" }}>
                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                                <label htmlFor="surname">
                                    {" "}
                                    <div>Surname:</div>
                                </label>
                            </div>
                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                                {" "}
                                <input style={{paddingLeft:'0.3rem'}} className="input_border" type="text" name="surname" placeholder="Surname..." value={data.surname} onChange={handleInput} disabled={disableFields} />
                            </div>
                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                                <label htmlFor="first_name">
                                    {" "}
                                    <div>First Name:</div>
                                </label>
                            </div>
                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                                {" "}
                                <input style={{paddingLeft:'0.3rem'}} className="input_border" type="text" name="first_name" placeholder="First Name..." value={data.first_name} onChange={handleInput} disabled={disableFields} />

                            </div>
                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                                <label htmlFor="middle_name">
                                    {" "}
                                    <div>Middle Name:</div>
                                </label>
                            </div>
                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                                {" "}
                                <input style={{paddingLeft:'0.3rem'}} className="input_border" type="text" name="middle_name" placeholder="Middle Name..." value={data.middle_name} onChange={handleInput} disabled={disableFields} />
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
                                style={{paddingLeft:'0.3rem'}}
                                    type="date"
                                    name="date_of_birth"
                                    value={data.date_of_birth}
                                    onChange={(e) => { handleInput(e); ageCalculator(e) }}
                                    disabled={disableFields}
                                />
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
                                    value={data.age}
                                    onChange={handleInput}
                                    disabled={disableFields}
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
                                    <div>Address:</div>
                                </label>
                            </div>
                            <div className="col-xl-10 col-lg-2 col-sm-2 border p-3">
                                <input style={{paddingLeft:'0.3rem'}} className="input_width" type="text" name="address" placeholder="Address..." value={data.address} onChange={handleInput} disabled={disableFields} />
                            </div>


                        </div>

                        <div className="row">
                            <div className="col-xl-2 col-lg-2 col-sm-2 border  p-3">
                                <label htmlFor="homephone">
                                    {" "}
                                    <div>Home Phone:</div>
                                </label>
                            </div>
                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                                <input style={{paddingLeft:'0.3rem'}} className="input_border" type="text" name="homephone" placeholder="Home Phone..." onChange={handleInput} disabled={disableFields} />
                            </div>
                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                                <label htmlFor="workphone">
                                    {" "}
                                    <div>Work Phone:</div>
                                </label>
                            </div>
                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                                <input style={{paddingLeft:'0.3rem'}} className="input_border" type="text" name="workphone" placeholder="Work Phone..." onChange={handleInput} disabled={disableFields} />
                            </div>
                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                                <label htmlFor="mobile_no">
                                    <div>Mobile No:</div>
                                </label>
                            </div>
                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                                <input style={{paddingLeft:'0.3rem'}} className="input_border" type="number" name="mobile_no" placeholder="Mobile No..." onInput={(e) => {
                                    e.target.value = Math.max(0, parseInt(e.target.value))
                                        .toString()
                                        .slice(0, 11);
                                }} value={data.mobile_no} onChange={handleInput} disabled={disableFields} />
                            </div>

                        </div>

                        <div className="row">
                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                                <label htmlFor="email">
                                    <div>Email:</div>
                                </label>
                            </div>
                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                                <input style={{paddingLeft:'0.3rem'}} className="input_border" type="email" name="email" placeholder="Email..." value={data.email} onChange={handleInput} disabled={disableFields} />
                            </div>
                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                                <label htmlFor="occupation">
                                    <div>Occupation:</div>
                                </label>
                            </div>
                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                                <input style={{paddingLeft:'0.3rem'}} className="input_border" type="text" name="occupation" placeholder="Occupation..." value={data.occupation} onChange={handleInput} disabled={disableFields} />
                            </div>
                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                                <label htmlFor="designation">
                                    <div>Designation:</div>
                                </label>
                            </div>
                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                                <input style={{paddingLeft:'0.3rem'}} className="input_border" type="text" name="designation" placeholder="Designation..." onChange={handleInput} disabled={disableFields} />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                                <label htmlFor="doctorname">
                                    <div>Your Doctor"s Name:</div>
                                </label>
                            </div>
                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                                <input className="input_border" type="text" name="doctorname" placeholder="Your Doctor Name..." onChange={handleInput} disabled={disableFields} />
                            </div>
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
                                        paddingLeft:'0.3rem'
                                    }}
                                    className="input_border"
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
                                    <div>Disease:</div>
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

                    {/* ************In Case of Emergency*********** */}

                    <div className="card" style={{ marginTop: '2rem' }}>
                        <div className="card-body" style={{ margin: "10px" }}>
                            <h5>In Case of Emergency</h5>

                            <div className="row" style={{ marginTop: "2rem" }}>

                                <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                                    <label htmlFor="contactperson">
                                        <div>Contact Person:</div>
                                    </label>
                                </div>

                                <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                                    <input style={{paddingLeft:'0.3rem'}} className="input_border" type="text" name="contactperson" onChange={handleInput} disabled={disableFields} />
                                </div>
                                <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                                    <label htmlFor="patientrelationship">
                                        <div>Relationship to Patient:</div>
                                    </label>
                                </div>

                                <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                                    <input style={{paddingLeft:'0.3rem'}} className="input_border" type="text" name="patientrelationship" onChange={handleInput} disabled={disableFields} />
                                </div>
                                <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                                    <label htmlFor="prevmobileno">
                                        <div>Mobile No:</div>
                                    </label>
                                </div>

                                <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                                    <input style={{paddingLeft:'0.3rem'}} className="input_border" type="number" name="prevmobileno" onInput={(e) => {
                                        e.target.value = Math.max(0, parseInt(e.target.value))
                                            .toString()
                                            .slice(0, 11);
                                    }} onChange={handleInput} disabled={disableFields} />

                                </div>
                            </div>
                        </div>



                    </div>



                    {/* ***********Previous Treatment*************** */}
                    <div className="card" style={{ marginTop: '2rem' }}>
                        <div className="card-body" style={{ margin: "10px" }}>
                            <h5>PREVIOUS TREATMENT</h5>


                            <div className="row" style={{ marginTop: "2rem" }}>
                                <div className="col-xl-6 col-lg-2 col-sm-2 border p-3">
                                    <label htmlFor="physiotherapist_seen_before">
                                        <div>Have you seen another physiotherapist before?</div>
                                    </label>
                                </div>
                                <div className="col-xl-6 col-lg-2 col-sm-2 border p-3">
                                    <div style={{ marginLeft: "4rem" }}>


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
                                        <div>If Yes, was there anything yu were not happy about?</div>
                                    </label>
                                </div>
                                <div className="col-xl-6 col-lg-2 col-sm-2 border p-3">
                                    {/* <input type="text" name="patient_concerns_for_previous_physiotherapist " value={values.patient_concerns_for_previous_physiotherapist } onChange={handleChange} onBlur={handleBlur} /> */}
                                    <input style={{paddingLeft:'0.3rem'}} className="input_width" type="text" name="patient_concerns_for_previous_physiotherapist" value={data.patient_concerns_for_previous_physiotherapist} onChange={handleInput} disabled={disableFields} />
                                </div>



                            </div>

                            <div className="row">
                                <div className="col-xl-6 col-lg-2 col-sm-2 border p-3">
                                    <label htmlFor="patient_satisfactions_for_previous_physiotherapist">
                                        <div>What aspects were you most happy with?</div>
                                    </label>
                                </div>
                                <div className="col-xl-6 col-lg-2 col-sm-2 border p-3">
                                    <input style={{paddingLeft:'0.3rem'}} className="input_width" type="text" name="patient_satisfactions_for_previous_physiotherapist" value={data.patient_satisfactions_for_previous_physiotherapist} onChange={handleInput} disabled={disableFields} />
                                </div>



                            </div>

                            <div className="row">
                                <div className="col-xl-6 col-lg-2 col-sm-2 border p-3">
                                    <label htmlFor="todaysession">
                                        <div>What are the main things you would like to achieve by the end of today"s session?</div>
                                    </label>
                                </div>

                                <div className="col-xl-6 col-lg-2 col-sm-2 border p-3">
                                    <input style={{paddingLeft:'0.3rem'}} className="input_width" type="text" name="todaysession" onChange={handleInput} disabled={disableFields} />
                                </div>


                            </div>

                            <div className="row">
                                <div className="col-xl-6 col-lg-2 col-sm-2 border p-3">
                                    <label htmlFor="stoppingyou">
                                        <div>What is this problem you are here for stopping you from doing?</div>
                                    </label>
                                </div>

                                <div className="col-xl-6 col-lg-2 col-sm-2 border p-3">
                                    <input style={{paddingLeft:'0.3rem'}} className="input_width" type="text" name="stoppingyou" onChange={handleInput} disabled={disableFields} />
                                </div>


                            </div>
                            <div className="row">
                                <div className="col-xl-6 col-lg-2 col-sm-2 border p-3">
                                    <label htmlFor="fixednow">
                                        <div>Why is it important that you get this problem fixed NOW?</div>
                                    </label>
                                </div>

                                <div className="col-xl-6 col-lg-2 col-sm-2 border p-3">
                                    <input style={{paddingLeft:'0.3rem'}} className="input_width" type="text" name="fixednow" onChange={handleInput} disabled={disableFields} />
                                </div>


                            </div>


                        </div>

                    </div></>) : null}
            </div>
            <div style={{ marginTop: '0' }}>
                {patientVisits ? (<><div className="card" style={{ borderTopLeftRadius: "0" }}>
                    <div className="card-body">
                        <div style={{ display: 'flex' }}>
                            <div>Name:</div>
                            <div style={{ color: 'green', marginLeft: '0.3rem' }}>{data.first_name}</div>
                        </div>
                        <StyledTable>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">Sr</TableCell>
                                    <TableCell align="center">Personal Conditions</TableCell>
                                    <TableCell align="center">Current Treatment</TableCell>
                                    <TableCell align="center">Remarks</TableCell>
                                    <TableCell align="right">Details</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {visitsHistory
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((items, id) => (
                                        <TableRow key={id}>
                                            <TableCell align="left">{id}</TableCell>
                                            <TableCell align="center">{items.personal_conditions}</TableCell>
                                            <TableCell align="center">{items.current_treatment}</TableCell>
                                            <TableCell align="center">{items.remarks}</TableCell>
                                            <TableCell align="right"><Link
                                                to="/visitDetails"
                                                state={{ visitsHistory: items }}

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
                            count={visitsHistory.length}
                            onPageChange={handleChangePage}
                            rowsPerPageOptions={[5, 10, 25]}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            nextIconButtonProps={{ "aria-label": "Next Page" }}
                            backIconButtonProps={{ "aria-label": "Previous Page" }}
                        />



                    </div>
                </div></>) : null}
            </div>




        </Container>
    )
}

export default PatientDetails