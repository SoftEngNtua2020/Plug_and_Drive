const db = require("../../models");
const sequelize = require("sequelize");
const { Op } = require("sequelize");

exports.F23 = (req, res) => {
  // check that user: req.userId is a station moderator
  db.moderator.findOne({
    attributes: ['st_moderator_id'], // to reduce table size
    where: {
      user_id: req.userId
    }
  })
  .then(something => {
    if (!something) {
      return res.status(401).send({message: "Unauthorized!"});
    }
    else {
      //var datetime = new Date(req.body.datetime);
      //datetime.setTime( datetime.getTime() - new Date().getTimezoneOffset()*60*1000 );
      var start_datetime = new Date(req.body.start_datetime);
      start_datetime.setTime( start_datetime.getTime() - new Date().getTimezoneOffset()*60*1000 );
      var end_datetime = new Date(req.body.end_datetime);
      end_datetime.setTime( end_datetime.getTime() - new Date().getTimezoneOffset()*60*1000 );

      db.session.findAll({
         attributes: [[sequelize.col('vehicle.vehicle_id'), 'VehicleID'], [sequelize.col('vehicle.brand'), 'VehicleBrand'], [sequelize.col('vehicle.type'), 'VehicleType'], [sequelize.col('vehicle.model'), 'VehicleModel'], [sequelize.col('vehicle.release_year'), 'ReleaseYear'], [sequelize.col('vehicle.usable_battery_size'), 'UsableBatterySize'], [sequelize.col('vehicle.average_consumption'), 'AverageConsumption'], [sequelize.col('vehicle.current_battery_charge'), 'CurrentBatteryCharge']],
         where: {
           /*started_on: { [Op.gte]: datetime },
           finished_on: { [Op.lte]: datetime }*/
           started_on: { [Op.gte]: start_datetime },
           finished_on: { [Op.lte]: end_datetime }
         },
         raw: true,
         include: [
           {
           model: db.vehicle,
           attributes: [],
           required: true
          },
          {
           model: db.station,
           attributes: [],
           where: {
             st_moderator_id: something.st_moderator_id
           },
           required: true
         }
       ]
      })
       .then(results => {
           if(results.length == 0) { // if the answer is empty
             res.status(402).send([]);
           }
           else {
            //console.log(results);
            res.status(200).send( results );
         }
       })
       .catch(err => {
       res.status(400).send({ message: err.message });
       });
    }
  })
  .catch(err => {
  res.status(400).send({ message: err.message });
  });
};
