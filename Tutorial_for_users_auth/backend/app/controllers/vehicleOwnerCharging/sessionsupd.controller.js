const { session } = require("../../models");
const db = require("../../models");
const csv = require("csvtojson");
const ROLES = db.ROLES;
const Vehicle = db.vehicle;
const Event = db.session;
const Program = db.program;

var vehicle_;
DateFormat = (x) => {
   return x.toISOString().
      replace(/T/, ' ').      // replace T with a space
      replace(/\..+/, '');
   }
Rounding_to_two = (num) => { return  Math.round((num + Number.EPSILON) * 100) / 100; }
exports.SessionsUpd = (req, res) => {
   csv({
      noheader:true,
      output: "csv"
      })  
      .fromString(req.body)
      .then((csvRow)=>{ console.log(csvRow) });
   res.status(200).send({
      message: "Session was registered successfully!" 
      });
      
/*
   Vehicle.findOne({
      where: {
        owner_id: req.userId
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
                  energy_deliverd: kwh_need,
                  point_id: req.body.point_id,
                  protocol: req.body.protocol,
                  payment_method: req.body.payment_method,
                  bonus_points_energy: Rounding_to_two( kwh_need * program.bonus_per_kwh ),
                  total_cost: Rounding_to_two( kwh_need * program.kwh_price ),
                  vehicle_id: vehicle_.id,
                  station_id: req.body.station_id
               })
               .then(() => {
                  Vehicle.update(
                     {current_battery_charge: (vehicle_.usable_battery_size - 0.01)},{
                        where: {
                           id: vehicle_.id
                        }
                  })
                     .then(() => {

                  res.status(200).send({
                     total_cost: Rounding_to_two( kwh_need * program.kwh_price ),
                     message: "Session was registered successfully!" 
                     });
                  });
               });
            })

         })
         .catch(err => {
         res.status(500).send({ message: err.message });
       });
       */
};
