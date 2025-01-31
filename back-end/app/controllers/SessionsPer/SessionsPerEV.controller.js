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
    date += ' 01:00:01';
  }
  else {
    date += ' 23:59:59';
  }

  var datetime = new Date(date);
  datetime.setTime( datetime.getTime() - new Date().getTimezoneOffset()*60*1000 );
  return(new Date(datetime));
}

exports.SessionsPerEV = (req, res) => {
    var admin_flag;
    db.admin.findOne({
      attributes: ['admin_id'],
      where: {
        user_id: req.userId
      }
    })
    .then(admin => {
      if (!admin) {
        admin_flag = false;
      }
      else {
        admin_flag = true;
      }

      // check that user: req.userId is a vehicle owner
      // and check that user: req.userId is an owner for the vehicle: req.params.vehicleID
      db.owner.findOne({
        attributes: ['owner_id'],
        where: {
          user_id: req.userId
        },
        include: {
          model: db.vehicle,
          attributes: ['vehicle_id'],
          where: {
            vehicle_id: req.params.vehicleID
          },
          required: true
        }
      })
        .then(something => {
          if (!something && !admin_flag) {
            return res.status(401).send({message: "Unauthorized!"});
          }
          else {
            var timestamp = new Date();
            timestamp.setTime( timestamp.getTime() - new Date().getTimezoneOffset()*60*1000 );
            const start_date = datetime_from_int(req.params.yyyymmdd_from, true);
            const end_date = datetime_from_int(req.params.yyyymmdd_to, false);

            db.session.findAll({
              where: {
                vehicle_id: req.params.vehicleID,
                started_on: { [Op.between]: [start_date, end_date] }
              },
              attributes: [['session_id', 'SessionID'], 'point_id', [sequelize.col('station->energy_provider.provider_name'), 'EnergyProvider'], ['started_on', 'StartedOn'], ['finished_on', 'FinishedOn'], ['energy_deliverd', 'EnergyDelivered'], [sequelize.col('charging_program.program_name'), 'PricePolicyRef'], [sequelize.col('charging_program.kwh_price'), 'CostPerKWh'], ['total_cost', 'SessionCost']],
              order: sequelize.literal('StartedOn ASC'),
              raw: true,
              include: [
                {
                  model: db.station,
                  attributes: [],
                  required: true,
                  include: {
                    model: db.provider,
                    attributes: [],
                  }
                },
                {
                  model: db.program,
                  attributes: [],
                  required: true
                }
              ]
            })
             .then(results => {
                 if(results.length == 0) { // if the answer is empty
                   res.status(402).send([]);
                 }
                 else {
                   //console.log(results);
                   var total_energy_consumed = 0;
                   var visited_points = {};
                   var number_of_vehicle_charging_sessions = 0;
                   var index = 1;
                   for (var i in results) {
                     total_energy_consumed += results[i].EnergyDelivered;
                     visited_points[results[i].point_id] = true;
                     number_of_vehicle_charging_sessions += 1;
                     results[i].SessionIndex = index++;
                     results[i].SessionID = String(results[i].SessionID);
                     results[i].StartedOn = readable_datetime_string(results[i].StartedOn);
                     results[i].FinishedOn = readable_datetime_string(results[i].FinishedOn);
                     results[i] = JSON.parse(JSON.stringify(results[i], ['SessionIndex','SessionID','EnergyProvider','StartedOn','FinishedOn','EnergyDelivered','PricePolicyRef','CostPerKWh','SessionCost']));
                   }
                  if (req.query.format == 'csv') { // if the format required is csv
                   const headerCSV = [
                     'VehicleID',
                     'RequestTimestamp',
                     'PeriodFrom',
                     'PeriodTo',
                     'TotalEnergyConsumed',
                     'NumberOfVisitedPoints',
                     'NumberOfVehicleChargingSessions',
                     //VehicleChargingSessionsList:
                       'SessionIndex',
                       'SessionID',
                       'EnergyProvider',
                       'StartedOn',
                       'FinishedOn',
                       'ΕnergyDelivered',
                       'PricePolicyRef',
                       'CostPerKWh',
                       'SessionCost',
                   ];
                   var dataCSV = [];
                   for (var i in results) {
                     dataCSV.push([
                       String(req.params.vehicleID),
                       readable_datetime_string(timestamp),
                       date_string_from_datetime(start_date),
                       date_string_from_datetime(end_date),
                       total_energy_consumed,
                       Object.keys(visited_points).length,
                       number_of_vehicle_charging_sessions,
                       //ChargingSessionsList:
                        results[i].SessionIndex,
                        results[i].SessionID,
                        results[i].EnergyProvider,
                        results[i].StartedOn,
                        results[i].FinishedOn,
                        results[i].EnergyDelivered,
                        results[i].PricePolicyRef,
                        results[i].CostPerKWh,
                        results[i].SessionCost
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
                    const finalJson = {
                      VehicleID: String(req.params.vehicleID),
                      RequestTimestamp: readable_datetime_string(timestamp),
                      PeriodFrom: date_string_from_datetime(start_date),
                      PeriodTo: date_string_from_datetime(end_date),
                      TotalEnergyConsumed: total_energy_consumed,
                      NumberOfVisitedPoints: Object.keys(visited_points).length,
                      NumberOfVehicleChargingSessions: number_of_vehicle_charging_sessions,
                      VehicleChargingSessionsList: results
                        /*SessionIndex
                        SessionID
                        EnergyProvider
                        StartedOn
                        FinishedOn
                        ΕnergyDelivered
                        PricePolicyRef
                        CostPerKWh
                        SessionCost*/
                    };
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
    })
    .catch(err => {
    res.status(400).send({ message: err.message });
    });
};
