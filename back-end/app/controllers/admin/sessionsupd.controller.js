const { session } = require("../../models");
const db = require("../../models");
const csv = require("csvtojson");
const ROLES = db.ROLES;
const Vehicle = db.vehicle;
const Event = db.session;
const Program = db.program;

DateFormat = (x) => {
   return x.toISOString().
      replace(/T/, ' ').      // replace T with a space
      replace(/\..+/, '');
   }
Rounding_to_two = (num) => { return  Math.round((num + Number.EPSILON) * 100) / 100; }
exports.SessionsUpd = (req, res) => {
   var csvString = req.file.buffer.toString();
   
     csv({delimiter:";"}).fromString(csvString).then((jsonObj)=>{
      Event.bulkCreate(jsonObj).then(()=>{
         Event.findAll().then(values => {

            res.status(200).send({
               SessionsInUploadedFile: jsonObj.length,
               SessionsImported: jsonObj.length,
               TotalSessionsInDatabase: values.length,
            });
         })
      })
     })
     .catch(err => {
      res.status(400).send({ message: err.message });
   });
 
};
