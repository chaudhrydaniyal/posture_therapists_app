import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Icon,
  IconButton,
  styled,
  Button
} from "@mui/material";

import Form from "react-bootstrap/Form";
import { Span } from "app/components/Typography";

import { Breadcrumb, SimpleCard } from "app/components";
import Input from "app/components/UI Components/Input";
import items from "app/components/Calendar/items";
import { ceil, findLastKey } from "lodash";
import { useFormik } from "formik"

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

const initialValue={
    doctorName : "",
    email:"",
    reason: "",
    dateFrom:"",
    dateTo:"",
    leaveNature:"",
    days:""
    
}

const LeaveForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [docDetails, setDocDetails] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [disable, setDisable] = useState(true);
  const [days, setDays] = useState(0);
//   const [numberofDays, setNumberofDays] = useState(0);

const { values, errors, handleChange, handleBlur, touched, handleSubmit } = useFormik({
    initialValues:initialValue,
    onSubmit:async(values,action)=>{
        try{
            const patientForm = await axios.post(process.env.REACT_APP_ORIGIN_URL + 'api/patients', {
                doctorName:docDetails.first_name,
                email:docDetails.email,
                specialization:docDetails.specialization,
                mobile_no:docDetails.mobile_no,
                dateFrom:values.dateFrom,
                dateTo:values.dateTo,
                reason:values.reason,
                leaveNature:values.leaveNature,
                days:docDetails.days

            })

        }catch(error){
console.log("error",error)
        }
    }
})


  useEffect(() => {
    axios
      .get(process.env.REACT_APP_ORIGIN_URL + "api/users/")
      .then((res) => {
        setDocDetails(res.data);
        console.log("res2", res);
      });
  }, []);

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [numberOfDays, setNumberOfDays] = useState(0);

  const handleFromDateChange = (event) => {
    setFromDate(event.target.value);
  };

  const handleToDateChange = (event) => {
    setToDate(event.target.value);
 
  };

  const calculateDays = () => {
    const newStartDate = new Date(fromDate);
    const newEndDate = new Date(toDate);
   
    const one_day = 1000*60*60*24 
    let result = Math.ceil((newEndDate.getDate()-newStartDate.getDate()));
   setNumberOfDays(result)
  };
  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Doctor Leave Form" }]} />
      </Box>
      <div className="card">
        <div className="card-body">
          <h5>DOCTOR LEAVE</h5>
          <div className="row" style={{ marginTop: "2rem" }}>
            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
              <label htmlFor="name">
                <div>Name</div>
              </label>
            </div>
            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
              <Form.Select
                name="doctorDetails"
                onChange={(e) =>
                  setSelectedDoctor(
                    docDetails.filter((g) => g.id == e.target.value)[0]
                  )
                }
              >
                <option value="none" selected disabled hidden>
                  Choose Name
                </option>
                {docDetails &&
                  docDetails.map((items, i) => (
                    <option value={`${items.id}`} key={items.id}>
                      {items.first_name}
                    </option>
                  ))}
              </Form.Select>
              {console.log("log details", selectedDoctor)}
            </div>
            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
              <label htmlFor="last_name">
                {" "}
                <div>Email</div>
              </label>
            </div>
            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
              {" "}
              <input
                style={{
                  width: "100%",
                  height: "2.5rem",
                  border: "0.5px solid grey",
                  borderRadius: "6px",
                }}
                type="text"
                name="email"
                value={selectedDoctor.email}
                disabled={disable}
              />
            </div>
            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
              <label htmlFor="gender">
                <div>Gender</div>
              </label>
            </div>
            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
              <input
                value={selectedDoctor.gender}
                style={{
                  width: "100%",
                  height: "2.5rem",
                  border: "0.5px solid grey",
                  borderRadius: "6px",
                }}
                disabled={disable}
              />
            </div>
            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
              <label htmlFor="specialization">
                {" "}
                <div>Specialization</div>
              </label>
            </div>
            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
              {" "}
              <input
                value={selectedDoctor.specialization}
                disabled={disable}
                type="text"
                name="specialization"
                label="Specialization"
                style={{
                  width: "100%",
                  height: "2.5rem",
                  border: "0.5px solid grey",
                  borderRadius: "6px",
                }}
              />
            </div>
            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
              <label htmlFor="specialization">
                {" "}
                <div>Mobile Number</div>
              </label>
            </div>
            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
              {" "}
              <input
                value={selectedDoctor.mobile_no}
                disabled={disable}
                type="text"
                name="mobile-number"
                label="Mobile Number"
                style={{
                  width: "100%",
                  height: "2.5rem",
                  border: "0.5px solid grey",
                  borderRadius: "6px",
                }}
              />
            </div>
            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
              <label htmlFor="gender">
                <div>Leave Nature</div>
              </label>
            </div>
            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
              <Form.Select name="gender" value={values.leaveNature} onChange={handleChange}>
                <option>Leave Nature</option>
                <option value="Sick">Sick</option>
                <option value="Casual">Casual</option>
                <option value="Maternity">Maternity</option>
                <option value="Paternity">Paternity</option>
                <option value="Bereavement">Bereavement</option>
                <option value="Sabbatical">Other</option>
              </Form.Select>
            </div>
            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
              <label htmlFor="datefrom">
                {" "}
                <div>From</div>
              </label>
            </div>
            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
              {" "}
              <Input
                style={{ paddingLeft: "0.3rem" }}
                type="date"
                name="dateFrom"
                value={values.dateFrom}
                onChange={handleChange}
              />
            </div>
            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
              <label htmlFor="dateto">
                {" "}
                <div>To</div>
              </label>
            </div>
            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
              {" "}
              <Input
                style={{ paddingLeft: "0.3rem" }}
                type="date"
                name="dateTo"
                value={values.dateTo}
                onChange={() => {
                  handleChange();
                  calculateDays();
                }}
              />
            </div>
            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
              <label>
                <div>Days</div>
              </label>
            </div>
            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
              {" "}
              <input
                style={{ paddingLeft: "0.3rem" }}
                type="text"
                name="totaldays"
                label="0"
                value={numberOfDays > 0 ? numberOfDays : ""} // Use 'days' instead of 'numberOfDays'
              />
            </div>
            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
              <label htmlFor="Reason">
                {" "}
                <div>Reason</div>
              </label>
            </div>
            <div className="col-xl-10 col-lg-2 col-sm-2 border p-3 ">
              {" "}
              <Input
                style={{ paddingLeft: "0.3rem" }}
                type="text"
                name="Reason"
                label="Enter Reason"
                value = {values.reason}
                onChange = {handleChange}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem' }}>
                        
                        <Button color="primary" variant="contained" type="submit" onClick={handleSubmit}>
                            <Icon>send</Icon>
                            <Span sx={{ pl: 1, textTransform: "capitalize" }} >Apply</Span>
                        </Button>
                    </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default LeaveForm;