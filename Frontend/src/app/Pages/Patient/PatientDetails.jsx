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
import Input from 'app/components/UI Components/Input';
import { Country, City, State } from "country-state-city";
import Select from "react-select";
import Form from 'react-bootstrap/Form';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';
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
    const [selectedCountry, setSelectedCountry] = useState(patientData.country);
    const [selectedState, setSelectedState] = useState(patientData.state);
    const [selectedCity, setSelectedCity] = useState(patientData.city);
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
        last_name: patientData.last_name,
        date_of_birth: patientData.date_of_birth,
        age: patientData.age,
        gender: patientData.gender,
        address: patientData.address,
        mobile_no: patientData.mobile_no,
        email: patientData.email,
        occupation: patientData.occupation,
        designation:patientData.designation,
        cnic: patientData.cnic,
        physiotherapist_seen_before: patientData.physiotherapist_seen_before,
        not_happy:patientData.not_happy,
        most_happy:patientData.most_happy,
        today_session:patientData.today_session,
        stopping_you:patientData.stopping_you,
        fixed_now:patientData.fixed_now,
        blood_group:patientData.blood_group,
        medical_status:patientData.medical_status,
        emergency_contact_person:patientData.emergency_contact_person,
        emergency_person_relation:patientData.emergency_person_relation,
        emergency_person_mobile:patientData.emergency_person_mobile,
        country:patientData.country,
        state:patientData.state,
        city:patientData.city,
        
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
                    last_name: data.last_name,
                    date_of_birth: data.date_of_birth,
                    age: data.age,
                    gender: data.gender,
                    address: data.address,
                    mobile_no: data.mobile_no,
                    email: data.email,
                    occupation: data.occupation,
                    designation:data.designation,
                    cnic: data.cnic,
                    physiotherapist_seen_before: data.physiotherapist_seen_before,
                    not_happy:data.not_happy,
                    most_happy:data.most_happy,
                    today_session:data.today_session,
                    stopping_you:data.stopping_you,
                    fixed_now:data.fixed_now,
                    blood_group:data.blood_group,
                    medical_status:data.medical_status,
                    emergency_contact_person:data.emergency_contact_person,
                    emergency_person_relation:data.emergency_person_relation,
                    emergency_person_mobile:data.emergency_person_mobile,
                    country:data.country,
                    state:data.state,
                    city:data.city,
                })

            NotificationManager.success("Successfully Updated");

        } catch (error) {
            NotificationManager.error("Something went wrong")

        }
    };

    function ageCalculator(e) {
        var userInput = data.date_of_birth;
        var dob = new Date(userInput);
        if (userInput == null || userInput == '') {
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
                                <label htmlFor="first_name">
                                    {" "}
                                    <div>First Name:</div>
                                </label>
                            </div>
                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                                {" "}
                                <Input style={{ paddingLeft: '0.3rem' }} type="text" name="first_name" value={data.first_name} onChange={handleInput} disabled={disableFields} sx={{
    "& .MuiInputBase-input.Mui-disabled": {
      WebkitTextFillColor: "#000000",
    },
  }}   />
                            </div>
                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                                <label htmlFor="last_name">
                                    {" "}
                                    <div>Last Name:</div>
                                </label>
                            </div>
                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                                {" "}
                                <Input style={{ paddingLeft: '0.3rem' }} type="text" name="last_name" value={data.last_name} onChange={handleInput} disabled={disableFields} sx={{
    "& .MuiInputBase-input.Mui-disabled": {
      WebkitTextFillColor: "#000000",
    },
  }}   />

                            </div>
                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                                <label htmlFor="middle_name">
                                    {" "}
                                    <div>Blood Group <BloodtypeIcon /> :</div>
                                </label>
                            </div>
                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                                {" "}
                                <Form.Select name="gender" class="form-control dropdown" value={data.blood_group} onChange={handleInput} disabled={disableFields} sx={{
    "& .MuiInputBase-input.Mui-disabled": {
      WebkitTextFillColor: "#000000",
    },
  }}  >
                                    <option
                                        value=""
                                        selected="selected"
                                        disabled="disabled"
                                    >
                                        Select Blood Group...
                                    </option>
                                    <option value="A+">A+</option>
                                    <option value="A-">A-</option>
                                    <option value="B+">B+</option>
                                    <option value="B-">B-</option>
                                    <option value="O+">O+</option>
                                    <option value="O-">O-</option>
                                    <option value="AB+">AB+</option>
                                    <option value="AB-">AB-</option>
                                </Form.Select>
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
                                <Input
                                    style={{ paddingLeft: '0.3rem' }}
                                    type="date"
                                    name="date_of_birth"
                                    value={data.date_of_birth}
                                    onChange={(e) => { handleInput(e); ageCalculator(e) }}
                                    disabled={disableFields} sx={{
    "& .MuiInputBase-input.Mui-disabled": {
      WebkitTextFillColor: "#000000",
    },
  }}  
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
                                <Input
                                    style={{ paddingLeft: '0.3rem' }}

                                    name="age"
                                    type="text"

                                    onInput={(e) => {
                                        e.target.value = Math.max(0, parseInt(e.target.value))
                                            .toString()
                                            .slice(0, 3);
                                    }}
                                    value={data.age}
                                    onChange={handleInput}
                                    disabled={disableFields} sx={{
    "& .MuiInputBase-input.Mui-disabled": {
      WebkitTextFillColor: "#000000",
    },
  }}  
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
                                <Form.Select name="gender" class="form-control dropdown" value={data.gender} onChange={handleInput} disabled={disableFields} sx={{
    "& .MuiInputBase-input.Mui-disabled": {
      WebkitTextFillColor: "#000000",
    },
  }}  >
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
                                </Form.Select>

                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                                <label htmlFor="country">
                                    <div>Country:</div>
                                </label>
                            </div>
                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">


{console.log("country",Country.getAllCountries().filter((f)=>f.name==selectedCountry)[0])}

                                <Select
                                    options={Country.getAllCountries()}
                                    getOptionLabel={(options) => {
                                        return options["name"];
                                    }}
                                    getOptionValue={(options) => {
                                        return options["name"];
                                    }}
                                    value={Country.getAllCountries().filter((f)=>f.name==selectedCountry)[0]}
                                    onChange={(item) => {
                                        setSelectedCountry(item.name);
                                    }}
                                    disabled={disableFields} sx={{
    "& .MuiInputBase-input.Mui-disabled": {
      WebkitTextFillColor: "#000000",
    },
  }}  
                                />

                            </div>
                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                                <label htmlFor="state">
                                    <div>State:</div>
                                </label>
                            </div>
                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">


{console.log("state", State?.getStatesOfCountry(
                                        Country.getAllCountries().filter((f)=>f.name==selectedCountry)[0]?.isoCode
                                    ))}

                                <Select
                                    options={State?.getStatesOfCountry(
                                        selectedCountry?.isoCode
                                    )}
                                    getOptionLabel={(options) => {
                                        return options["name"];
                                    }}
                                    getOptionValue={(options) => {
                                        return options["name"];
                                    }}
                                    value={State?.getStatesOfCountry(
                                        Country.getAllCountries().filter((f)=>f.name==selectedCountry)[0]?.isoCode
                                    ).filter((f)=>f.name == selectedState)}
                                    onChange={(item) => {
                                        setSelectedState(item.name);
                                    }}
                                    disabled={disableFields} sx={{
    "& .MuiInputBase-input.Mui-disabled": {
      WebkitTextFillColor: "#000000",
    },
  }}  
                                />

                            </div>
                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                                <label htmlFor="city">
                                    <div>City:</div>
                                </label>
                            </div>
                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                                <Select
                                    options={City.getCitiesOfState(
                                        selectedState?.countryCode,
                                        selectedState?.isoCode
                                    )}
                                    getOptionLabel={(options) => {
                                        return options["name"];
                                    }}
                                    getOptionValue={(options) => {
                                        return options["name"];
                                    }}
                                    value={City.getCitiesOfState(
                                        State?.getStatesOfCountry(
                                            Country.getAllCountries().filter((f)=>f.name==selectedCountry)[0]?.isoCode
                                        ).filter((f)=>f.name == selectedState)[0]?.countryCode,
                                        State?.getStatesOfCountry(
                                            Country.getAllCountries().filter((f)=>f.name==selectedCountry)[0]?.isoCode
                                        ).filter((f)=>f.name == selectedState)[0]?.isoCode
                                    )}
                                    onChange={(item) => {
                                        setSelectedCity(item.name);
                                    }}
                                    disabled={disableFields} sx={{
    "& .MuiInputBase-input.Mui-disabled": {
      WebkitTextFillColor: "#000000",
    },
  }}  
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xl-2 col-lg-2 col-sm-2 border  p-3">
                                <label htmlFor="medical_status">
                                    {" "}
                                    <div>Medical Status:</div>
                                </label>
                            </div>
                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                                <Input style={{ paddingLeft: '0.3rem' }}  type="text" name="medical_status" value={data.medical_status} onChange={handleInput} disabled={disableFields} sx={{
    "& .MuiInputBase-input.Mui-disabled": {
      WebkitTextFillColor: "#000000",
    },
  }}   />
                            </div>
                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                                <label htmlFor="email">
                                    <div>Email:</div>
                                </label>
                            </div>
                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                                <Input style={{ paddingLeft: '0.3rem' }} type="email" name="email" value={data.email} onChange={handleInput} disabled={disableFields} sx={{
    "& .MuiInputBase-input.Mui-disabled": {
      WebkitTextFillColor: "#000000",
    },
  }}   />
                            </div>
                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                                <label htmlFor="mobile_no">
                                    <div>Mobile No:</div>
                                </label>
                            </div>
                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                                <Input style={{ paddingLeft: '0.3rem' }} type="number" name="mobile_no" onInput={(e) => {
                                    e.target.value = Math.max(0, parseInt(e.target.value))
                                        .toString()
                                        .slice(0, 11);
                                }} value={data.mobile_no} onChange={handleInput} disabled={disableFields} sx={{
    "& .MuiInputBase-input.Mui-disabled": {
      WebkitTextFillColor: "#000000",
    },
  }}   />
                            </div>

                        </div>

                        <div className="row">
                            <div className="col-xl-2 col-lg-2 col-sm-2 border  p-3">
                                <label htmlFor="address">
                                    {" "}
                                    <div>Address:</div>
                                </label>
                            </div>
                            <div className="col-xl-6 col-lg-2 col-sm-2 border p-3">
                                <Input style={{ paddingLeft: '0.3rem' }} type="text" name="address" value={data.address} onChange={handleInput} disabled={disableFields} sx={{
    "& .MuiInputBase-input.Mui-disabled": {
      WebkitTextFillColor: "#000000",
    },
  }}   />
                            </div>
                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                                <label htmlFor="occupation">
                                    <div>Occupation:</div>
                                </label>
                            </div>
                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                                <Input style={{ paddingLeft: '0.3rem' }} type="text" name="occupation" value={data.occupation} onChange={handleInput} disabled={disableFields} sx={{
    "& .MuiInputBase-input.Mui-disabled": {
      WebkitTextFillColor: "#000000",
    },
  }}   />
                            </div>

                        </div>

                     


                        <div className="row">
                        <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                                <label htmlFor="designation">
                                    <div>Designation:</div>
                                </label>
                            </div>
                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                                <Input style={{ paddingLeft: '0.3rem' }} type="text" name="designation" value={data.designation} onChange={handleInput} disabled={disableFields} sx={{
    "& .MuiInputBase-input.Mui-disabled": {
      WebkitTextFillColor: "#000000",
    },
  }}   />
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
                                        paddingLeft: '0.3rem'
                                    }}
                                    className="Input_border"
                                    required
                                    name="cnic"
                                    format="#####-#######-#"
                                    allowEmptyFormatting
                                    mask="x"
                                    value={data.cnic}
                                    onChange={handleInput}
                                    disabled={disableFields} sx={{
    "& .MuiInputBase-input.Mui-disabled": {
      WebkitTextFillColor: "#000000",
    },
  }}  
                                />
                            </div>
                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                                <label htmlFor="past_medical_history">
                                    <div>Disease:</div>
                                </label>
                            </div>

                            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">


                                <Form.Select class="form-control dropdown"
                                    disabled={disableFields} sx={{
    "& .MuiInputBase-input.Mui-disabled": {
      WebkitTextFillColor: "#000000",
    },
  }}  
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
                                </Form.Select>


                            </div>


                        </div>
                        <div className="row">

                           
                            
                        </div>

                    </div>
                </div>

                    {/* ************In Case of emergencygency*********** */}

                    <div className="card" style={{ marginTop: '2rem' }}>
                        <div className="card-body" style={{ margin: "10px" }}>
                            <h5>In Case of emergencygency</h5>

                            <div className="row" style={{ marginTop: "2rem" }}>

                                <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                                    <label htmlFor="emergency_contact_person">
                                        <div>Contact Person:</div>
                                    </label>
                                </div>

                                <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                                    <Input style={{ paddingLeft: '0.3rem' }} type="text" name="emergency_contact_person" value={data.emergency_contact_person} onChange={handleInput} disabled={disableFields} sx={{
    "& .MuiInputBase-input.Mui-disabled": {
      WebkitTextFillColor: "#000000",
    },
  }}   />
                                </div>
                                <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                                    <label htmlFor="emergency_person_relation">
                                        <div>Relationship to Patient:</div>
                                    </label>
                                </div>

                                <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                                    <Input style={{ paddingLeft: '0.3rem' }} type="text" name="emergency_person_relation" value={data.emergency_person_relation} onChange={handleInput} disabled={disableFields} sx={{
    "& .MuiInputBase-input.Mui-disabled": {
      WebkitTextFillColor: "#000000",
    },
  }}   />
                                </div>
                                <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                                    <label htmlFor="emergency_person_mobile">
                                        <div>Mobile No:</div>
                                    </label>
                                </div>

                                <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
                                    <Input style={{ paddingLeft: '0.3rem' }} type="number" name="emergency_person_mobile" value={data.emergency_person_mobile} onInput={(e) => {
                                        e.target.value = Math.max(0, parseInt(e.target.value))
                                            .toString()
                                            .slice(0, 11);
                                    }} onChange={handleInput} disabled={disableFields} sx={{
    "& .MuiInputBase-input.Mui-disabled": {
      WebkitTextFillColor: "#000000",
    },
  }}   />

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
                                        <Form.Select name="physiotherapist_seen_before" class="form-control dropdown" value={data.physiotherapist_seen_before} onChange={handleInput} disabled={disableFields} sx={{
    "& .MuiInputBase-input.Mui-disabled": {
      WebkitTextFillColor: "#000000",
    },
  }}  >
                                            <option
                                                value=""
                                                selected="selected"
                                                disabled="disabled"
                                            >
                                                Select ...
                                            </option>
                                            <option>Yes</option>
                                            <option>No</option>

                                        </Form.Select>




                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-xl-6 col-lg-2 col-sm-2 border p-3">
                                    <label htmlFor="not_happy">
                                        <div>If Yes, was there anything you were not happy about?</div>
                                    </label>
                                </div>
                                <div className="col-xl-6 col-lg-2 col-sm-2 border p-3">
                                    {/* <Input type="text" name="patient_concerns_for_previous_physiotherapist " value={values.patient_concerns_for_previous_physiotherapist } onChange={handleChange} onBlur={handleBlur} /> */}
                                    <Input style={{ paddingLeft: '0.3rem' }} type="text" name="not_happy" value={data.not_happy} onChange={handleInput} disabled={disableFields} sx={{
    "& .MuiInputBase-input.Mui-disabled": {
      WebkitTextFillColor: "#000000",
    },
  }}   />
                                </div>



                            </div>

                            <div className="row">
                                <div className="col-xl-6 col-lg-2 col-sm-2 border p-3">
                                    <label htmlFor="most_happy">
                                        <div>What aspects were you most happy with?</div>
                                    </label>
                                </div>
                                <div className="col-xl-6 col-lg-2 col-sm-2 border p-3">
                                    <Input style={{ paddingLeft: '0.3rem' }} type="text" name="most_happy" value={data.most_happy} onChange={handleInput} disabled={disableFields} sx={{
    "& .MuiInputBase-input.Mui-disabled": {
      WebkitTextFillColor: "#000000",
    },
  }}   />
                                </div>



                            </div>

                            <div className="row">
                                <div className="col-xl-6 col-lg-2 col-sm-2 border p-3">
                                    <label htmlFor="today_session">
                                        <div>What are the main things you would like to achieve by the end of today"s session?</div>
                                    </label>
                                </div>

                                <div className="col-xl-6 col-lg-2 col-sm-2 border p-3">
                                    <Input style={{ paddingLeft: '0.3rem' }} type="text" name="today_session" value={data.today_session} onChange={handleInput} disabled={disableFields} sx={{
    "& .MuiInputBase-input.Mui-disabled": {
      WebkitTextFillColor: "#000000",
    },
  }}   />
                                </div>


                            </div>

                            <div className="row">
                                <div className="col-xl-6 col-lg-2 col-sm-2 border p-3">
                                    <label htmlFor="stopping_you">
                                        <div>What is this problem you are here for stopping you from doing?</div>
                                    </label>
                                </div>

                                <div className="col-xl-6 col-lg-2 col-sm-2 border p-3">
                                    <Input style={{ paddingLeft: '0.3rem' }} type="text" name="stopping_you" value={data.stopping_you} onChange={handleInput} disabled={disableFields} sx={{
    "& .MuiInputBase-input.Mui-disabled": {
      WebkitTextFillColor: "#000000",
    },
  }}   />
                                </div>


                            </div>
                            <div className="row">
                                <div className="col-xl-6 col-lg-2 col-sm-2 border p-3">
                                    <label htmlFor="fixed_now">
                                        <div>Why is it important that you get this problem fixed NOW?</div>
                                    </label>
                                </div>

                                <div className="col-xl-6 col-lg-2 col-sm-2 border p-3">
                                    <Input style={{ paddingLeft: '0.3rem' }} type="text" name="fixed_now" value={data.fixed_now} onChange={handleInput} disabled={disableFields} sx={{
    "& .MuiInputBase-input.Mui-disabled": {
      WebkitTextFillColor: "#000000",
    },
  }}   />
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