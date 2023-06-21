import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
// import { registrationValidation } from "../../Components/Validation/validationSchema"
import axios from "axios";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { PatternFormat } from "react-number-format";
import "./Patient.css";
import { Box, styled, Button, Icon } from "@mui/material";
import { Span } from "app/components/Typography";
import { Breadcrumb, SimpleCard } from "app/components";
import { patientValidation } from "app/components/Validation/ValidationSchema";
import Input from "app/components/UI Components/Input";
import BloodtypeIcon from "@mui/icons-material/Bloodtype";
import { Country, City, State } from "country-state-city";
import Select from "react-select";
import Form from "react-bootstrap/Form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";




const initialValue = {
  first_name: "",
  last_name: "",
  date_of_birth: "",
  age: "",
  gender: "",
  address: "",
  mobile_no: "",
  email: "",
  occupation: "",
  designation: "",
  cnic: "",
  physiotherapist_seen_before: "",
  not_happy: "",
  most_happy: "",
  today_session: "",
  stopping_you: "",
  fixed_now: "",
  blood_group: "",
  medical_status: "",
  emergency_contact_person: "",
  emergency_person_relation: "",
  emergency_person_mobile: "",
};

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

const PatientForm = () => {
  const [diseases, setDiseases] = useState([]);
  const [diseaseList, setDiseaseList] = useState(null);
  const [selectedDisease, setSelectedDisease] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [cnic, setCnic] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [disableFields, setDisableFields] = useState(true);

  const { values, errors, handleChange, handleBlur, touched, handleSubmit } =
    useFormik({
      initialValues: initialValue,
      validationSchema: patientValidation,
      onSubmit: async (values, action) => {
        console.log("error");
        try {
          const patientForm = await axios.post(
            process.env.REACT_APP_ORIGIN_URL + "api/patients",
            {
              first_name: values.first_name,
              last_name: values.last_name,
              date_of_birth: values.date_of_birth,
              age: values.age,
              gender: values.gender,
              address: values.address,
              mobile_no: values.mobile_no,
              email: values.email,
              occupation: values.occupation,
              designation: values.designation,
              home_phone: values.home_phone,
              work_phone: values.work_phone,
              cnic: values.cnic,
              physiotherapist_seen_before: values.physiotherapist_seen_before,
              not_happy: values.not_happy,
              most_happy: values.most_happy,
              today_session: values.today_session,
              stopping_you: values.stopping_you,
              fixed_now: values.fixed_now,
              emergency_contact_person: values.emergency_contact_person,
              emergency_person_relation: values.emergency_person_relation,
              emergency_person_mobile: values.emergency_person_mobile,
              blood_group: values.blood_group,
              medical_status: values.medical_status,
              country: selectedCountry && selectedCountry.name,
              state: selectedState && selectedState.name,
              city: selectedCity && selectedCity.name,
              diseases: selectedDisease.map((sd) => sd.id),
            }
            ,{
              headers:{
                Authorization: `Bearer ${localStorage.getItem('user')}`,
              }
            });

          NotificationManager.success("Successfully Registered");
        } catch (error) {
          console.log("error", error);
          NotificationManager.error("Something went wrong");
        }

        action.resetForm();
        setSelectedCountry(null);
        setSelectedState(null);
        setSelectedCity(null);
        setDiseases(null)
        setSelectedDisease([])
      },
    });

  function ageCalculator() {
    var userInput = values.date_of_birth;
    var dob = new Date(userInput);
    if (userInput == null || userInput == "") {
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
      values.age = age;
      //display the calculated age
      return (age = "Age is: " + age + " years. ");
    }
  }

  const test = () => {
    console.log("values", values);
  };

  useEffect(() => {
    axios.get(process.env.REACT_APP_ORIGIN_URL + "api/diseases",{
      headers:{
        Authorization: `Bearer ${localStorage.getItem('user')}`,
      }
    }).then((res) => {
      setDiseases(res.data);
      console.log("res", res);
    });
    
  }, []);
 

  const handleChanges = (e) => {
    setDiseaseList(e.target.value);
    setSelectedDisease([
      ...selectedDisease,
      diseases.filter((g) => g.id == e.target.value)[0],
    ]);
  };

  const deleteById = (id) => {
    const index = selectedDisease.findIndex((disease) => disease.id === id);
    if (index !== -1) {
      const temp = selectedDisease;
      temp.splice(index, 1);
      setSelectedDisease(temp);
      console.log("selectedDisease", selectedDisease, temp);

      setSelectedDisease([...selectedDisease]);
    } else {
      console.log("Service with id", id, "not found");
    }
    console.log("index", index);
  };

  return (
    // <>
    <Container>
      {/* <section className="content"> */}

      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Patient Registration" , value : "Posture Physio"}]} />
      </Box>
      <NotificationContainer />

      {/* ***********************Patient Information********************* */}

      <div className="card">
        <div className="card-body" style={{ margin: "10px" }}>
          <h5>PATIENT INFORMATION</h5>

          <div className="row" style={{ marginTop: "2rem" }}>
            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
              <label htmlFor="first_name">
  
                <div>First Name:</div>
              </label>
            </div>
            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
    
              <Input
                style={{ paddingLeft: "0.3rem" }}
                className="Input_border"
                type="text"
                name="first_name"
                label="First Name"
                value={values.first_name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.first_name && touched.first_name ? (
                <p style={{ color: "red" }}>{errors.first_name}</p>
              ) : null}
            </div>
            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
              <label htmlFor="last_name">
             
                <div>Last Name:</div>
              </label>
            </div>
            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
           
              <Input
                style={{ paddingLeft: "0.3rem" }}
                className="Input_border"
                type="text"
                name="last_name"
                label="Last Name"
                value={values.last_name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
              <label htmlFor="middle_name">
           
                <div>
                  Blood Group <BloodtypeIcon /> :
                </div>
              </label>
            </div>
            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
           
              <Form.Select
                name="blood_group"
                class="form-control dropdown"
                value={values.blood_group}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="" selected="selected" disabled="disabled">
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
                type="date"
                name="date_of_birth"
                value={values.date_of_birth}
                id="dob"
                onChange={(e) => {
                  handleChange(e);
                  ageCalculator();
                }}
                onBlur={handleBlur}
              />
              {errors.date_of_birth && touched.date_of_birth ? (
                <p style={{ color: "red" }}>{errors.date_of_birth}</p>
              ) : null}
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
                style={{ paddingLeft: "0.3rem" }}
                className="Input_border"
                name="age"
                type="text"
                label="Age"
                onInput={(e) => {
                  e.target.value = Math.max(0, parseInt(e.target.value))
                    .toString()
                    .slice(0, 3);
                }}
                // value={values.age}
                value={values.age}
                // defaultValue={ageCalculator()}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={disableFields}
              />
              {/* {errors.age && touched.age ? (<p style={{ color: "red" }}>{errors.age}</p>) : null} */}
            </div>
            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
              <label htmlFor="gender">
               
                <div>Gender:</div>
              </label>
            </div>
            <div className="col-xl-2 col-lg-2 col-sm-2 border p-2">
             
              <Form.Select
                name="gender"
                class="form-control dropdown"
                onChange={handleChange}
                value={values.gender}
                onBlur={handleBlur}
              >
                <option value="" selected="selected" disabled="disabled">
                  Select Gender...
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </Form.Select>
              {errors.gender && touched.gender ? (
                <p style={{ color: "red" }}>{errors.gender}</p>
              ) : null}
            </div>
          </div>
          <div className="row">
            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
              <label htmlFor="country">
                <div>Country:</div>
              </label>
            </div>
            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
              <Select
                options={Country.getAllCountries()}
                getOptionLabel={(options) => {
                  return options["name"];
                }}
                getOptionValue={(options) => {
                  return options["name"];
                }}
                value={selectedCountry}
                onChange={(item) => {
                  setSelectedCountry(item);
                }}
              />
            </div>
            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
              <label htmlFor="state">
                <div>State:</div>
              </label>
            </div>
            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
              <Select
                options={State?.getStatesOfCountry(selectedCountry?.isoCode)}
                getOptionLabel={(options) => {
                  return options["name"];
                }}
                getOptionValue={(options) => {
                  return options["name"];
                }}
                value={selectedState}
                onChange={(item) => {
                  setSelectedState(item);
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
                value={selectedCity}
                onChange={(item) => {
                  setSelectedCity(item);
                }}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-xl-2 col-lg-2 col-sm-2 border  p-3">
              <label htmlFor="medical_status">
             
                <div>Medical Status:</div>
              </label>
            </div>
            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
              <Input
                style={{ paddingLeft: "0.3rem" }}
                className="Input_border"
                type="text"
                name="medical_status"
                label="Medical Status"
                value={values.medical_status}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
              <label htmlFor="email">
                <div>Email:</div>
              </label>
            </div>
            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
              <Input
                style={{ paddingLeft: "0.3rem" }}
                className="Input_border"
                type="email"
                name="email"
                label="Email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
              <label htmlFor="mobile_no">
                <div>Mobile No:</div>
              </label>
            </div>
            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
              {/* <Input
                style={{ paddingLeft: "0.3rem" }}
                className="Input_border"
                type="number"
                name="mobile_no"
                label="Mobile No"
                value={values.mobile_no}
                onChange={handleChange}
                onBlur={handleBlur}
                onInput={(e) => {
                  e.target.value = Math.max(0, parseInt(e.target.value))
                    .toString()
                    .slice(0, 11);
                }}
              /> */}

 <PhoneInput
  country="pk"
  value={values.mobile_no}
  inputProps={{
    name: "mobile_no",
    onBlur: handleBlur,
     style: { width: "100%" }
  }}
  onChange={(mobile_no) => handleChange({ target: { name: "mobile_no", value: mobile_no } })}
/>
              {errors.mobile_no && touched.mobile_no ? (
                <p style={{ color: "red" }}>{errors.mobile_no}</p>
              ) : null}
            </div>
          </div>

          <div className="row">
            <div className="col-xl-2 col-lg-2 col-sm-2 border  p-3">
              <label htmlFor="address">
             
                <div>Address:</div>
              </label>
            </div>
            <div className="col-xl-6 col-lg-6 col-sm-6 border p-3">
              <Input
                style={{ paddingLeft: "0.3rem" }}
                className="Input_width"
                type="text"
                name="address"
                label="Address"
                value={values.address}
                onChange={handleChange}
              />
            </div>
            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
              <label htmlFor="occupation">
                <div>Occupation:</div>
              </label>
            </div>
            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
              <Input
                style={{ paddingLeft: "0.3rem" }}
                className="Input_border"
                type="text"
                name="occupation"
                label="Occupation"
                value={values.occupation}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
              <label htmlFor="designation">
                <div>Designation:</div>
              </label>
            </div>
            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
              <Input
                style={{ paddingLeft: "0.3rem" }}
                className="Input_border"
                type="text"
                name="designation"
                label="Designation"
                value={values.designation}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>

            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
              <label htmlFor="cnic">
                <div>CNIC:</div>
              </label>
            </div>

            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
              <PatternFormat
                className="Input_border"
                style={{
                  height: "2rem",
                  width: "90%",
                  border: "1px solid #c0c0c0",
                  borderRadius: "4px",
                  boxSizing: "border-box",
                  paddingBottom: "5px",
                  marginTop:"0.2rem"
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
              {errors.cnic && touched.cnic ? (
                <p style={{ color: "red" }}>{errors.cnic}</p>
              ) : null}
            </div>

            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
              <label htmlFor="past_medical_history">
                <div>Disease:</div>
              </label>
            </div>

            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
              <Form.Select
                class="form-control dropdown"
                value={diseaseList}
                onChange={(e) => handleChanges(e)}
              >
                <option value="none" selected disabled hidden>
                  Select Disease...
                </option>

                {diseases &&
                  diseases.map((d) => (
                    <option value={`${d.id}`} key={d.id}>
                      {d.name}
                    </option>
                  ))}
              </Form.Select>

              {selectedDisease.map((i) => (
                <p key={i.id}>
                  {i.name}
                  <button
                    onClick={() => deleteById(i.id)}
                    style={{
                      background: "none",
                      border: "none",
                      marginTop: "2px",
                      marginLeft: "1rem",
                    }}
                  >
                    &#x274C;
                  </button>
                </p>
              ))}

              {console.log("selectedDisease", selectedDisease)}
            </div>
          </div>
          <div className="row"></div>
        </div>
        <div className="card-body" style={{ margin: "5px" }}>
          <h5>In Case of Emergency</h5>

          <div className="row" style={{ marginTop: "2rem" }}>
            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
              <label htmlFor="emergency_contact_person">
                <div>Contact Person:</div>
              </label>
            </div>

            <div className="col-xl-2 col-lg-2 col-sm-2 border p-2">
              <Input
                style={{ paddingLeft: "0.3rem" }}
                className="Input_border"
                type="text"
                name="emergency_contact_person"
                value={values.emergency_contact_person}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
              <label htmlFor="emergency_person_relation">
                <div>Relationship to Patient:</div>
              </label>
            </div>

            <div className="col-xl-2 col-lg-2 col-sm-2 border p-2">
              <Input
                style={{ paddingLeft: "0.3rem" }}
                className="Input_border"
                type="text"
                name="emergency_person_relation"
                value={values.emergency_person_relation}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
              <label htmlFor="emergency_person_mobile">
                <div>Mobile No:</div>
              </label>
            </div>

            <div className="col-xl-2 col-lg-2 col-sm-2 border p-2">
              {/* <Input
                style={{ paddingLeft: "0.3rem" }}
                className="Input_border"
                type="number"
                name="emergency_person_mobile"
                value={values.emergency_person_mobile}
                onChange={handleChange}
                onBlur={handleBlur}
                onInput={(e) => {
                  e.target.value = Math.max(0, parseInt(e.target.value))
                    .toString()
                    .slice(0, 11);
                }}
              /> */}
<PhoneInput
              // style={{width:"10%"}}
  country="pk"
  value={values.emergency_person_mobile}
  inputProps={{
    name: "emergency_person_mobile",
    onBlur: handleBlur,
    style: { width: "100%" }
  }}
  onChange={(emergency_person_mobile) => handleChange({ target: { name: "emergency_person_mobile", value: emergency_person_mobile } })}
/>
              {/* {errors.prevmobileno && touched.prevmobileno ? (<p style={{ color: "red" }}>{errors.prevmobileno}</p>) : null} */}
            </div>
          </div>
        </div>
        <div className="card-body" style={{ margin: "5px" }}>
          <h5>PREVIOUS TREATMENT</h5>

          <div className="row" style={{ marginTop: "2rem" }}>
            <div className="col-xl-6 col-lg-6 col-sm-6 border p-3">
              <label htmlFor="physiotherapist_seen_before">
                <div>Have you seen another physiotherapist before?</div>
              </label>
            </div>
            <div className="col-xl-6 col-lg-6 col-sm-6 border p-1">
              <div style={{ marginLeft: "0rem" }}>
                
                <Form.Select
                  name="physiotherapist_seen_before"
                  class="form-control dropdown"
                  onChange={(e) => {
                    handleChange(e);
                    if (e.target.value == "No") {
                      setDisabled(true);
                    } else {
                      setDisabled(false);
                    }
                  }}
                  value={values.physiotherapist_seen_before}
                >
                  <option value="" selected="selected" disabled="disabled">
                    Select ...
                  </option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </Form.Select>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-6 col-lg-6 col-sm-6 border p-3">
              <label htmlFor="not_happy">
                <div>If Yes, was there anything you were not happy about?</div>
              </label>
            </div>
            <div className="col-xl-6 col-lg-6 col-sm-6 border p-2">
              {/* <Input type="text" name="patient_concerns_for_previous_physiotherapist " value={values.patient_concerns_for_previous_physiotherapist } onChange={handleChange} onBlur={handleBlur} /> */}
              <Input
                style={{ paddingLeft: "0.3rem" }}
                className="Input_width"
                type="text"
                name="not_happy"
                value={values.not_happy}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={disabled}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-xl-6 col-lg-6 col-sm-6 border p-3">
              <label htmlFor="most_happy">
                <div>What aspects were you most happy with?</div>
              </label>
            </div>
            <div className="col-xl-6 col-lg-6 col-sm-6 border p-2">
              <Input
                style={{ paddingLeft: "0.3rem" }}
                className="Input_width"
                type="text"
                name="most_happy"
                value={values.most_happy}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={disabled}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-xl-6 col-lg-6 col-sm-6 border p-3">
              <label htmlFor="today_session">
                <div>
                  What are the main things you would like to achieve by the end
                  of today"s session?
                </div>
              </label>
            </div>

            <div className="col-xl-6 col-lg-6 col-sm-6 border p-2">
              <Input
                style={{ paddingLeft: "0.3rem" }}
                className="Input_width"
                type="text"
                name="today_session"
                value={values.today_session}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={disabled}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-xl-6 col-lg-6 col-sm-6 border p-3">
              <label htmlFor="stopping_you">
                <div>
                  What is this problem you are here for stopping you from doing?
                </div>
              </label>
            </div>

            <div className="col-xl-6 col-lg-6 col-sm-6 border p-2">
              <Input
                style={{ paddingLeft: "0.3rem" }}
                className="Input_width"
                type="text"
                name="stopping_you"
                value={values.stopping_you}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={disabled}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-xl-6 col-lg-6 col-sm-6 border p-3">
              <label htmlFor="fixed_now">
                <div>
                  Why is it important that you get this problem fixed NOW?
                </div>
              </label>
            </div>

            <div className="col-xl-6 col-lg-6 col-sm-6 border p-2">
              <Input
                style={{ paddingLeft: "0.3rem" }}
                className="Input_width"
                type="text"
                name="fixed_now"
                value={values.fixed_now}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={disabled}
              />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              margin: "1rem",
            }}
          >
            <div>
             
              <Button
                color="primary"
                variant="contained"
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
              >
                <Icon>send</Icon>
                <Span sx={{ pl: 1, textTransform: "capitalize" }}>Submit</Span>
              </Button>
              &nbsp;
            </div>
          </div>
        </div>
      </div>


    </Container>
  );
};

export default PatientForm;
