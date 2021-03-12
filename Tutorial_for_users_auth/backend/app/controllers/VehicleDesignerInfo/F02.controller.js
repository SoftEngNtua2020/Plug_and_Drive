const db = require("../../models");
const sequelize = require("sequelize");
const { Op } = require("sequelize");

function readable_datetime_string(x) {
   return x.toISOString().replace(/T/, ' ').replace(/\..+/, '');
}

exports.F02 = (req, res) => {
  // check that user: req.userId is a vehicle designer
  db.designer.findOne({
    attributes: ['designer_id'], // to reduce table size
    where: {
      user_id: req.userId
    }
  })
  .then(something => {
    if (!something) {
      return res.status(401).send({message: "Unauthorized!"});
    }
    else {
      var start_date = new Date(req.body.start_date);
      start_date.setTime( start_date.getTime() - new Date().getTimezoneOffset()*60*1000 );
      var end_date = new Date(req.body.end_date);
      end_date.setTime( end_date.getTime() - new Date().getTimezoneOffset()*60*1000 );

      db.session.findAll({
         //attributes: ..., // to reduce table size
         where: {
           started_on: { [Op.between]: [start_date, end_date] }
         },
         raw: true,
         include: {
           model: db.vehicle,
           attributes: [],
           where: {
             designer_id: something.designer_id
           },
           required: true
         }
      })
       .then(results => {
           for (var i in results) {
             results[i].started_on = readable_datetime_string(results[i].started_on);
             results[i].finished_on = readable_datetime_string(results[i].finished_on);
           }
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
