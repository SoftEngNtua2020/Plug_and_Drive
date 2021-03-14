const db = require("../../models");

const ROLES = db.ROLES;
const vehicle = db.vehicle;
const User = db.user;
const vehicle_owner = db.owner;
const station_mod = db.moderator;
const Station = db.station;
const Point = db.point;
var undef;
exports.manageStations = (req, res) => {
  station_mod.findOne({
    where: {
      user_id: req.userId
    }
  })
    .then( moderator => {
      if (req.body.station && (typeof req.body.station.station_id !== 'undefined' && req.body.station.station_id !== null)){
      Station.findOne({
          where: {
            st_moderator_id: moderator.st_moderator_id,
            station_id: req.body.station.station_id
        }
      })
        .then(station => {
           if (station){
               Station.update(req.body.station,{
                  where: {
                     station_id: req.body.station.station_id
                  }
               })
              .then(() => {
               if (req.body.point){
                  if (req.body.point.station_id){
                  if (req.body.point.station_id != station.station_id){
                     return res.status(200).send({"message": "Updated Station and Not Authorized to Modifie this Point"});
                  }
                  Point.create(req.body.point).then(()=>{
                     return res.status(200).send({"message": "Updated Station and Added Point"});
                  })
               }
         }
            else{
               return res.status(200).send({"message": "Updated Station"});
            }
         })
      }
         else{
            Station.findOne({
               where:{
                  station_id: req.body.station.station_id
            }
         }).then(existed_station =>{
            if (existed_station){
               return res.status(401).send({"message": "Not Authorized for this station"});
            }
            else{
               Station.create(req.body.station).then(()=>{
                  if (req.body.point){
                     Point.create(req.body.point).then(()=>{
                        return res.status(200).send({"message": "Added Station and then Added Point"});
                     })
                  }
                  return res.status(200).send({"message": "Added Station"});
               })
         }
         })

         }
            })
         
         }
         else {
            return res.status(402).send({"message": "No Station ID Provided"});
         }
      })
        .catch(err => {
          res.status(400).send({ message: err.message });
        });
    };


