const { owner } = require("../../models");
const db = require("../../models");

const ROLES = db.ROLES;
const Vehicle = db.vehicle;
const User = db.user;
const vehicle_owner = db.vehicle_owner;

exports.vehicleData = (req, res) => {
  vehicle_owner.findOne({
    where: {
      user_id: req.userId
    }
  })
    .then( owner => {
      
    
      Vehicle.findOne({
          where: {
            owner_id: owner.id
        }
      })
        .then(vehicle => {
          var decrease_every_time_u_query = vehicle.current_battery_charge - 2;
          if ( decrease_every_time_u_query < 0){
              decrease_every_time_u_query = vehicle.current_battery_charge + 2;
            }
          Vehicle.update({current_battery_charge: decrease_every_time_u_query },{
            where: {id: vehicle.id}
          })
            .then(() => {
              res.status(200).send({
                brand: vehicle.brand,
                type: vehicle.type,
                model: vehicle.model,
                release_year: vehicle.release_year,             
                usable_battery_size: vehicle.usable_battery_size,
                average_consumption: vehicle.average_consumption,
                current_battery_charge: decrease_every_time_u_query,
                owner_id: vehicle.owner_id,
              });
              
            });
        })
      })
        .catch(err => {
          res.status(500).send({ message: err.message });
        });
    };


