
const verifyJWT = require("../middleware/verifyJWT.JS");


module.exports = app => {
  const scheduled_appointments = require("../controllers/scheduled_appointments.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", verifyJWT,scheduled_appointments.create);

  // Retrieve all Tutorials
  router.get("/", verifyJWT,scheduled_appointments.findAll);

  // Retrieve all published Tutorials
  router.get("/published",verifyJWT, scheduled_appointments.findAllPublished);

  
  // Retrieve all appointments scheduled today
  router.get("/current", verifyJWT,scheduled_appointments.findAllScheduledToday);

  // Retrieve a single Tutorial with id
  router.get("/:id",verifyJWT, scheduled_appointments.findAllForDoctor);

  // Update a Tutorial with id
  router.put("/:id", verifyJWT,scheduled_appointments.update);

  // Delete a Tutorial with id
  router.delete("/:id", verifyJWT,scheduled_appointments.delete);

  // Delete all Tutorials
  router.delete("/",verifyJWT, scheduled_appointments.deleteAll);

  app.use('/api/scheduledappointments', router);
};
