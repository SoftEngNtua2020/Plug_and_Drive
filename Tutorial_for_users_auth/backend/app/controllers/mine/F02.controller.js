const db = require("../../models");
const { Op } = require("sequelize");

exports.F02 = (req, res) => {

   // check that req.userId is a proper station admin -- TO BE ADDED

   //const start_date = int_to_date(req.params.yyyymmdd_from); //?????
   //const end_date = int_to_date(req.params.yyyymmdd_to); //?????
   const start_date = req.params.yyyymmdd_from;
   const end_date = req.params.yyyymmdd_to;
   //console.log(int_to_date(start_date));
   //console.log(int_to_date(end_date));

   db.vehicle.findAll({
      attributes: [], // to reduce table size
      where: {
        designer_id: req.params.designerID
      },
      include: {
        model: db.session,
        where: {
          started_on: { [Op.between]: [start_date, end_date] }
        }
      }
   })
    .then(results => {
         //console.log(results);
         var sessionsJson = [];
         for (var i in results) {
           for (var j in results[i].Charging_Sessions) {
            sessionsJson.push({
               session_id: results[i].Charging_Sessions[j].session_id,
               started_on: results[i].Charging_Sessions[j].started_on,
               finished_on: results[i].Charging_Sessions[j].finished_on,
               energy_delivered: results[i].energy_deliverd,
               point_id: results[i].Charging_Sessions[j].point_id,
               protocol: results[i].Charging_Sessions[j].protocol,
               payment_method: results[i].Charging_Sessions[j].payment_method,
               bonus_points_energy: results[i].Charging_Sessions[j].bonus_points_energy,
               total_cost: results[i].Charging_Sessions[j].total_cost,
               vehicle_id: results[i].Charging_Sessions[j].vehicle_id,
               station_id: results[i].Charging_Sessions[j].station_id
            });
          }
        }
        if(sessionsJson.length != 0) {
          res.status(200).send(sessionsJson);
        }
        else {
          res.status(402).send([]);
        }
    })
    .catch(err => {
    res.status(400).send({ message: err.message });
    });
};
