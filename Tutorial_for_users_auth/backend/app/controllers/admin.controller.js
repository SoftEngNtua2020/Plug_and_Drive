const db = require("../models");
const init = require("../models/database_init.js");
const Admin = db.admin;
const Station = db.station;


exports.addStation = (adminId, stationId) => {
  return Admin.findByPk(adminId)
    .then((admin) => {
      if (!admin) {
        console.log("admin not found!");
        return null;
      }
      return Station.findByPk(stationId).then((station) => {
        if (!station) {
          console.log("station not found!");
          return null;
        }

        admin.addStation(station);
        console.log(`>> added station_id id=${station.id} to admin id=${admin.id}`);
        return admin;
      });
    })
    .catch((err) => {
      console.log(">> Error while adding Station to Admin: ", err);
    });
};