import * as Yup from 'yup'

const patientValidation = Yup.object({
    first_name: Yup.string().required("Please enter Patient Name"),
    date_of_birth:Yup.date().required("Please enter Patient DOB"),
    gender:Yup.string().required("Please enter Patient gender"),
    mobile_no:Yup.number().required("Please enter Patient mobile number"),
    cnic:Yup.string().required("Please enter Patient CNIC")
})
const doctorValidation = Yup.object({
    first_name:Yup.string().required("Please enter Doctor Name"),
    date_of_birth:Yup.string().required("Please enter Doctor DOB"),
    gender:Yup.string().required("Please enter Doctor gender"),
    mobile_no:Yup.number().required("Please enter Doctor mobile number"),
    email:Yup.string().email().required("Please enter Doctor Email"),
    cnic:Yup.string().required("Please enter Doctor CNIC"),

})

export {patientValidation,doctorValidation}