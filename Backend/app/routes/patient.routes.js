const verifyJWT = require("../middleware/verifyJWT.JS");



module.exports = app => {
  const patient = require("../controllers/patient.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", verifyJWT,patient.create);

  // Retrieve all Tutorials
  router.get("/",verifyJWT, patient.findAll);

  // Retrieve all published Tutorials
  router.get("/published", verifyJWT,patient.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", verifyJWT,patient.findOne);

  // Update a Tutorial with id
  router.put("/:id", verifyJWT,patient.update);

  // Delete a Tutorial with id
  router.delete("/:id", verifyJWT,patient.delete);

  // Delete all Tutorials
  router.delete("/",verifyJWT, patient.deleteAll);

  app.use('/api/patients', router);
};
