const db = require("../../models");
const { Op } = require("sequelize");

exports.F05 = (req, res) => {
   db.vehicle.findAll({
      attributes: [], // to reduce table size
      where: {
        designer_id: req.userId, // : 42
        type: req.body.vehicle_type
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
         var total_consumption = 0;
         for (var i in results) {
           for (var j in results[i].Charging_Sessions) {
             total_consumption += results[i].Charging_Sessions[j].energy_deliverd;
          }
        }
        res.status(200).send( {total_consumption: total_consumption} );
    })
    .catch(err => {
    res.status(400).send({ message: err.message });
    });
};
