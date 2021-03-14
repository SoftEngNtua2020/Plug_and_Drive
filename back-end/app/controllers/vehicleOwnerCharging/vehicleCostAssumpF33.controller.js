const { session } = require("../../models");
const db = require("../../models");
const charging_programModel = require("../../models/charging_program.model");

const ROLES = db.ROLES;
const Vehicle = db.vehicle;
const vehicle_owner = db.owner;
const Event = db.session;
const Program = db.program;
Rounding_to_two = (num) => { return  Math.round((num + Number.EPSILON) * 100) / 100; }
var vehicle_;
exports.vehicleCostAssump = (req, res) => {
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
      .then(vehicle => {
            vehicle_ = vehicle;
            Program.findAll({
               attributes: ['program_id','kwh_price', 'bonus_per_kwh','station_id']
            }).then(programs =>{
               var programJson = [];
               for (var i in programs){
                  programJson.push({
                     station_id: programs[i].station_id,
                     program_id: programs[i].program_id,
                     program_name: programs[i].program_name,
                     kwh_price: Rounding_to_two( programs[i].kwh_price),
                     bonus_per_kwh: Rounding_to_two( programs[i].bonus_per_kwh),
                     total_cost: Rounding_to_two( (vehicle_.usable_battery_size - vehicle_.current_battery_charge) * programs[i].kwh_price),
                     total_bonus: Rounding_to_two( (vehicle_.usable_battery_size - vehicle_.current_battery_charge) * programs[i].bonus_per_kwh),
                  });
               }
               res.status(200).send(programJson);
            })
         })
         })
         .catch(err => {
         res.status(400).send({ message: err.message });
       });
};


