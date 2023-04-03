import React,{useState,useEffect} from 'react'
import {Col, Row, Container} from "react-bootstrap";
import PatientVisit from './PatientVisit';
const PatientStepper = () => {
    const [step, setstep] = useState(1);
    const [formData,setFormData] = useState({
    personal_conditions: "",
    current_treatment: "",
    remarks: "",
    AssTrauma_diseases: "",
    ROMstatus: "",
    muscle_status: "",
    skin_soft_tissues_pain: "",
    cardio_vascular_status: "",
    general_mobility: "",
    transfers: "",
    balance: "",
    upper_limb_functions: "",
    daily_life_activities: "",
    })

    const nextStep = () => {
        setstep(step + 1);
        console.log("nextstep", nextStep);
      };
    
      const prevStep = () => {
        setstep(step - 1);
      };
      const handleInputData = (input) => (e) => {
        console.log("eee", e);
        // input value from the form
        const { value } = e.target;
    
        //updating for data state taking previous state and then adding new value to create new object
        setFormData((prevState) => ({
          ...prevState,
          [input]: value,
        }));
      };
      switch (step) {
        // case 1 to show stepOne form and passing nextStep, prevStep, and handleInputData as handleFormData method as prop and also formData as value to the fprm
        case 1:
          return (
            <div>
              <Container>
                <Row>
                  <Col md={{ span: 8, offset: 3 }} className="custom-margin">
                    <PatientVisit
                      nextStep={nextStep}
                      handleFormData={handleInputData}
                      values={formData}
                    />
                  </Col>
                </Row>
              </Container>
            </div>
          );
        // case 2:
        //   return (
        //     <div className="App">
        //       <Container>
        //         <Row>
        //           <Col md={{ span: 8, offset: 3 }} className="custom-margin">
        //             <StepTwo
        //               nextStep={nextStep}
        //               prevStep={prevStep}
        //               handleFormData={handleInputData}
        //               values={formData}
        //             />
        //           </Col>
        //         </Row>
        //       </Container>
        //     </div>
        //   );
        // case 3:
        //   return (
        //     <div className="App">
        //       <Container>
        //         <Row>
        //           <Col md={{ span: 8, offset: 3 }} className="custom-margin">
        //             <StepThree
        //               nextStep={nextStep}
        //               prevStep={prevStep}
        //               handleFormData={handleInputData}
        //               values={formData}
        //             />
        //           </Col>
        //         </Row>
        //       </Container>
        //     </div>
        //   );
     

         
        default:
          return "unknown step";
      }
}

export default PatientStepper