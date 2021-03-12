const { session } = require("../../models");
const db = require("../../models");
const csv = require("csvtojson");
const ROLES = db.ROLES;
const Vehicle = db.vehicle;
const Event = db.session;
const Program = db.program;

exports.resetsessions = (req, res, next) => {
   Event.destroy({truncate : true, cascade: false}).then(()=>{
      req.newUser = {
         username: "admin",
         email: "myemailadmin@admin.com",
         password: "petrol4ever",
         roles: ["admin"]
      }
      next();
      return res.status(200).send({status:"OK"});
   })
     .catch(err => {
      return res.status(400).send({ status: "failed" });
   });
 
};
