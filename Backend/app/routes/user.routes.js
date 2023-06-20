const verifyJWT = require("../middleware/verifyJWT.JS");

module.exports = (app, upload ) => {

  const user = require("../controllers/user.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", verifyJWT, user.create);

  // Retrieve all Tutorials
  router.get("/", verifyJWT, user.findAll);

  // Retrieve all published Tutorials
  router.get("/published",verifyJWT, user.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id",verifyJWT, user.findOne);

  // Update a Tutorial with id
  router.put("/:id",verifyJWT, user.update);

  // Delete a Tutorial with id
  router.delete("/:id",verifyJWT, user.delete);

  // Delete all Tutorials
  router.delete("/",verifyJWT, user.deleteAll);

  app.use('/api/users', router);

};
