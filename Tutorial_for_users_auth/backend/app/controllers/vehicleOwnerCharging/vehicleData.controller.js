const db = require("../../models");

const ROLES = db.ROLES;
const Vehicle = db.vehicle;
const User = db.user;


exports.vehicleData = (req, res) => {
   User.findOne({
      where: {
      username: req.body.username
    }
   })
      .then(user => {
         var authorities = [];
         user.getRoles().then(roles => {
           for (let i = 0; i < roles.length; i++) {
             authorities.push("ROLE_" + roles[i].name.toUpperCase());
           }
           res.status(200).send({
             id: user.id,
             username: user.username,
             email: user.email,
             roles: authorities,
           });
         });  

      })
      .catch(err => {
         res.status(500).send({ message: err.message });
       });
};


