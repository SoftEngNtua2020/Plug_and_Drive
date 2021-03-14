const { session } = require("../../models");
const db = require("../../models");

const ROLES = db.ROLES;
const Vehicle = db.vehicle;
const Event = db.session;
const Program = db.program;
const vehicle_owner = db.owner;
var vehicle_;
DateFormat = (x) => {
   return x.toISOString().
      replace(/T/, ' ').      // replace T with a space
      replace(/\..+/, '');
   }
Rounding_to_two = (num) => { return  Math.round((num + Number.EPSILON) * 100) / 100; }

exports.AddSession = (req, res) => {
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
            Program.findOne({
               where: {
                  program_id: req.body.program_id
               }
            }).then(program =>{
               // thelw na steilw neo session sth vash
               var now = new Date();
               var end = new Date(now);
               var kwh_need = Rounding_to_two( vehicle_.usable_battery_size - vehicle_.current_battery_charge );
               end.setMinutes ( now.getMinutes() + Math.ceil( kwh_need ) ); // peripoy 1 lepto gia mia kwh
               Event.create({
                  started_on: DateFormat(now),
                  finished_on: DateFormat(end),
                  energy_deliverd: Rounding_to_two(kwh_need),
                  point_id: req.body.point_id,
                  protocol: req.body.protocol,
                  payment_method: req.body.payment_method,
                  bonus_points_energy: Rounding_to_two( kwh_need * program.bonus_per_kwh ),
                  total_cost: Rounding_to_two( kwh_need * program.kwh_price ),
                  vehicle_id: vehicle_.vehicle_id,
                  station_id: req.body.station_id,
                  program_id: req.body.program_id
               })
               .then(() => {
                  Vehicle.update(
                     {
                        current_battery_charge: (vehicle_.usable_battery_size - 0.01),
                     },{
                        where: {
                           vehicle_id: vehicle_.vehicle_id
                        }
                  })
                     .then(() => {
                        vehicle_owner.update(
                           {
                              bonus_points: ownerdata.bonus_points + Rounding_to_two( kwh_need * program.bonus_per_kwh ),
                           },
                           {
                              where: {
                                 user_id: req.userId
                              }
                        }).then(() =>{
                  res.status(200).send({
                     total_cost: Rounding_to_two( kwh_need * program.kwh_price ),
                     message: "Session was registered successfully!" 
                     });
                  });
               });
            })
            })
         })
         })
         .catch(err => {
         res.status(400).send({ message: err.message });
       });
};
