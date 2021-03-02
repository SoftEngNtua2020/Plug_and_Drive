const { session } = require("../../models");
const db = require("../../models");
const charging_programModel = require("../../models/charging_program.model");

const ROLES = db.ROLES;
const Vehicle = db.vehicle;
const Event = db.session;
const Program = db.program;

var vehicle_;
exports.vehicleCostAssump = (req, res) => {
   Vehicle.findOne({
      where: {
        owner_id: req.userId
    }
   })
      .then(vehicle => {
            vehicle_ = vehicle;
            Program.findAll({
               attributes: ['program_id','kwh_price', 'bonus_per_kwh','station_id']
            }).then(programs =>{
               var programJson = [];
               for (var i in programs){
                  programJson.push({
                     station_id: programs[i].station_id,
                     total_cost: (vehicle_.usable_battery_size - vehicle_.current_battery_charge) * programs[i].kwh_price,
                     total_bonus: (vehicle_.usable_battery_size - vehicle_.current_battery_charge) * programs[i].bonus_per_kwh,
                  });
               }
               res.status(200).send(programJson);
            })

         })
         .catch(err => {
         res.status(500).send({ message: err.message });
       });
};
