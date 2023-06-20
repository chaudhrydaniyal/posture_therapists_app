const verifyJWT = require("../middleware/verifyJWT.JS");


module.exports = app => {

  const patient_visit = require("../controllers/patient_visit.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/",verifyJWT, patient_visit.create);

  // Retrieve all Tutorials
  router.get("/",verifyJWT, patient_visit.findAll);

  // Retrieve all published Tutorials
  router.get("/published",verifyJWT, patient_visit.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id",verifyJWT, patient_visit.findOne);

  // Update a Tutorial with id
  router.put("/:id",verifyJWT, patient_visit.update);

  // Delete a Tutorial with id
  router.delete("/:id",verifyJWT, patient_visit.delete);

  // Delete all Tutorials
  router.delete("/",verifyJWT, patient_visit.deleteAll);

  app.use('/api/patientvisits', router);
  
};
