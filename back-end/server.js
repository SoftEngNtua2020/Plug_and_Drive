const fs = require('fs');
const https = require('https');
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const init = require ("./app/models/database_init.js");
global.__basedir = __dirname;
const app = express();

var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));
/*
// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8081');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
*/
// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Plug&Drive application." });
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

require('./app/routes/SessionsPer/SessionsPerPoint.routes')(app);
require('./app/routes/SessionsPer/SessionsPerStation.routes')(app);
require('./app/routes/SessionsPer/SessionsPerEV.routes')(app);
require('./app/routes/SessionsPer/SessionsPerProvider.routes')(app);

require('./app/routes/VehicleDesignerInfo/F05.routes')(app);
require('./app/routes/VehicleDesignerInfo/F35.routes')(app);
require('./app/routes/VehicleDesignerInfo/F02.routes')(app);

require('./app/routes/stationModeratorInfo/F23.routes')(app);

require('./app/routes/vehicleOwnerCharging/F01.routes')(app);
require('./app/routes/vehicleOwnerCharging/F33.routes')(app);
require('./app/routes/vehicleOwnerCharging/F29.routes')(app);
require('./app/routes/vehicleOwnerCharging/F19.routes')(app);
require('./app/routes/admin/sessionsupd.routes')(app);
require('./app/routes/vehicleOwnerPayments/F07.routes')(app);
require('./app/routes/vehicleOwnerPayments/F14.routes')(app);
require('./app/routes/vehicleOwnerPayments/F31.routes')(app);
require('./app/routes/vehicleOwnerPayments/F26.routes')(app);
require('./app/routes/admin/manageUser.routes')(app);
require('./app/routes/admin/trackUser.routes')(app);
//require('./app/routes/admin/resetsessions.routes')(app);
require('./app/routes/admin/healthcheck.routes')(app);
require('./app/routes/parkingAdmin/F11.routes')(app);
require('./app/routes/parkingAdmin/F31.routes')(app);
require('./app/routes/parkingAdmin/getStationData.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8765;

// Activate Following lines for https usage
/*
https.createServer({
  key: fs.readFileSync('.cert/key.pem'),
  cert: fs.readFileSync('.cert/cert.pem')
}, app).listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
*/
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

module.exports = app;