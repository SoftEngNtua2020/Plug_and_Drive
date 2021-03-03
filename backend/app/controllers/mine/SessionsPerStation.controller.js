const db = require("../../models");
const sequelize = require("sequelize");
const { Op } = require("sequelize");

//const converter = require('json-2-csv');

//const createCsvStringifier  = require('csv-writer').createObjectCsvStringifier;

const { convertArrayToCSV } = require('convert-array-to-csv');
const converter = require('convert-array-to-csv');

DateFormat = (x) => {
   return x.toISOString().
      replace(/T/, ' ').      // replace T with a space
      replace(/\..+/, '');
}

function int_to_date(x) {
  var temp = x;
  const day = temp % 100;
  temp = Math.floor(temp / 100);
  const month = temp % 100;
  temp = Math.floor(temp / 100);
  const year = temp;

  console.log(day);
  console.log(month);
  console.log(year);
  console.log(DateFormat(new Date(year, month, day, 0, 0, 0)));
  return DateFormat(new Date(year, month, day, 0, 0, 0));
}

exports.SessionsPerStation = (req, res) => {

    // check that req.userId corresponds to an admin_id
    // and check that req.userId is an admin for the req.params.stationID

    db.admin.findOne({
      attributes: ['admin_id'], // to reduce table size
      where: {
        admin_id: req.userId
      },
      include: {
        model: db.station,
        attributes: ['station_id'], // to reduce table size
        where: {
          station_id: req.params.stationID
        }
      }
    })
    .then(something => {
      if (!something) {
        return res.status(401).send({message: "Unauthorized!"});
      }
    })
    .catch(err => {
    res.status(400).send({ message: err.message });
    });

    /*//meta thn allagh tou db
      db.station.findOne({
       where: {
         admin_id: req.userId,
         station_id: req.params.stationID
       }
      })
     .then(something => {
       if (!something) {
         return res.status(401).send({message: "Unauthorized!"});
       }
     })
     .catch(err => {
     res.status(400).send({ message: err.message });
   });*/

   const start_date = int_to_date(req.params.yyyymmdd_from); //?????
   const end_date = int_to_date(req.params.yyyymmdd_to); //?????
   //const start_date = req.params.yyyymmdd_from;
   //const end_date = req.params.yyyymmdd_to;
   //console.log(int_to_date(start_date));
   //console.log(int_to_date(end_date));

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
        //console.log(results);
        var number_of_charging_sessions = 0;
        var total_energy_delivered = 0;
        for (var i in results) {
          number_of_charging_sessions += results[i].PointSessions;
          total_energy_delivered += results[i].EnergyDelivered;
        }
        var finalJson = [];
        finalJson.push({
          StationID: req.params.stationID,
          Operator: req.userId, //auto thelei?
          RequestTimestamp: DateFormat(new Date()),
          PeriodFrom: start_date,
          PeriodTo: end_date,
          TotalEnergyDelivered: total_energy_delivered,
          NumberOfChargingSessions: number_of_charging_sessions,
          NumberOfActivePoints: results.length,
          SessionsSummaryList: results
            /*PointID: ,
            PointSessions: ,
            EnergyDelivered: ,*/
        });
        if(finalJson.length != 0) { // if the answer is non empty
          if (req.query.format == 'csv') { // if the format required is csv
            /*converter.json2csv(finalJson, (err, finalCSV) => {
                if (err) {
                    throw err;
                }
                //console.log(finalCSV);
                res.status(200).send(finalCSV);
            });*/
            /*const csvStringifier = createCsvStringifier({
              header: ['StationID',
              'Operator',
              'RequestTimestamp',
              'PeriodFrom',
              'PeriodTo',
              'TotalEnergyDelivered',
              'NumberOfChargingSessions',
              'NumberOfActivePoints',
              'SessionsSummaryList',
              'PointID',
              'PointSessions',
              'EnergyDelivered'
              ]
            });*/
            const headerCSV = [
              'StationID',
              'Operator',
              'RequestTimestamp',
              'PeriodFrom',
              'PeriodTo',
              'TotalEnergyDelivered',
              'NumberOfChargingSessions',
              'NumberOfActivePoints',
              'SessionsSummaryList',
              'PointID',
              'PointSessions',
              'EnergyDelivered'
            ];
            var dataCSV = [];
            for (var i in results) {
                console.log("\nI AM INSIDE\n");
                dataCSV.push([
                  /*finalJson.StationID,
                  finalJson.Operator, //auto thelei?
                  finalJson.RequestTimestamp,
                  finalJson.PeriodFrom,
                  finalJson.PeriodTo,
                  finalJson.TotalEnergyDelivered,
                  finalJson.NumberOfChargingSessions,
                  finalJson.NumberOfActivePoints,
                  results[i].PointID,
                  results[i].PointSessions,
                  results[i].EnergyDelivered*/
                  req.params.stationID,
                  req.userId, //auto thelei?
                  DateFormat(new Date()),
                  start_date,
                  end_date,
                  total_energy_delivered,
                  number_of_charging_sessions,
                  results.length,
                  results[i].PointID,
                  results[i].PointSessions,
                  results[i].EnergyDelivered
                ])
            }
            //csvWriter.writeRecords(dataCSV).then(finalCSV => {
              //console.log(dataCSV);
              //res.status(200).send(finalCSV);
            //});
            /*console.log(csvStringifier.stringifyRecords(dataCSV));
            res.status(200).send(csvStringifier.stringifyRecords(dataCSV));*/

            //console.log(headerCSV);
            //console.log(dataCSV);
            const finalCSV = convertArrayToCSV(dataCSV, {
              header: headerCSV,
              separator: ','
            });
            console.log(finalCSV);
            res.status(200).send(finalCSV);

          }
          else { // if the format required is json (default)
            res.status(200).send(finalJson);
          }
        }
        else { // if the answer is empty
          res.status(402).send([]);
        }
    })
    .catch(err => {
    res.status(400).send({ message: err.message });
    });
};
