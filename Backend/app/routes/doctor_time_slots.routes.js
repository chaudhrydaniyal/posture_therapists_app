const verifyJWT = require("../middleware/verifyJWT.JS");



module.exports = app => {
  const doctor_time_slots = require("../controllers/doctor_time_slots.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", verifyJWT, doctor_time_slots.create);


  router.post("/weeklyschedule", verifyJWT, doctor_time_slots.weeklySchedule);


  // Retrieve all Tutorials
  router.get("/", verifyJWT, doctor_time_slots.findAll);

  // Retrieve all published Tutorials
  router.get("/published", verifyJWT, doctor_time_slots.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id",verifyJWT,  doctor_time_slots.findOne);

  // Update a Tutorial with id
  router.put("/:id",verifyJWT,  doctor_time_slots.update);

  // Delete a Tutorial with id
  router.delete("/:id",verifyJWT,  doctor_time_slots.delete);

  // Delete all Tutorials
  router.delete("/", verifyJWT, doctor_time_slots.deleteAll);

  app.use('/api/doctortimeslots', router);
};
