const db = require("../../models");

const ROLES = db.ROLES;
const vehicle = db.vehicle;
const User = db.user;
const vehicle_owner = db.owner;
const station_mod = db.moderator;
const Station = db.station;
const Point = db.point;

exports.manageStations = (req, res) => {
  station_mod.findOne({
    where: {
      user_id: req.userId
    }
  })
    .then( moderator => {
      Station.findOne({
          where: {
            station_id: req.body.station.station_id
        }
      })
        .then(station => {
           if (station){
            Point.findOne({
               where: {
                  point_id: req.body.point.point_id
              }
            }).then(point => {
               Station.update(req.body.station,{
                  where: {
                     station_id: req.body.station.station_id
                  }
               })
               .then(()=>{
               if (point){
                     Point.update(req.body.point,{
                        where: {
                           point_id: req.body.point.point_id
                       }
                     }).then(()=>{
                        return res.status(200).send({"message": "Updated Station and Point"});
                     })
                     
                  }
               else{
                  Point.create(req.body.point).then(()=>{
                     return res.status(200).send({"message": "Updated Station and Added Point"});
                  })
               }

               })
            })
         }
         else{
            Station.create(req.body.station).then(()=>{
               Point.create(req.body.point).then(()=>{
                  return res.status(200).send({"message": "Added Station and then Added Point"});
               })
            })
         }
        })
      })
        .catch(err => {
          res.status(400).send({ message: err.message });
        });
    };


