const sql = require("./db.js");

const doctorLeaves = function (doctorLeave) {

  this.doctor_id = doctorLeave.doctor_id;
  this.from = doctorLeave.from;
  this.to = doctorLeave.to;
  this.reason = doctorLeave.reason;
  this.leave_nature = doctorLeave.leave_nature;

}

doctorLeaves.create = (newLeave, result) => {
  sql.query("INSERT INTO doctor_leaves SET ?", newLeave, (err, res) => {
    if (err) {
      console.log("error:", err);
      result(err, null);
      return;
    }
    result(null, { id: res.insertId, ...newLeave });
  });
};

doctorLeaves.getAll = (results) => {
  let query = "SELECT * FROM doctor_leaves";

  sql.query(query, (err, res) => {
    if (err) {
      console.log(err);
      results(null, err);
      return;
    }
    results(null, res)
  })
}

doctorLeaves.findById = (id, result) => {
  sql.query(`SELECT doctor_leaves.id, doctor_id, leave_nature, doctor_leaves.from, doctor_leaves.to, reason, first_name, surname FROM doctor_leaves inner join users on doctor_leaves.doctor_id = users.id WHERE doctor_leaves.doctor_id = ${id}`, (err, res) => {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    }
    if (res.length) {
      result(null, res);
      return;
    }
    result({ kind: 'not_found' }, null);
  });

}

doctorLeaves.remove = (id, result) => {
  sql.query("DELETE  FROM doctor_leaves WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    }
    if (res.affectedRows == 0) {
      // not found service with the id
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("deleted service with id: ", id);
    result(null, res);
  });

}

doctorLeaves.updateById = (id, service, result) => {
  sql.query(
    "UPDATE doctor_leaves SET service_name = ?, charges = ? , description = ?  WHERE id = ?",
    [service.service_name, service.charges, service.description, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated service: ", { id: id, ...service });
      result(null, { id: id, ...service });
    }
  );
};

doctorLeaves.removeAll = result => {
  sql.query("DELETE FROM doctor_leaves", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} doctor_leaves`);
    result(null, res);
  });
};

module.exports = doctorLeaves