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
exports.getStationData = (req, res) => {
  station_mod.findOne({
    where: {
      user_id: req.userId
    }
  })
    .then( moderator => {
      Point.findAll({
         include: [{
         model: Station,
         required: true,
         where:{
            st_moderator_id:moderator.st_moderator_id
         }
         }],
         order:[['station_id', 'ASC']]
      }).then(points => {

         Provider.findAll({
            include: [{
            model: Station,
            required: true,
            where:{
               st_moderator_id:moderator.st_moderator_id
            }
            }],
         }).then(providers => {
            Program.findAll({
               include: [{
               model: Station,
               required: true,
               where:{
                  st_moderator_id:moderator.st_moderator_id
               }
               }],
               order:[['station_id', 'ASC']]
            }).then(programs =>{
            var stations_data = [];
            var points_data = [];
            var providers_data = [];
            var programs_data = [];
            if (points){
               stations_data.push(points[0].station);
               for (var i in points){
                  if (stations_data[stations_data.length - 1].station_id != points[i].station.station_id){
                     stations_data.push(points[i].station);
                  }
                  points_data.push({
                     point_id: points[i].point_id,
                     station_id: points[i].station_id
                  })
               }
            }
            for (var i in providers){
               providers_data.push({
                  provider_id: providers[i].provider_id,
                  provider_name: providers[i].provider_name,
                  station_id: providers[i].stations[0].station_id,
               })
               //delete providers_data[i].stations;
            }
            for (var i in programs){
               programs_data.push({
                  program_id: programs[i].program_id,
                  program_name: programs[i].program_name,
                  kwh_price: programs[i].kwh_price,
                  bonus_per_kwh: programs[i].bonus_per_kwh,
                  station_id: programs[i].station_id
               })
               //delete programs_data[i].station;
            }
            //console.log("\n",JSON.stringify( stations ),"\n", JSON.stringify( points ),"\n",JSON.stringify( providers ),"\n",JSON.stringify( programs ));
            return res.status(200).send({
               "stations":stations_data,
               "points":points_data,
               "programs":programs_data,
               "providers":providers_data,
            });
            })
         })
      })

         //var energy_provider = [];
         //var points = [];
         //var station_data = [];

      })
        .catch(err => {
          res.status(400).send({ message: err.message });
        });
   };


