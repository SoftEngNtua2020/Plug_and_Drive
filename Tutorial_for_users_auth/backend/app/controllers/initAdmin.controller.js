const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Save User to Database
  User.destroy({where:{username:req.newUser.username}}).then(()=>{
   User.create({
      username: req.newUser.username,
      email: req.newUser.email,
      password: bcrypt.hashSync(req.newUser.password, 8)
   })
      .then(user => {
         if (req.newUser.roles) {
         Role.findAll({
            where: {
               name: {
               [Op.or]: req.newUser.roles
               }
            }
         }).then(roles => {
            user.setRoles(roles).then(() => {
               //res.send({ message: "User was registered successfully!" });
            });
         });
         } else {
         // user role = 1
         user.setRoles([1]).then(() => {
            //res.send({ message: "User was registered successfully!" });
         });
         }
      })
   })
    .catch(err => {
      //res.status(400).send({ message: err.message });
    });
};
