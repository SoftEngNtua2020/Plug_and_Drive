const db = require("../../models");

const ROLES = db.ROLES;
const vehicle = db.vehicle;
const User = db.user;
const vehicle_owner = db.owner;
const station_mod = db.moderator;
const Station = db.station;
const Point = db.point;
const Provider = db.provider;
const Program = db.program;
exports.manageChargingProgram = (req, res) => {
  station_mod.findOne({
    where: {
      user_id: req.userId
    }
  })
    .then( moderator => {
      Station.findOne({
         where:{
            st_moderator_id:moderator.st_moderator_id,
            station_id:req.body.program.station_id
         }
      }).then(AuthStation => {
         if (!AuthStation){
            return res.status(401).send({message: "Not Authorized For this Station"});
         }
         Program.findAll({
            include: [{
            model: Station,
            required: true,
            where:{
               st_moderator_id:moderator.st_moderator_id
            }
            }],
            order:[['station_id', 'ASC']]
         }).then(programs => {
            var ProgramFlag = 0;
            var AuthFlag = 0;
            
            
            for (var i in programs){
               if (programs[i].program_id == req.body.program.program_id){
                  ProgramFlag = 1;
               }
            }
            if (ProgramFlag){
               Program.update(req.body.program, {
                  where: {
                     program_id: req.body.program.program_id
                  }
               }).then(()=>{
                  return res.status(200).send({message: "Updated Program with given ID"});
               })
            }
            else {
               Program.create({
                  program_name:req.body.program.program_name,
                  kwh_price:req.body.program.kwh_price,
                  bonus_per_kwh:req.body.program.bonus_per_kwh,
                  station_id:req.body.program.station_id,
               }, {
                  where: {
                     program_id: req.body.program.program_id
                  }
               }).then(()=>{
                  return res.status(200).send({message: "Created Program with given ID"});
               })
            }
      })

      })
      })
        .catch(err => {
          res.status(400).send({ message: err.message });
        });
   };


