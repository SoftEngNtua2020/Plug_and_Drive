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



exports.signin = (req, res) => {
   User.findOne({
     where: {
       username: req.params.username
     }
   })
     .then(user => {
       if (!user) {
         return res.status(404).send({ message: "User Not found." });
       }
 
       var passwordIsValid = bcrypt.compareSync(
         req.params.password,
         user.password
       );
 
       if (!passwordIsValid) {
         return res.status(401).send({
           accessToken: null,
           message: "Invalid Password!"
         });
       }
 
       var token = jwt.sign({ id: user.id }, config.secret, {
         expiresIn: 86400 // 24 hours
       });
 
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
           accessToken: token
         });
       });
     })
     .catch(err => {
       res.status(500).send({ message: err.message });
     });
 };