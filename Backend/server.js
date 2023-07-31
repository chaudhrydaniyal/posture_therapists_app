const multer = require('multer');
const express = require("express");
const fileUpload = require('express-fileupload')
const path = require('path')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')
const bodyParser = require('body-parser');

// const bodyParser = require("body-parser"); /* deprecated */

const cors = require("cors");
const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};
app.use(cors());
app.use(bodyParser.json());




//*************     Graphql Http implementation      **************/


const sql = require("./app/models/db");

app.use('/graphql', graphqlHTTP({
  schema: buildSchema(`

    type doctor_availability_slot { 
      id: ID,
      availability_start_time: String,
      availability_end_time: String,
      doctorID: ID,       
      doctor_first_name: String,
      doctor_last_name: String,
    }

    type scheduled_appointment { 
      id: ID,
      doctor_availability_slot_id: ID,
      date: String,
      appointment_start_time: String,
      appointment_end_time: String,
      patientID: ID,
      patient_first_name: String,
      doctorID: ID,
      doctorName: String
    }

    type doctor {
      id: ID,
      first_name: String,
      last_name: String,
    }

    type patient {
      id: ID,
      first_name: String,
      last_name: String,
    }
  
    type RootQuery {
      doctor_availability_slots: [doctor_availability_slot],
      scheduled_appointments: [scheduled_appointment],
      doctors: [doctor],
      patients: [patient]
    }

    schema {
      query: RootQuery
    }
   `),

  rootValue: {
    doctor_availability_slots: async () => {

      let query = "SELECT first_name as doctor_first_name, start_time as availability_start_time, end_time as availability_end_time, doctor as doctorID, surname as doctor_last_name FROM doctor_time_slots inner join users where doctor = users.id;";

      try {

        const sqlRes = await new Promise((resolve, reject) => {
          sql.query(query, (err, res) => {
            if (err) {
              console.log("error: ", err);
              reject(`Error in SQL query: ${err}`)
              return;
            }
            resolve(res)
            return 
          });
        })

        return sqlRes

      }
      catch (err) {

        console.log("error", err)

      }

      // ################# Sample Response ################
      // return [
      //   {
      //     id: 2,
      //     availability_start_time: 'availability_start_time',
      //     availability_end_time: 'availability_end_time',
      //     doctorID: 3,
      //     doctor_first_name: 'doctor_first_name',
      //     scheduled_appointments: [
      //       {
      //         id: 4,
      //         doctor_availability_slot_id: 2,
      //         date: 'date',
      //         appointment_start_time: 'appointment_start_time',
      //         appointment_end_time: 'appointment_end_time',
      //         patientID: 5,
      //         patient_first_name: 'patient_first_name',
      //       }
      //     ]
      //   }
      // ];
    },

    scheduled_appointments: async () => {
      let query = "SELECT scheduled_appointments.id as id, date as date, start_time as appointment_start_time,	end_time as appointment_end_time,	title,	doctor as doctorID, users.first_name as doctorName, patients.first_name as patient_first_name  FROM scheduled_appointments INNER JOIN patients on scheduled_appointments.patient = patients.id INNER JOIN users on scheduled_appointments.doctor = users.id;";
      try {
        const sqlRes = await new Promise((resolve, reject) => {
          sql.query(query, (err, res) => {
            if (err) {
              console.log("error: ", err);
              reject(`Error in SQL query: ${err}`)
              return;
            }

            resolve(res)
            return 
          });
        })
        console.log("The result from sql", sqlRes)
        return sqlRes
      }
      catch (err) {
        console.log("error", err)
      }
    },

    doctors: async () => {

      let query = "SELECT id , first_name, surname as last_name FROM users where  isnull(role)";

      try {
        const sqlRes = await new Promise((resolve, reject) => {
          sql.query(query, (err, res) => {
            if (err) {
              console.log("error: ", err);
              reject(`Error in SQL query: ${err}`)
              return;
            }
            resolve(res)
            return 
          });
        })
        console.log("The result from sql", sqlRes)
        return sqlRes
      }
      catch (err) {
        console.log("error", err)
      }
    },

    patients: async () => {

      let query = "SELECT id , first_name,  last_name FROM patients";

      try {

        const sqlRes = await new Promise((resolve, reject) => {
          sql.query(query, (err, res) => {
            if (err) {
              console.log("error: ", err);
              reject(`Error in SQL query: ${err}`)
              return;
            }
            resolve(res)
            return 
          });
        })
        console.log("The result from sql", sqlRes)

        return sqlRes

      }
      catch (err) {

        console.log("error", err)

      }
    },
  },
  graphiql: true
}))

//*************   END  Graphql Http implementation      **************/



app.use(fileUpload());
app.use(express.static('FileSystem'));
// parse requests of content-type - application/json
app.use(express.json()); /* bodyParser.json() is deprecated */


// ******************   Multer implementation    *************************

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public/images')
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.filename + "_" + Date.now() + path.extname(file.originalname));
//   }
// }
// )
// const upload = multer({ storage: storage })


require("./app/routes/patient_visit.routes.js")(app);
require("./app/routes/patient.routes.js")(app);
require("./app/routes/user.routes.js")(app);
require("./app/routes/auth.routes.js")(app);
require("./app/routes/disease.routes.js")(app);
require("./app/routes/doctor_time_slots.routes.js")(app);
require("./app/routes/scheduled_appointments.routes.js")(app);
require("./app/routes/services.routes.js")(app);
require("./app/routes/invoice.routes.js")(app);
require("./app/routes/doctor_leaves.routes.js")(app);



// set port, listen for requests
const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
