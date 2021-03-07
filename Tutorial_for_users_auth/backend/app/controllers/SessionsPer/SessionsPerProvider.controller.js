const db = require("../../models");
const sequelize = require("sequelize");
const { Op } = require("sequelize");

const { convertArrayToCSV } = require('convert-array-to-csv');
const converter = require('convert-array-to-csv');

function date_string_from_datetime(x) {
    const temp = readable_datetime_string(x);
    var date = '';
    for (i = 0; i <= 9; i++)
      date += temp[i];

    return date;
}

function readable_datetime_string(x) {
   return x.toISOString().replace(/T/, ' ').replace(/\..+/, '');
}

function datetime_from_int(x, from_flag) {
  const temp = String(x);
  const year = temp[0] + temp[1] + temp[2] + temp[3];
  const month = temp[4] + temp[5];
  const day = temp[6] + temp[7];
  var date = year + '-' + month + '-' + day;
  if (from_flag) {
    date += 'T01:00:42';
  }
  else {
    date += 'T23:59:42';
  }

  //console.log(date);
  //console.log(new Date(date));
  return(new Date(date));
}

exports.SessionsPerProvider = (req, res) => {
    // check that user: req.userId is an admin
    db.admin.findOne({
      attributes: ['admin_id'], // to reduce table size
      where: {
        user_id: req.userId
      }
    })
      .then(something => {
        if (!something) {
          return res.status(401).send({message: "Unauthorized!"});
        }
        else {
          ///console.log(req.params.yyyymmdd_from);
          const start_date = datetime_from_int(req.params.yyyymmdd_from, true);
          //console.log(req.params.yyyymmdd_to);
          const end_date = datetime_from_int(req.params.yyyymmdd_to, false);

          db.session.findAll({
            where: {
              started_on: { [Op.between]: [start_date, end_date] }
            },
            attributes: [[sequelize.col('station->energy_provider.provider_id'), 'ProviderID'], [sequelize.col('station->energy_provider.provider_name'), 'ProviderName'], ['station_id', 'StationID'], ['session_id', 'SessionID'], ['vehicle_id', 'VehicleID'], ['started_on', 'StartedOn'], ['finished_on', 'FinishedOn'], ['energy_deliverd', 'EnergyDelivered'], [sequelize.col('charging_program.program_name'), 'PricePolicyRef'], [sequelize.col('charging_program.kwh_price'), 'CostPerKWh'], ['total_cost', 'TotalCost']],
            raw: true,
            include: [
              {
                model: db.station,
                attributes: [], // to reduce table size
                required: true,
                include: {
                  model: db.provider,
                  attributes: [], // to reduce table size
                  where: {
                    provider_id: req.params.providerID
                  },
                  required: true
                }
              },
              {
                model: db.program,
                attributes: [], // to reduce table size
                required: true
              }
            ]
          })
           .then(results => {
               if(!results) { // if the answer is empty
                 res.status(402).send([]);
               }
               else {
                 //console.log(results);
                 for (var i in results) {
                   results[i].ProviderID = String(results[i].ProviderID);
                   results[i].StationID = String(results[i].StationID);
                   results[i].VehicleID = String(results[i].VehicleID);
                   results[i].StartedOn = date_string_from_datetime(results[i].StartedOn);
                   results[i].FinishedOn = date_string_from_datetime(results[i].FinishedOn);
                 }
                 if (req.query.format == 'csv') { // if the format required is csv
                  const headerCSV = [
                    'ProviderID',
                    'ProviderName',
                    'StationID',
                    'SessionID',
                    'VehicleID',
                    'StartedOn',
                    'FinishedOn',
                    'EnergyDelivered',
                    'PricePolicyRef',
                    'CostPerKWh',
                    'TotalCost'
                 ];
                 var dataCSV = [];
                 for (var i in results) {
                   //console.log("\nI AM INSIDE\n");
                   dataCSV.push([
                     results[i].ProviderID,
                     results[i].ProviderName,
                     results[i].StationID,
                     results[i].SessionID,
                     results[i].VehicleID,
                     results[i].StartedOn,
                     results[i].FinishedOn,
                     results[i].EnergyDelivered,
                     results[i].PricePolicyRef,
                     results[i].CostPerKWh,
                     results[i].TotalCost
                   ])
                 }
                 const finalCSV = convertArrayToCSV(dataCSV, {
                   header: headerCSV,
                   separator: ','
                 });
                 //console.log(finalCSV);
                 res.status(200).send(finalCSV);
                }
                else { // if the format required is json (default)
                  const finalJson = results;
                  res.status(200).send(finalJson);
              }
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
