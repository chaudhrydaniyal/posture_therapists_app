const verifyJWT = require("../middleware/verifyJWT.JS");



module.exports = app =>{
    const doctorLeaves = require("../controllers/doctor_leaves.controller.js");

  var router = require("express").Router();

  router.post('/',doctorLeaves.create);
  router.get('/', doctorLeaves.getAll);
  router.get('/:id',doctorLeaves.findOne);
  router.put('/:id',doctorLeaves.update);
  router.delete('/:id',doctorLeaves.delete);
  router.delete('/:id',doctorLeaves.deleteAll);

  app.use('/api/doctor_leaves',router)
};

