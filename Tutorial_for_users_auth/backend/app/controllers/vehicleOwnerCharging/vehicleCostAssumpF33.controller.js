const db = require("../../models");

const ROLES = db.ROLES;
const Vehicle = db.vehicle;
//const User = db.user;


exports.vehicleCostAssump = (req, res) => {
   Vehicle.findOne({
      where: {
        owner_id: req.userId
    }
   })
      .then(vehicle => {
           res.status(200).send({
             brand: vehicle.brand,
             type: vehicle.type,
             model: vehicle.model,
             release_year: vehicle.release_year,             
             usable_battery_size: vehicle.usable_battery_size,
             average_consumption: vehicle.average_consumption,
             current_battery_charge: vehicle.current_battery_charge,
             owner_id: vehicle.owner_id,
           });

      })
      .catch(err => {
         res.status(500).send({ message: err.message });
       });
};


