const { session } = require("../../models");
const db = require("../../models");

const ROLES = db.ROLES;
const Vehicle = db.vehicle;
const Event = db.session;
const vehicle_owner = db.owner;
function readable_datetime_string(x) {
   return x.toISOString().replace(/T/, ' ').replace(/\..+/, '');
}
Rounding_to_two = (num) => { return  Math.round((num + Number.EPSILON) * 100) / 100; }
exports.vehicleEventData = (req, res) => {
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
            },
            order: [['finished_on', 'ASC']]
         })
            .then(sessions => {
               var sessionJson = [];
               for (var i in sessions) {
                  sessionJson.push({
                     session_id: sessions[i].session_id,
                     started_on: readable_datetime_string( sessions[i].started_on),
                     finished_on: readable_datetime_string(sessions[i].finished_on),
                     energy_deliverd: Rounding_to_two(sessions[i].energy_deliverd),
                     point_id: sessions[i].point_id,
                     protocol: sessions[i].protocol,
                     payment_method: sessions[i].payment_method,
                     bonus_points_energy: sessions[i].bonus_points_energy,
                     total_cost: sessions[i].total_cost,
                     vehicle_id: sessions[i].vehicle_id,
                     station_id: sessions[i].station_id,
                  });
                }
               res.status(200).send(sessionJson);
               }) 
            })
         })
         .catch(err => {
         res.status(400).send({ message: err.message });
       });
};


