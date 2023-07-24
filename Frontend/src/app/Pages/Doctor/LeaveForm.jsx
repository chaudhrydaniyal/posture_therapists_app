import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Icon, IconButton, styled, Button } from "@mui/material";
import Form from "react-bootstrap/Form";
import { Span } from "app/components/Typography";
import { Breadcrumb, SimpleCard } from "app/components";
import items from "app/components/Calendar/items";
import { ceil, findLastKey } from "lodash";
import { useFormik } from "formik";
import { leaveValidation } from "app/components/Validation/ValidationSchema";
import DoctorDetails from "./DoctorDetails";
import Input from "app/components/UI Components/Input";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

const initialValue = {
  reason: "",
  leaveNature: "",
};

const LeaveForm = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [calculatedDays, setCalculatedDays] = useState(0);
  const [docDetails, setDocDetails] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [disable, setDisable] = useState(true);
  const [days, setDays] = useState(0);
  //   const [numberofDays, setNumberofDays] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);


  const { values, errors, handleChange, handleBlur, touched, handleSubmit } =
    useFormik({
      initialValues: initialValue,
      // validationSchema: leaveValidation,
      onSubmit: async (values, action) => {
        console.log("error");
        try {
          const leaveForm = await axios.post(
            process.env.REACT_APP_ORIGIN_URL + "api/doctor_leaves",
            {
              doctorID:selectedDoctor.id,
              from: startDate,
              to: endDate,
              reason: values.reason,
              leaveNature: values.leaveNature,
            }
            ,{
              headers:{
                Authorization: `Bearer ${localStorage.getItem('user')}`,
              }
            } 
            );
            leaveForm && NotificationManager.success("Successfully Applied");
        } catch (error) {
          console.log("error", error);
          NotificationManager.error("Something went wrong");
        }
        // action.resetForm();
        // setStartDate("");
        // setEndDate("");
        // setSelectedDoctor(null)
        // setDocDetails(null)
        // setFormSubmitted(true);
      },
      
    });

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const calculateDays = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDifference = Math.abs(end.getTime() - start.getTime());
    const days = Math.ceil(timeDifference / (1000 * 3600 * 24));
    setCalculatedDays(days);
  };

  useEffect(() => {
    axios.get(process.env.REACT_APP_ORIGIN_URL + "api/users/",{
      headers:{
        Authorization: `Bearer ${localStorage.getItem('user')}`,
      }
    }).then((res) => {
      setDocDetails(res.data);
      console.log("res2", res);
    });
  }, []);

  useEffect(() => {
    if(calculatedDays){

      calculateDays();
    }else{
      setCalculatedDays("0")
    }
  }, [endDate]);


  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Doctor Leave Form", value : "Posture Physio" }]} />
      </Box>
      <NotificationContainer />
      <div className="card">
        <div className="card-body">
          <h5>Doctor Leave Form</h5>
          <div className="row" style={{ marginTop: "2rem" }}>
            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
              <label htmlFor="doctorName">
                <div>Name</div>
              </label>
            </div>
            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
              <Form.Select
                name="doctorName"
                onChange={(e) =>
                  setSelectedDoctor(
                    docDetails.filter((g) => g.id == e.target.value)[0]
                  )
                }
              >
                <option value="none" selected disabled hidden>
                  Choose Doctor
                </option>
                {docDetails &&
                  docDetails.map((items, i) => (
                    <option value={`${items.id}`} key={items.id}>
                      {items.first_name}
                    </option>
                  ))}
              </Form.Select>
              {/* {errors.doctorName && touched.doctorName ? (<p style={{ color: "red" }}>{errors.doctorName}</p>) : null} */}
              {console.log("log details", selectedDoctor)}
            </div>
            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
              <label htmlFor="email">
                {" "}
                <div>Email</div>
              </label>
            </div>
            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
              {" "}
              <Input
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
              <Input
                type="text"
                name="gender"
                value={formSubmitted ? "" : selectedDoctor.gender}
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
              <Input
                value={
                  selectedDoctor.specialization === null
                    ? ""
                    : selectedDoctor.specialization 
                }
                disabled={disable}
                type="text"
                name="doctorName"
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
              <Input
                value={selectedDoctor.mobile_no}
                disabled={disable}
                type="text"
                name="mobile-number"
                // label="Mobile Number"
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

              <Form.Select
                name="leaveNature"
                value={values.leaveNature}
                onChange={handleChange}
              >

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
              <label htmlFor="startDate">
                {" "}
                <div>From</div>
              </label>
            </div>
            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
              {" "}
              <Input
                type="date"
                id="startDate"
                name="startDate"
                value={startDate}
                onChange={handleStartDateChange}
              />
            </div>
            {errors.startDate && touched.startDate ? (
              <p style={{ color: "red" }}>{errors.startDate}</p>
            ) : null}
            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
              <label htmlFor="endDate">
                {" "}
                <div>To</div>
              </label>
            </div>
            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
              {" "}
              <Input
                type="date"
                id="endDate"
                name="endDate"
                value={endDate}
                onChange={handleEndDateChange}
              />
            </div>
            {errors.endDate && touched.endDate ? (
              <p style={{ color: "red" }}>{errors.endDate}</p>
            ) : null}
            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
              <label>
                <div>Total Days</div>
              </label>
            </div>
            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
              {" "}
               {calculatedDays} 
            </div>
            <div className="col-xl-2 col-lg-2 col-sm-2 border p-3">
              <label htmlFor="reason">
                {" "}
                <div>Reason</div>
              </label>
            </div>
            <div className="col-xl-10 col-lg-2 col-sm-2 border p-3 ">
              {" "}
              <Input
                style={{paddingLeft: "0.3rem"}}
                type="text"
                name="reason"
                label="Enter Reason"
                value={values.reason}
                onChange={handleChange}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "2rem",
              }}
            >
              <Button
                color="primary"
                variant="contained"
                type="submit"
                onClick={handleSubmit}
              >
                <Icon>send</Icon>
                <Span sx={{ pl: 1, textTransform: "capitalize"}}>Apply</Span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default LeaveForm;
