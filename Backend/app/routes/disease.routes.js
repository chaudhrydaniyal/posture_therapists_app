const verifyJWT = require("../middleware/verifyJWT.JS");


module.exports = app => {

  const disease = require("../controllers/disease.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/",verifyJWT, disease.create);

  // Retrieve all Tutorials
  router.get("/", verifyJWT,disease.findAll);

  // Retrieve all published Tutorials
  router.get("/published", verifyJWT,disease.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", verifyJWT,disease.findOne);

  // Update a Tutorial with id
  router.put("/:id",verifyJWT, disease.update);

  // Delete a Tutorial with id
  router.delete("/:id",verifyJWT, disease.delete);

  // Delete all Tutorials
  router.delete("/", verifyJWT,disease.deleteAll);

  app.use('/api/diseases/', router);
  
};
