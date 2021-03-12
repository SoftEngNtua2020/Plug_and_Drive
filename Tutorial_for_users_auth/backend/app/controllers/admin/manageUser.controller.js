const db = require("../../models");

const ROLES = db.ROLES;
const vehicle = db.vehicle;
const User = db.user;
const vehicle_owner = db.owner;
var bcrypt = require("bcryptjs");
exports.manageUser = (req, res) => {
   if(req.params.password.length < 6){
      return res.status(500).send({ message: "Password Must be > 6 ASCII" });
   }
   User.findOne({
      where: {
        username: req.params.username
      }
    }).then(user => {
       if (user) {
          // I shoud update password
          User.update({
             password: bcrypt.hashSync(req.params.password, 8)
            },
            {
               where:{username: user.username}
            }
            ).then(() =>{ 
               res.status(200).send({
                  message: "Updated Password Successfully"
               });
            })
            return;
         }
         else{
            console.log("\n",req.params.username, req.params.password,"\n");

            User.create({
               username: req.params.username,
               password: bcrypt.hashSync(req.params.password, 8)
            }).then(()=>{
               res.status(200).send({
                  message: "Created User Successfully"
               });
               return;
          })
      }
   })
   .catch(err => {
         res.status(400).send({ message: err.message });
      });

/*

  vehicle_owner.findOne({
    where: {
      user_id: req.userId
    }
  })
    .then( ownerdata => {
      vehicle.findOne({
          where: {
            owner_id: ownerdata.owner_id
        }
      })
        .then(vehicledata => {
          var decrease_every_time_u_query = vehicledata.current_battery_charge - 2;
          if ( decrease_every_time_u_query < 0){
              decrease_every_time_u_query = decrease_every_time_u_query + 2;
            }
          vehicle.update({current_battery_charge: decrease_every_time_u_query },{
            where: {vehicle_id: vehicledata.vehicle_id}
          })
            .then(() => {
              res.status(200).send({
                brand: vehicledata.brand,
                type: vehicledata.type,
                model: vehicledata.model,
                release_year: vehicledata.release_year,             
                usable_battery_size: vehicledata.usable_battery_size,
                average_consumption: vehicledata.average_consumption,
                current_battery_charge: decrease_every_time_u_query,
                owner_id: vehicledata.owner_id,
              });
              
            });
        })
      })
        .catch(err => {
          res.status(500).send({ message: err.message });
        });
        */
    };


