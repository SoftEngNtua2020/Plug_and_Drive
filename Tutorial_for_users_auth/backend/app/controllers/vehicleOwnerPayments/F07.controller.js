const { session } = require("../../models");
const db = require("../../models");

const ROLES = db.ROLES;
const Vehicle = db.vehicle;
const Event = db.session;
const vehicle_owner = db.owner;

var cummulative = 0;
exports.CummulativeCostPerCharge = (req, res) => {
   vehicle_owner.findOne({
      where: {
        user_id: req.userId
      }
    })
      .then( ownerdata => {
         Vehicle.findOne({
            where: {
              owner_id: ownerdata.owner_id
          }
        })
      .then(vehicledata => {
         Event.findAll({
            where: {
               vehicle_id: vehicledata.vehicle_id
            }
         })
            .then(sessions => {
               var sessionJson = [];
               for (var i in sessions) {
                  cummulative += sessions[i].total_cost;
                  sessionJson.push({
                     session_id: i,
                     //started_on: sessions[i].started_on,
                     finished_on: sessions[i].finished_on,
                     //energy_deliverd: sessions[i].energy_deliverd,
                     //point_id: sessions[i].point_id,
                     //protocol: sessions[i].protocol,
                     //payment_method: sessions[i].payment_method,
                     //bonus_points_energy: sessions[i].bonus_points_energy,
                     total_cost: cummulative,
                     //vehicle_id: sessions[i].vehicle_id,
                     //station_id: sessions[i].station_id,
                  });
                }
               res.status(200).send(sessionJson);
               cummulative = 0;
               }) 
            })
         })
         .catch(err => {
         res.status(500).send({ message: err.message });
       });
};


