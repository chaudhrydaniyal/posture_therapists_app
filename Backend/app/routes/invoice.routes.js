const verifyJWT = require("../middleware/verifyJWT.JS");


module.exports = app => {
  
  const invoice = require("../controllers/invoice.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/",verifyJWT,  invoice.create);

  // Retrieve all Tutorials
  router.get("/", verifyJWT, invoice.findAll);

  // Retrieve all published Tutorials
  router.get("/published", verifyJWT, invoice.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", verifyJWT, invoice.findOne);

  // Update a Tutorial with id
  router.put("/:id", verifyJWT, invoice.update);

  // Delete a Tutorial with id
  router.delete("/:id",verifyJWT,  invoice.delete);

  // Delete all Tutorials
  router.delete("/", verifyJWT, invoice.deleteAll);

  app.use('/api/invoice', router);

};
