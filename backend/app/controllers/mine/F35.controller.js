const db = require("../../models");
const { Op } = require("sequelize");

exports.F35 = (req, res) => {
   db.vehicle.findAll({
      attributes: ['id'], // to reduce table size
      where: {
        designer_id: req.userId // : 42
      },
      include: {
        model: db.session,
        attributes: ['energy_deliverd'], // to reduce table size
        where: {
          started_on: { [Op.between]: [req.body.start_date, req.body.end_date] }
        }
      }
   })
    .then(results => {
         //console.log(results);
         var consumptionsJson = [];
         for (var i in results) {
           var total_consumption = 0;
           for (var j in results[i].Charging_Sessions) {
             total_consumption += results[i].Charging_Sessions[j].energy_deliverd;
          }
          consumptionsJson.push({
            vehicle_id: results[i].id,
            total_consumption: total_consumption
          })
        }
        if(consumptionsJson.length != 0) {
          res.status(200).send(consumptionsJson);
        }
        else {
          res.status(402).send([]);
        }
    })
    .catch(err => {
    res.status(400).send({ message: err.message });
    });
};
