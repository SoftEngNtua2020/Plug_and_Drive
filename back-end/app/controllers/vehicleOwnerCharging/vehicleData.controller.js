const db = require("../../models");

const ROLES = db.ROLES;
const vehicle = db.vehicle;
const User = db.user;
const vehicle_owner = db.owner;
Rounding_to_two = (num) => { return  Math.round((num + Number.EPSILON) * 100) / 100; }

exports.vehicleData = (req, res) => {
  vehicle_owner.findOne({
    where: {
      user_id: req.userId
    }
  })
    .then( ownerdata => {
      vehicle.findOne({
          where: {
            owner_id: ownerdata.owner_id
        }
      })
        .then(vehicledata => {
          var decrease_every_time_u_query = vehicledata.current_battery_charge - 2;
          if ( decrease_every_time_u_query < 0){
              decrease_every_time_u_query = decrease_every_time_u_query + 2;
            }
          vehicle.update({current_battery_charge: decrease_every_time_u_query },{
            where: {vehicle_id: vehicledata.vehicle_id}
          })
            .then(() => {
              res.status(200).send({
                brand: vehicledata.brand,
                type: vehicledata.type,
                model: vehicledata.model,
                release_year: vehicledata.release_year,             
                usable_battery_size: Rounding_to_two( vehicledata.usable_battery_size),
                average_consumption: Rounding_to_two( vehicledata.average_consumption),
                current_battery_charge: Rounding_to_two( decrease_every_time_u_query),
                owner_id: vehicledata.owner_id,
              });
              
            });
        })
      })
        .catch(err => {
          res.status(400).send({ message: err.message });
        });
    };


