const { session } = require("../../models");
const db = require("../../models");
const { Op } = Sequelize = require('sequelize');
const ROLES = db.ROLES;
const Vehicle = db.vehicle;
const Event = db.session;
const vehicle_owner = db.owner;

exports.Bonus = (req, res) => {
   vehicle_owner.findOne({
      where: {
        user_id: req.userId
      }
    })
      .then( ownerdata => {
         //console.log("\n",req.body.started_date,"\n",req.body.finished_date,"\n");
         res.status(200).send({
            bonus_points: ownerdata.bonus_points
            //message: "Session was registered successfully!" 
            });

         })
         .catch(err => {
         res.status(500).send({ message: err.message });
       });
};


