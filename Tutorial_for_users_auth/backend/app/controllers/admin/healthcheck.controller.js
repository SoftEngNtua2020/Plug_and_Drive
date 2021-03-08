const { session } = require("../../models");
const db = require("../../models");
const csv = require("csvtojson");
const ROLES = db.ROLES;
const Vehicle = db.vehicle;
const Event = db.session;
const Program = db.program;

exports.healthcheck = (req, res) => {
   db.sequelize.authenticate().then(()=>{
      res.status(200).send({status: "OK"});
   })
     .catch(err => {
      res.status(400).send({ status: "failed" });
   });
 
};
