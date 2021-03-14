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

exports.SessionsPerStation = (req, res) => {
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

      // check that user: req.userId is a station moderator
      // and check that user: req.userId is a moderator for the station: req.params.stationID
      db.moderator.findOne({
        attributes: ['user_id', 'first_name', 'last_name'],
        /*where: {
          user_id: req.userId
        },*/
        include: {
          model: db.station,
          attributes: ['station_id'],
          where: {
            station_id: req.params.stationID
          },
          required: true
        }
      })
      .then(something => {
        if ((!something && !admin_flag) || (something.user_id != req.userId && !admin_flag)) {
          return res.status(401).send({message: "Unauthorized!"});
        }
        else {
          var timestamp = new Date();
          timestamp.setTime( timestamp.getTime() - new Date().getTimezoneOffset()*60*1000 );
          const start_date = datetime_from_int(req.params.yyyymmdd_from, true);
          const end_date = datetime_from_int(req.params.yyyymmdd_to, false);
          const operator_name = something.first_name + ' ' + something.last_name;

          db.session.findAll({
             where: {
               station_id: req.params.stationID,
               started_on: { [Op.between]: [start_date, end_date] }
             },
             attributes: [['point_id', 'PointID'], [sequelize.fn('count', sequelize.col('session_id')), 'PointSessions'], [sequelize.fn('sum', sequelize.col('energy_deliverd')), 'EnergyDelivered']],
             group : ['point_id'],
             raw: true,
             order: sequelize.literal('point_id ASC')
          })
           .then(results => {
               if(results.length == 0) { // if the answer is empty
                 res.status(402).send([]);
               }
               else {
                 //console.log(results);
                 var total_energy_delivered = 0;
                 var number_of_charging_sessions = 0;
                 for (var i in results) {
                   results[i].PointID = String(results[i].PointID);
                   total_energy_delivered += results[i].EnergyDelivered;
                   number_of_charging_sessions += results[i].PointSessions;
                 }
                if (req.query.format == 'csv') { // if the format required is csv
                 const headerCSV = [
                   'StationID',
                   'Operator',
                   'RequestTimestamp',
                   'PeriodFrom',
                   'PeriodTo',
                   'TotalEnergyDelivered',
                   'NumberOfChargingSessions',
                   'NumberOfActivePoints',
                   //SessionsSummaryList:
                     'PointID',
                     'PointSessions',
                     'EnergyDelivered'
                 ];
                 var dataCSV = [];
                 for (var i in results) {
                   dataCSV.push([
                     String(req.params.stationID),
                     String(operator_name),
                     readable_datetime_string(timestamp),
                     date_string_from_datetime(start_date),
                     date_string_from_datetime(end_date),
                     total_energy_delivered,
                     number_of_charging_sessions,
                     results.length,
                     //SessionsSummaryList:
                       results[i].PointID,
                       results[i].PointSessions,
                       results[i].EnergyDelivered
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
                    StationID: String(req.params.stationID),
                    Operator: String(operator_name),
                    RequestTimestamp: readable_datetime_string(timestamp),
                    PeriodFrom: date_string_from_datetime(start_date),
                    PeriodTo: date_string_from_datetime(end_date),
                    TotalEnergyDelivered: total_energy_delivered,
                    NumberOfChargingSessions: number_of_charging_sessions,
                    NumberOfActivePoints: results.length,
                    SessionsSummaryList: results
                     /*PointID: ,
                     PointSessions: ,
                     EnergyDelivered: ,*/
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
