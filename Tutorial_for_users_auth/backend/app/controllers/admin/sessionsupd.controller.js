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
         res.status(200).send({
            message:
              "Uploaded the file successfully: " + req.file.originalname,
          });
      })
     })
     .catch(err => {
      res.status(500).send({ message: err.message });
   });
 
};
