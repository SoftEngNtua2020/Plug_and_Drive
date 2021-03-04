const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const init = require ("./app/models/database_init.js");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/vehicleOwnerCharging/vehicleDataF01.routes')(app);
require('./app/routes/vehicleOwnerCharging/vehicleCostAssumpF33.routes')(app);
require('./app/routes/vehicleOwnerCharging/vehicleEventDataF29.routes')(app);
require('./app/routes/vehicleOwnerCharging/F19.routes')(app);
require('./app/routes/vehicleOwnerCharging/sessionsupd.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8765;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


// Sync to DB
const db = require("./app/models");
const Role = db.role;
const AdminController = require("./app/controllers/admin.controller.js");



/*
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
  initial();
});

async function initial() {

await db.admin.sync({ force: false }).then(() => {
    console.log("admin model created successfully")})
    .then(()=>   { 
        db.admin.bulkCreate(init.admins)
    })

await db.station.sync({ force: false }).then(() => {
    console.log("station model created successfully")})
    .then(()=>   { 
        db.station.bulkCreate(init.station)
    })


await db.designer.sync({ force: false }).then(() => {
    console.log("designer model created successfully")})
    .then(()=>   { 
        db.designer.bulkCreate(init.designers)
    })

await db.owner.sync({ force: false }).then(() => {
    console.log("owner model created successfully")})
    .then(()=>   { 
        db.owner.bulkCreate(init.owners)
    })

await db.vehicle.sync({ force: false }).then(() => {
    console.log("vehicle model created successfully")})
    .then(()=>   { 
        db.vehicle.bulkCreate(init.vehicles)
    })


await db.session.sync({ force: false }).then(() => {
  console.log("session model created successfully")})
  .then(()=>   { 
      db.session.bulkCreate(init.session)
  })



 await AdminController.addStation(1,1);
 await AdminController.addStation(1,2);
 await AdminController.addStation(1,3);
 await AdminController.addStation(2,4);
 await AdminController.addStation(2,5);
 await AdminController.addStation(3,6);
 await AdminController.addStation(4,4);
 await AdminController.addStation(4,1);
 await AdminController.addStation(5,2);
 await AdminController.addStation(5,3);


   Role.create({
     id: 1,
     name: "user"
   });
  
   Role.create({
     id: 2,
     name: "moderator"
   });
  
   Role.create({
     id: 3,
     name: "admin"
   });
 }*/