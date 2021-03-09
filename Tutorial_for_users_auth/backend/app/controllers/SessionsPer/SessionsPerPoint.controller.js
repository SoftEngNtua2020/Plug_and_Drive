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
    date += ' 00:00:01';
  }
  else {
    date += ' 23:59:59';
  }

  var datetime = new Date(date);
  datetime.setTime( datetime.getTime() - new Date().getTimezoneOffset()*60*1000 );
  return(new Date(datetime));
}

exports.SessionsPerPoint = (req, res) => {
    // check that user: req.userId is a station moderator
    // and check that user: req.userId is a moderator for the station with the point: req.params.pointID
    db.point.findByPk(req.params.pointID)
    .then((ppoo) => {
      db.moderator.findOne({
        attributes: ['first_name', 'last_name'],
        where: {
          user_id: req.userId
        },
        include: {
          model: db.station,
          attributes: ['station_id'],
          where: {
            station_id: ppoo.station_id
          },
          required: true
        }
      })
      .then(something => {
        if (!something) {
          return res.status(401).send({message: "Unauthorized!"});
        }
        else {
          var timestamp = new Date();
          timestamp.setTime( timestamp.getTime() - new Date().getTimezoneOffset()*60*1000 );
          const start_date = datetime_from_int(req.params.yyyymmdd_from, true);
          const end_date = datetime_from_int(req.params.yyyymmdd_to, false);
          const st_moderator_name = something.first_name + " " + something.last_name;

          db.session.findAll({
             where: {
               point_id: req.params.pointID,
               started_on: { [Op.between]: [start_date, end_date] }
             },
             attributes: [['session_id', 'SessionID'], ['started_on', 'StartedOn'], ['finished_on', 'FinishedOn'], ['protocol', 'Protocol'], ['energy_deliverd', 'EnergyDelivered'], ['payment_method', 'Payment'], [sequelize.col('vehicle.type'), 'VehicleType']],
             raw: true,
             include: {
               model: db.vehicle,
               attributes: [],
               required: true
             }
          })
           .then(results => {
               if(results.length == 0) { // if the answer is empty
                 res.status(402).send([]);
               }
               else {
                 //console.log(results);
                 var number_of_charging_sessions = 0;
                 var index = 1;
                 for (var i in results) {
                   number_of_charging_sessions += 1;
                   results[i].SessionIndex = index++;
                   results[i].SessionID = String(results[i].SessionID);
                   results[i].StartedOn = date_string_from_datetime(results[i].StartedOn);
                   results[i].FinishedOn = date_string_from_datetime(results[i].FinishedOn);
                   results[i] = JSON.parse(JSON.stringify(results[i], ['SessionIndex','SessionID','StartedOn','FinishedOn','Protocol','EnergyDelivered','Payment','VehicleType']));
                 }
                if (req.query.format == 'csv') { // if the format required is csv
                 const headerCSV = [
                   'Point',
                   'PointOperator',
                   'RequestTimestamp',
                   'PeriodFrom',
                   'PeriodTo',
                   'NumberOfChargingSessions',
                   //ChargingSessionsList:
                     'SessionIndex',
                     'SessionID',
                     'StartedOn',
                     'FinishedOn',
                     'Protocol',
                     'EnergyDelivered',
                     'Payment',
                     'VehicleType'
                 ];
                 var dataCSV = [];
                 for (var i in results) {
                   dataCSV.push([
                     String(req.params.pointID),
                     String(st_moderator_name),
                     readable_datetime_string(timestamp),
                     date_string_from_datetime(start_date),
                     date_string_from_datetime(end_date),
                     number_of_charging_sessions,
                     //ChargingSessionsList:
                      results[i].SessionIndex,
                      results[i].SessionID,
                      results[i].StartedOn,
                      results[i].FinishedOn,
                      results[i].Protocol,
                      results[i].EnergyDelivered,
                      results[i].Payment,
                      results[i].VehicleType
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
                    Point: String(req.params.pointID),
                    PointOperator: String(st_moderator_name),
                    RequestTimestamp: readable_datetime_string(timestamp),
                    PeriodFrom: date_string_from_datetime(start_date),
                    PeriodTo: date_string_from_datetime(end_date),
                    NumberOfChargingSessions: number_of_charging_sessions,
                    ChargingSessionsList: results
                      /*SessionIndex
                      SessionID
                      StartedOn
                      FinishedOn
                      Protocol
                      EnergyDelivered
                      Payment
                      VehicleType*/
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
