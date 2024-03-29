const sql = require("./db.js");

const util = require('util');

const query = util.promisify(sql.query).bind(sql);




// constructor
const Patient_visit = function(patient_visit) {

  this.patient = patient_visit.patient;
  this.personal_conditions = patient_visit.personal_conditions;
  this.current_treatment = patient_visit.current_treatment;
  this.remarks = patient_visit.remarks;
  this.AssTrauma_diseases = patient_visit.AssTrauma_diseases;
  this.ROMstatus = patient_visit.ROMstatus;
  this.muscle_status = patient_visit.muscle_status;
  this.skin_soft_tissues_pain = patient_visit.skin_soft_tissues_pain;
  this.cardio_vascular_status = patient_visit.cardio_vascular_status;
  this.general_mobility = patient_visit.general_mobility;
  this.transfers = patient_visit.transfers;
  this.balance = patient_visit.balance;
  this.upper_limb_functions = patient_visit.upper_limb_functions;
  this.daily_life_activities = patient_visit.daily_life_activities;



  // Fields for doctor prescription
  this.DiagnosisICD10code = patient_visit.DiagnosisICD10code;
  this.BriefMedicalHistory = patient_visit.BriefMedicalHistory;
  this.WeightBearingPrecautions = patient_visit.WeightBearingPrecautions;
  this.ActivityRestrictions = patient_visit.ActivityRestrictions;
  this.OtherMedicalConsiderations = patient_visit.OtherMedicalConsiderations;
  this.PhysicalTherapyEvaluationTreatment = patient_visit.PhysicalTherapyEvaluationTreatment;
  this.Other = patient_visit.Other;
  this.AnticipatedFrequencyDuration = patient_visit.AnticipatedFrequencyDuration;
  this.SpecialInstructions = patient_visit.SpecialInstructions;
  this.audioFile = patient_visit.audioFile;
  
};

Patient_visit.create = (patient_visit, physical_assessment, result) => {
  sql.query("INSERT INTO patient_visits SET ?", patient_visit, (err, res) => {
    if (err) {
      console.log("error:", err);
      result(err, null);
      return;
    }
    // console.log("created user: ", { id: res.insertId, ...patient_visit });
    result(null, { id: res.insertId, ...patient_visit })

    if (JSON.parse(physical_assessment).length > 0 ){

    physical_assessment = JSON.parse(physical_assessment)

    sql.query("INSERT INTO patient_visit_physical_assessment (x_coordinate, y_coordinate, visit_assessment_id) VALUES ?", 
    
    
    [physical_assessment.map((pa)=>[pa.top, pa.left,res.insertId ])], (err, res) => {
      if (err) {
        console.log("error:", err);
        result(err, null);
        return;
      }
    })
  }



  });
};

Patient_visit.findById =  (id, result) => {
 
  sql.query(`SELECT * FROM patient_visits WHERE patient = ${id}`, async (err, res) => {

    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {

      const finalResponse = [];

        const finalResult = await Promise.all(res.map(async (r)=> {
        
        const  physical_assessment =  await query(`SELECT * FROM patient_visit_physical_assessment WHERE visit_assessment_id = ${r.id}`)

        return ({ ...r, physical_assessment: physical_assessment})
            
      }))
  
      result(null, finalResult);

      return;
    }
    // not found Tutorial with the id
    result({ kind: "not_found" }, null);
  });

};

Patient_visit.getAll = (title, result) => {
  let query = "SELECT * FROM patient_visits";
  // if (title) {
  //   query += ` WHERE title LIKE '%${title}%'`;
  // }
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};

Patient_visit.getAllPublished = result => {
  sql.query("SELECT * FROM users WHERE published=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};



Patient_visit.updateById = (id, user, result) => {
  sql.query(
    "UPDATE users SET first_name = ?, middle_name = ?, surname = ?, cnic = ?, date_of_birth = ?, age = ?, address = ?, email = ?, gender = ?, home_phone = ?, mobile_no = ?, practitioner_type = ?, work_phone = ? WHERE id = ?",
    [user.first_name, user.middle_name, user.surname, user.cnic, user.date_of_birth, user.age, user.address, user.email, user.gender, user.home_phone, user.mobile_no, user.practitioner_type, user.work_phone,  id],
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
      result(null, { id: id, ...user });
    }
  );
};

Patient_visit.remove = (id, result) => {
  sql.query("DELETE FROM users WHERE id = ?", id, (err, res) => {
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
    result(null, res);
  });
};

Patient_visit.removeAll = result => {
  sql.query("DELETE FROM users", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    result(null, res);
  });
};

module.exports = Patient_visit;
