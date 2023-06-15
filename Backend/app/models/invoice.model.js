const sql = require("./db.js");

const util = require('util');

const query = util.promisify(sql.query).bind(sql);


// constructor
const Invoice = function (invoice) {
  this.date = invoice.date;
  this.sub_total = invoice.sub_total;
  this.patient = invoice.patient;
  this.doctor = invoice.doctor;
  this.discount = invoice.discount;
  this.tax_rate = invoice.tax_rate;
  this.items = invoice.items;
  this.patient_visit_id = invoice.patient_visit_id;
  // this.invoice = invoice.invoice;
  // this.price = invoice.price;
};

Invoice.create = (invoice,  result) => {

  const invoiceItems = invoice.items;

  delete invoice.items;

  sql.query("INSERT INTO invoice SET ?", invoice, (err, res) => {
    
    if (err) {
      console.log("error:", err);
      result(err, null);
      return;
    }

    sql.query("INSERT INTO invoice_items (item , description, qty , price, invoice ) VALUES ?", [invoiceItems.map((d)=>[d.title, d.description, d.qty, d.price, res.insertId])], (err, res) => {
      console.log("patient_diseases inserted", err)
    })

    result(null, { id: res.insertId });
  });
};

Invoice.findById = (id, result) => {

  // sql.query(`SELECT * FROM patients WHERE id = ${id}`, (err, res) => {
  //   if (err) {
  //     console.log("error: ", err);
  //     result(err, null);
  //     return;
  //   }

  //   if (res.length) {
  //     console.log("found invoice: ", res[0]);
  //     result(null, res[0]);
  //     return;
  //   }

  //   // not found Tutorial with the id
  //   result({ kind: "not_found" }, null);
  // });
  
  sql.query(
    
    // `SELECT * FROM invoice WHERE patient_visit_id = ${id}`
   `SELECT invoice.id, date, sub_total, patient, doctor, discount, tax_rate, patient_visit_id, patients.first_name as patient_first_name , patients.email, patients.address, users.first_name as doctor_first_name FROM invoice  join patients on invoice.patient = patients.id join users on invoice.doctor = users.id WHERE patient_visit_id = ${id}`,
    async (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {

        const finalResult = await Promise.all(res.map(async (r)=> {

        const  invoice_items =  await query(`SELECT * FROM invoice_items WHERE invoice = ${r.id}`)
        return ({ ...r, invoice_items: invoice_items})  
      }))
      console.log("final result test", finalResult)  
      result(null, finalResult);
      return;
    }
    // not found Tutorial with the id
    result({ kind: "not_found" }, null);

  });

};

Invoice.getAll =  (title, result) => {

  let query = "SELECT * FROM patients";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  const allp =  sql.query(query, (err, res) => {

    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};

Invoice.getAllPublished = result => {
  sql.query("SELECT * FROM patients WHERE published=true", (err, res) => {
    if (err) {
      result(null, err);
      return;
    }
    result(null, res);
  });
};



Invoice.updateById = (id, invoice, result) => {
  sql.query(
    "UPDATE patients SET first_name = ?, middle_name = ?, surname = ?, cnic = ?, date_of_birth = ?, age = ?, address = ?, email = ?, gender = ?, mobile_no = ?, date_registered = ?, occupation = ?, physiotherapist_seen_before = ?, patient_concerns_for_previous_physiotherapist = ?, patient_satisfactions_for_previous_physiotherapist = ? WHERE id = ?",
    [invoice.first_name, invoice.middle_name, invoice.surname, invoice.cnic, invoice.date_of_birth, invoice.age, invoice.address, invoice.email, invoice.gender, invoice.mobile_no, invoice.date_registered, invoice.occupation, invoice.physiotherapist_seen_before, invoice.patient_concerns_for_previous_physiotherapist, invoice.patient_satisfactions_for_previous_physiotherapist, id],
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
      console.log("updated invoice: ", { id: id, ...invoice });
      result(null, { id: id, ...invoice });
    }
  );
};

Invoice.remove = (id, result) => {

  sql.query("DELETE FROM patients WHERE id = ?", id, (err, res) => {

    if (err) {
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Tutorial with the id
      result({ kind: "not_found" }, null);
      return;
    }

    result(null, res);

  });

};

Invoice.removeAll = result => {

  sql.query("DELETE FROM patients", (err, res) => {

    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    result(null, res);

  });

};



module.exports = Invoice;