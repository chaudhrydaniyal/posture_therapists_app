const sql = require("./db.js");

constructor
const Doctor_time_slots = function(doctor_time_slots) {
  // this.start_time = doctor_time_slots.start_time;
  // this.end_time = doctor_time_slots.end_time;
  // this.doctor = doctor_time_slots.doctor;
};

Doctor_time_slots.create = (doctor_time_slots, result) => {

  console.log("first", doctor_time_slots)
  console.log("second", doctor_time_slots.map(ds => [ds.start_time, ds.end_time]))


  sql.query("INSERT IGNORE INTO doctor_time_slots (start_time, end_time, doctor) VALUES ?",
    [(doctor_time_slots.map(ds => [ds.start_time, ds.end_time, ds.doctor]))],


    //  [ ['02-02-2023',    '03-03-2023']],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("created doctor_time_slots: ", { id: res.insertId, ...doctor_time_slots });
      result(null, { id: res.insertId, ...doctor_time_slots });
    });
};

Doctor_time_slots.findById = (id, result) => {
  sql.query(`SELECT * FROM doctor_time_slots WHERE doctor = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found disease: ", res);
      result(null, res);
      return;
    }

    // not found Tutorial with the id
    result({ kind: "not_found" }, null);
  });
};

Doctor_time_slots.getAll = (title, result) => {
  let query = "SELECT first_name, surname, start_time, end_time FROM postureapp.doctor_time_slots inner join users where doctor = users.id;";

  // if (title) {
  //   query += ` WHERE title LIKE '%${title}%'`;
  // }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("diseases: ", res);
    result(null, res);
  });
};

Doctor_time_slots.getAllPublished = result => {
  sql.query("SELECT * FROM doctor_time_slots WHERE published=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("doctor_time_slots: ", res);
    result(null, res);
  });
};

Doctor_time_slots.updateById = (id, doctor_time_slots, result) => {
  sql.query(
    "UPDATE doctor_time_slots SET name = ? WHERE id = ?",
    [doctor_time_slots.name,  id],
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

      console.log("updated doctor_time_slots: ", { id: id, ...doctor_time_slots });
      result(null, { id: id, ...doctor_time_slots });
    }
  );
};

Doctor_time_slots.remove = (id, result) => {
  sql.query("DELETE FROM doctor_time_slots WHERE id = ?", id, (err, res) => {
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

    console.log("deleted doctor_time_slots with id: ", id);
    result(null, res);
  });
};

Doctor_time_slots.removeAll = result => {
  sql.query("DELETE FROM doctor_time_slots", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} doctor_time_slots`);
    result(null, res);
  });
};

module.exports = Doctor_time_slots;
