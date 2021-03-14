const db = require("../../models");
const ROLES = db.ROLES;
const vehicle = db.vehicle;
const User = db.user;
const owner = db.owner;
const designer = db.designer;
const station_mod = db.moderator;
const admin = db.admin;
var bcrypt = require("bcryptjs");

exports.trackUser = (req, res) => {
   User.findOne({
      where: {
        username: req.params.username
      }
    }).then(user => {
      if (!user) {
         return res.status(404).send({ message: "User Not found." });
       }
      var authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push(roles[i].name);
        }
      if (authorities[0] == "admin"){
         admin.findOne({
            where: {
               user_id: user.id
            }
         }).then(user_data => {
            return res.status(200).send(user_data);
         })
      }
      if (authorities[0] == "vehicle_designer"){
         designer.findOne({
            where: {
               user_id: user.id
            }
         }).then(user_data => {
            return res.status(200).send(user_data);
         })
      }
      if (authorities[0] == "vehicle_owner"){
         owner.findOne({
            where: {
               user_id: user.id
            }
         }).then(user_data => {
            return res.status(200).send(user_data);
         })
      }
      if (authorities[0] == "station_admin"){
         station_mod.findOne({
            where: {
               user_id: user.id
            }
         }).then(user_data => {
            return res.status(200).send(user_data);
         })
      }
   })
   .catch(err => {
         res.status(400).send({ message: err.message });
      });

    });

   };