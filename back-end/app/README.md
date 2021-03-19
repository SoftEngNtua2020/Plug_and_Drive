# Rest Api Documentation

## Base URL: https://localhost:8765/evcharge/api
## Okeanos URL: http://pluganddrive.ddns.net:8765/evcharge/api

### Login & Logout
   - Login <br/>
     Πραγματοποιεί το login του χρήστη.
      ```json
      Type: POST,
      URl: http://localhost:8765/evcharge/api/login,
      Headers: {
         "Content-Type": "application/json",
                  },
      Body: {
         "username":"alex13",
         "password":"password13"
         }

      Reply: {
         "id": 13,
         "username": "alex13",
         "email": "myemail13@mydb.com",
         "roles": [
            "ROLE_VEHICLE_OWNER"
         ],
         "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImlhdCI6MTYxNDk2NTc1NSwiZXhwIjoxNjE1MDUyMTU1fQ.tLyuwEf6ZuXugH0nikqoSqK7z_RcjydoGkYGbnKX5Dw"
         }
      ```
   - Logout <br/>
     Πραγματοποιεί το logοut του χρήστη.
      ```json
         Type: POST,
         URl: http://localhost:8765/evcharge/api/logout,
         Headers: {
           "x-observatory-auth": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImlhdCI6MTYxNDg5OTAxMiwiZXhwIjoxNjE0OTg1NDEyfQ.f77pFxPnn053bdv4GyL4Ed97XuwJz_VYM1I85Exbr9w",
                     },
         Reply: 200
         ```
   - Sign Up <br/>
     Πραγματοποιεί το signup του χρήστη.
      ```json
      Type: POST,
         URl: http://localhost:8765/evcharge/api/signup,
         Headers: {
           "Content-Type": "application/json",
                     },
         Body:{
            "username":"abcc",
            "email":"abc@abc.com",
            "password":"123456",
            "roles":["vehicle_owner"]
            }
      Reply: {
            "message": "User was registered successfully!"
            }
      ```

### Admin Endpoints
   1. usermod <br/>
      Πραγματοποιεί προσθήκη νέου χρήστη ή αλλαγή password εάν ο χρήστης υπάρχει ήδη.
      ```json
         Type: POST,
         URL: http://localhost:8765/evcharge/api/admin/usermod/:username/:password,
         Headers: {
           "x-observatory-auth": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImlhdCI6MTYxNDg5OTAxMiwiZXhwIjoxNjE0OTg1NDEyfQ.f77pFxPnn053bdv4GyL4Ed97XuwJz_VYM1I85Exbr9w",
                     },
         Reply: {
            "message": "Created User Successfully"
            }
         ```
   2. users <br/>
      Εμφανίζει τα στοιχεία του αντίστοιχου χρήστη.
      ```json
      Type: GET,
      URL: http://localhost:8765/evcharge/api/admin/users/:username,
      Headers: {
           "x-observatory-auth": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImlhdCI6MTYxNDg5OTAxMiwiZXhwIjoxNjE0OTg1NDEyfQ.f77pFxPnn053bdv4GyL4Ed97XuwJz_VYM1I85Exbr9w",
                     },
      Reply: {
         "st_moderator_id": 2,
         "first_name": "C",
         "last_name": "D",
         "user_id": 18
         }
      ```
   3. sessionsupd <br/>
      Πραγματοποιεί το ανέβασμα αρχείου CSV με δεδομένα γεγονότων φόρτισης και την προσθήκη τους στη βάση δεδομένων.
      ```json
      Type: POST,
      URL: http://localhost:8765/evcharge/api/admin/system/sessionsupd,
      Headers: {
           "x-observatory-auth": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImlhdCI6MTYxNDg5OTAxMiwiZXhwIjoxNjE0OTg1NDEyfQ.f77pFxPnn053bdv4GyL4Ed97XuwJz_VYM1I85Exbr9w",
                     },
      Encoding: multipart/form-data,
      file: path_to_file/import.csv,
      {"file":
         "started_on;finished_on;energy_deliverd;protocol;payment_method;bonus_points_energy;total_cost;vehicle_id;station_id;point_id;program_id
         2021-03-06 17:30:40;2021-03-06 17:40:40;30;AC;CASH;100;60;1;1;1;1
         2021-03-06 18:30:40;2021-03-06 18:40:40;30;AC;CASH;100;60;1;1;1;1"
         }
      Reply: {
            "message": "Uploaded the file successfully: importcsv.csv"
         }
      ```
   4. Πρόσθετα (βοηθητικά) Endpoints
      1. healthcheck <br/>
         Eπιβεβαιώνει την πλήρη συνδεσιμότητα (end-to-end connectivity) μεταξύ του χρήστη και της βάσης δεδομένων.
         ```json
         Type: GET,
         URl: http://localhost:8765/evcharge/api/admin/healthcheck,
         Headers: {
            "x-observatory-auth": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImlhdCI6MTYxNDg5OTAxMiwiZXhwIjoxNjE0OTg1NDEyfQ.f77pFxPnn053bdv4GyL4Ed97XuwJz_VYM1I85Exbr9w",
                  },
         Reply: {
            "status": "200 OK"
         }
         ```

      2. resetsessions <br/>
         Πραγματοποιεί αρχικοποίηση του πίνακα γεγονότων φόρτισης, καθώς και αρχικοποίηση του default διαχειριστικού λογαριασμού.
         ```json
         Type: POST,
         URl: http://localhost:8765/evcharge/api/admin/resetsessions,
         Headers: {
            "x-observatory-auth": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImlhdCI6MTYxNDg5OTAxMiwiZXhwIjoxNjE0OTg1NDEyfQ.f77pFxPnn053bdv4GyL4Ed97XuwJz_VYM1I85Exbr9w",
         },
         Body: {},
         Reply: {
            "status": "OK"
         }
         ```

# Υπόλοιπες Λειτουργίες

1. Ιδιοκτήτες ηλεκτρικών οχημάτων - Φόρτιση
   - F01 <br/>
     Εμφανίζει τα στοιχεία των οχημάτων του ιδιοκτήτη.
      ```json
      Type: GET,
      URl: http://localhost:8765/evcharge/api/getvehicledata,
      Headers: {
         "x-observatory-auth": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImlhdCI6MTYxNDg5OTAxMiwiZXhwIjoxNjE0OTg1NDEyfQ.f77pFxPnn053bdv4GyL4Ed97XuwJz_VYM1I85Exbr9w",
                  },
      Reply: {
         "brand": "BMW",
         "type": "bev",
         "model": "i3",
         "release_year": "2020",
         "usable_battery_size": 18.8,
         "average_consumption": 14.5,
         "current_battery_charge": 12.79,
         "owner_id": 2
      }
      ```
   - F33 <br/>
     Υπολογίζει και εμφανίζει τα αναμενόμενα κόστη φόρτισης με βάση το σταθμό και το πρόγραμμα φόρτισης, για τον ιδιοκτήτη.
      ```json
      Type: GET,
      URl: http://localhost:8765/evcharge/api/getvehiclecostassump,
      Headers: {
         "x-observatory-auth": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImlhdCI6MTYxNDg5OTAxMiwiZXhwIjoxNjE0OTg1NDEyfQ.f77pFxPnn053bdv4GyL4Ed97XuwJz_VYM1I85Exbr9w",
                  },
      Reply: [
         {
            "station_id": 1,
            "program_id": 1,
            "kwh_price": 1.78,
            "bonus_per_kwh": 2.39,
            "total_cost": 3.58,
            "total_bonus": 4.8
         },
         {
            "station_id": 1,
            "program_id": 2,
            "kwh_price": 2.16,
            "bonus_per_kwh": 1.25,
            "total_cost": 4.34,
            "total_bonus": 2.51
         }
      ]
      ```
   - F19 <br/>
     Πραγματοποιεί και εισάγει στη βάση δεδομένων την επιλεγόμενη φόρτιση οχήματος του ιδιοκτήτη.
      ```json
      Type: POST,
      URl: http://localhost:8765/evcharge/api/start_charging,
      Headers: {
         "Content-Type": "application/json",
         "x-observatory-auth": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImlhdCI6MTYxNDg5OTAxMiwiZXhwIjoxNjE0OTg1NDEyfQ.f77pFxPnn053bdv4GyL4Ed97XuwJz_VYM1I85Exbr9w",
      },
      Body: {
         "program_id":1,
         "point_id":1,
         "protocol":"AC",
         "payment_method":"CASH",
         "station_id": 1
        },
      Reply: {
         "total_cost": 24.4,
         "message": "Session was registered successfully!"
         }
      ```
   - F29 <br/>
     Εμφανίζει όλα τα γεγονότα φόρτισης του ιδιοκτήτη.
      ```json
      Type: GET,
      URl: http://localhost:8765/evcharge/api/getvehicleeventdata,
      Headers: {
         "x-observatory-auth": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImlhdCI6MTYxNDg5OTAxMiwiZXhwIjoxNjE0OTg1NDEyfQ.f77pFxPnn053bdv4GyL4Ed97XuwJz_VYM1I85Exbr9w",
                  },
      Reply:[
         {
            "session_id": 2,
            "started_on": "2021-02-20T17:30:40.000Z",
            "finished_on": "2021-02-20T17:40:40.000Z",
            "energy_deliverd": 40,
            "point_id": 5,
            "protocol": "AC",
            "payment_method": "CASH",
            "bonus_points_energy": 120,
            "total_cost": 80,
            "vehicle_id": 2,
            "station_id": 3
         },
         {
            "session_id": 7,
            "started_on": "2020-12-10T11:31:40.000Z",
            "finished_on": "2020-12-10T11:49:50.000Z",
            "energy_deliverd": 60,
            "point_id": 6,
            "protocol": "AC",
            "payment_method": "CREDIT_CARD",
            "bonus_points_energy": 40,
            "total_cost": 50,
            "vehicle_id": 2,
            "station_id": 3
         },
         {
            "session_id": 21,
            "started_on": "2021-03-05T11:07:53.000Z",
            "finished_on": "2021-03-05T11:26:53.000Z",
            "energy_deliverd": 18.01,
            "point_id": 1,
            "protocol": "AC",
            "payment_method": "CASH",
            "bonus_points_energy": 9,
            "total_cost": 36.6,
            "vehicle_id": 2,
            "station_id": 1
         }
      ]
      ```

2. Κατασκευαστές Οχημάτων - Ενημέρωση
    - F05 <br/>
      Εμφανίζει την ενέργεια που καταναλώθηκε ανά κατηγορία οχήματος του κατασκευαστή.
      ```json
      Type: POST,
      URl: http://localhost:8765/evcharge/api/getEnergyConsumedByEVType,
      Headers: {
         "Content-Type": "application/json",
         "x-observatory-auth": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImlhdCI6MTYxNDg5OTAxMiwiZXhwIjoxNjE0OTg1NDEyfQ.f77pFxPnn053bdv4GyL4Ed97XuwJz_VYM1I85Exbr9w",
      },
      Body:
      {
         "start_date": "2020-02-25",
         "end_date": "2021-03-07"
      },
      Reply:
      [
          {
              "VehicleType": "bev",
              "TotalEnergyDelivered": 376.73
          },
          {
              "VehicleType": "aev",
              "TotalEnergyDelivered": 242.44
          }
      ]
      ```
   - F35 <br/>
     Εμφανίζει την ενέργεια που καταναλώθηκε ανά όχημα του κατασκευαστή.
      ```json
      Type: POST,
      URl: http://localhost:8765/evcharge/api/getEnergyConsumedByEV,
      Headers: {
         "Content-Type": "application/json",
         "x-observatory-auth": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImlhdCI6MTYxNDg5OTAxMiwiZXhwIjoxNjE0OTg1NDEyfQ.f77pFxPnn053bdv4GyL4Ed97XuwJz_VYM1I85Exbr9w",
     },
     Body:
     {
       "start_date": "2020-02-25",
       "end_date": "2021-03-07"
     },
     Reply:
     [
        {
            "VehicleID": 1,
            "TotalEnergyDelivered": 376.73
        },
        {
            "VehicleID": 2,
            "TotalEnergyDelivered": 198.59999999999997
        }
     ]
     ```
   - F02 <br/>
     Εμφανίζει τα γεγονότα φόρτισης των οχημάτων του κατασκευαστή.
       ```json
       Type: POST,
       URl: http://localhost:8765/evcharge/api/getChargingEventsByDesigner,
       Headers: {
          "Content-Type": "application/json",
          "x-observatory-auth": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImlhdCI6MTYxNDg5OTAxMiwiZXhwIjoxNjE0OTg1NDEyfQ.f77pFxPnn053bdv4GyL4Ed97XuwJz_VYM1I85Exbr9w",
       },
       Body:
       {
          "start_date": "2020-02-25",
          "end_date": "2021-03-07"
       },
       Reply:
       [
         {
             "session_id": 1,
             "started_on": "2021-02-25T17:30:40.000Z",
             "finished_on": "2021-02-25T17:40:40.000Z",
             "energy_deliverd": 30,
             "protocol": "AC",
             "payment_method": "CASH",
             "bonus_points_energy": 100,
             "total_cost": 60,
             "vehicle_id": 1,
             "station_id": 1,
             "point_id": 1,
             "program_id": 1
       },
       {
             "session_id": 10,
             "started_on": "2020-10-22T07:31:40.000Z",
             "finished_on": "2020-10-22T07:49:50.000Z",
             "energy_deliverd": 70,
             "protocol": "AC",
             "payment_method": "CREDIT_CARD",
             "bonus_points_energy": 100,
             "total_cost": 60,
             "vehicle_id": 1,
             "station_id": 2,
             "point_id": 3,
             "program_id": 3
       }
     ]
     ```

3. Parking - Διαχείριση σημείων φόρτισης

   - Get Station Data <br/>
     Εμφανίζει τα στοιχεία των σταθμών φόρτισης του διαχειριστή.
      ```json
      Type: GET,
      URl: http://localhost:8765/evcharge/api/getStationData,
      Headers: {
         "x-observatory-auth": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImlhdCI6MTYxNDg5OTAxMiwiZXhwIjoxNjE0OTg1NDEyfQ.f77pFxPnn053bdv4GyL4Ed97XuwJz_VYM1I85Exbr9w",
                  },
      Reply:{
         "stations": [
            {
                  "station_id": 4,
                  "location": "Thessaloniki",
                  "company_name": "BP",
                  "phone_number": "2109765527",
                  "st_moderator_id": 4,
                  "provider_id": 4
            },
            {
                  "station_id": 7,
                  "location": "Aboudabi",
                  "company_name": "IKEA",
                  "phone_number": "2100000000",
                  "st_moderator_id": 4,
                  "provider_id": 1
            }
         ],
         "points": [
            {
                  "point_id": 7,
                  "station_id": 4
            },
            {
                  "point_id": 8,
                  "station_id": 4
            },
            {
                  "point_id": 13,
                  "station_id": 7
            },
            {
                  "point_id": 14,
                  "station_id": 7
            }
         ],
         "programs": [
            {
                  "program_id": 7,
                  "program_name": "STANDARD",
                  "kwh_price": 1.432,
                  "bonus_per_kwh": 0.4,
                  "station_id": 4
            },
            {
                  "program_id": 8,
                  "program_name": "DISCOUNT",
                  "kwh_price": 1.332,
                  "bonus_per_kwh": 0.3,
                  "station_id": 4
            }
         ],
         "providers": [
            {
                  "provider_id": 4,
                  "provider_name": "Protergeia",
                  "station_id": 4
            },
            {
                  "provider_id": 1,
                  "provider_name": "DEH",
                  "station_id": 7
            }
         ]
      }
      ```
   - F11 <br/>
     Πραγματοποιεί δημιουργία νέου σταθμού φόρτισης ή μεταβολές σε αυτόν, εφόσον ήδη υπάρχει.
      ```json
      Type: POST,
      URl: http://localhost:8765/evcharge/api/manageStations,
      Headers: {
         "Content-Type": "application/json",
         "x-observatory-auth": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImlhdCI6MTYxNDg5OTAxMiwiZXhwIjoxNjE0OTg1NDEyfQ.f77pFxPnn053bdv4GyL4Ed97XuwJz_VYM1I85Exbr9w",
      },
      Body: {
         "station":{
            "station_id":7,
            "location":"Aboudabi",
            "company_name":"IKEA",
            "phone_number":"2100000000",
            "st_moderator_id":4,
            "provider_id":1
            },
         "point":{
            "point_id": 14,
            "station_id":7
            }
         },
      Reply: {
         "message": "Updated Station and Point"
      }
      ```
   - F31 <br/>
     Πραγματοποιεί δημιουργία νέου προγράμματος φόρτισης ή μεταβολές σε αυτό, εφόσον ήδη υπάρχει.
      ```json
      Type: POST,
         URl: http://localhost:8765/evcharge/api/manageChargingProgram,
         Headers: {
            "Content-Type": "application/json",
            "x-observatory-auth": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImlhdCI6MTYxNDg5OTAxMiwiZXhwIjoxNjE0OTg1NDEyfQ.f77pFxPnn053bdv4GyL4Ed97XuwJz_VYM1I85Exbr9w",
         },
         Body:{
            "program":{
               "program_id":8,
               "program_name":"EXTREME - DISCOUNT",
               "kwh_price":2.121,
               "bonus_per_kwh":0.7,
               "station_id":4
            }
         }
         Reply: {
            "message": "Updated Program with given ID"
         }
      ```

4. Parking - Ενημέρωση
   - F07 = SessionsPerStation <br/>
     Εμφανίζει τα στοιχεία των γεγονότων φόρτισης του σταθμού φόρτισης.
       ```json
       Type: GET,
       URl: http://localhost:8765/evcharge/api/SessionsPerStation/:stationID/:yyyymmdd_from/:yyyymmdd_to
       Headers: {
          "x-observatory-auth": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImlhdCI6MTYxNDg5OTAxMiwiZXhwIjoxNjE0OTg1NDEyfQ.f77pFxPnn053bdv4GyL4Ed97XuwJz_VYM1I85Exbr9w",
                   },
       Reply: {
         "StationID": "2",
         "Operator": "C D",
         "RequestTimestamp": "2021-03-09 23:08:54",
         "PeriodFrom": "2020-01-01",
         "PeriodTo": "2024-01-01",
         "TotalEnergyDelivered": 70,
         "NumberOfChargingSessions": 1,
         "NumberOfActivePoints": 1,
         "SessionsSummaryList": [
             {
                 "PointID": "3",
                 "PointSessions": 1,
                 "EnergyDelivered": 70
             }
         ]
       }
       ```
   - F17 = SessionsPerPoint <br/>
     Εμφανίζει τα στοιχεία των γεγονότων φόρτισης των σημείων του σταθμού φόρτισης.
       ```json
       Type: GET,
       URl: http://localhost:8765/evcharge/api/SessionsPerPoint/:pointID/:yyyymmdd_from/:yyyymmdd_to
       Headers: {
          "x-observatory-auth": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImlhdCI6MTYxNDg5OTAxMiwiZXhwIjoxNjE0OTg1NDEyfQ.f77pFxPnn053bdv4GyL4Ed97XuwJz_VYM1I85Exbr9w",
                   },
       Reply: {
         "Point": "1",
         "PointOperator": "A B",
         "RequestTimestamp": "2021-03-09 23:09:38",
         "PeriodFrom": "2019-01-01",
         "PeriodTo": "2024-01-01",
         "NumberOfChargingSessions": 49,
         "ChargingSessionsList": [
             {
                 "SessionIndex": 1,
                 "SessionID": "1",
                 "StartedOn": "2021-02-25 17:30:40",
                 "FinishedOn": "2021-02-25 17:40:40",
                 "Protocol": "AC",
                 "EnergyDelivered": 30,
                 "Payment": "CASH",
                 "VehicleType": "bev"
             },
             {
                 "SessionIndex": 2,
                 "SessionID": "12",
                 "StartedOn": "2021-03-04 21:52:01",
                 "FinishedOn": "2021-03-04 22:07:01",
                 "Protocol": "AC",
                 "EnergyDelivered": 14.5,
                 "Payment": "CASH",
                 "VehicleType": "bev"
             }
           ]
       }
       ```
   - F23 <br/>
     Εμφανίζει τα στοιχεία των αυτοκίνητων που φόρτιζαν στο σταθμό φόρτισης, κατά το αντίστοιχο διάστημα.
       ```json
       Type: POST,
       URl: http://localhost:8765/evcharge/api/getVehiclesChargingAtTime,
       Headers: {
          "Content-Type": "application/json",
          "x-observatory-auth": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImlhdCI6MTYxNDg5OTAxMiwiZXhwIjoxNjE0OTg1NDEyfQ.f77pFxPnn053bdv4GyL4Ed97XuwJz_VYM1I85Exbr9w",
          },
       Body:
         {
             "start_datetime": "2019-11-11 19:42:17",
             "end_datetime": "2022-08-04 23:59:59"
         },
       Reply:
         [
             {
                 "VehicleID": 2,
                 "VehicleBrand": "BMW",
                 "VehicleType": "bev",
                 "VehicleModel": "i3",
                 "ReleaseYear": "2020",
                 "UsableBatterySize": 18.8,
                 "AverageConsumption": 14.5,
                 "CurrentBatteryCharge": 0.7899999999999991
             },
             {
                 "VehicleID": 1,
                 "VehicleBrand": "Audi",
                 "VehicleType": "bev",
                 "VehicleModel": "e-tron 55",
                 "ReleaseYear": "2019",
                 "UsableBatterySize": 86.5,
                 "AverageConsumption": 23.4,
                 "CurrentBatteryCharge": 86.49
             }
         ]
         ```

5. Ιδιοκτήτες Ηλεκτρικών Οχημάτων - Πληρωμή και ανάλυση εξόδων
   - F07 <br/>
     Εμφανίζει τα κόστη των γεγονότων φόρτισης του ιδιοκτήτη.
      ```json
      Type: GET,
      URl: http://localhost:8765/evcharge/api/getCummulativeCostPerCharge,
      Headers: {
         "x-observatory-auth": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImlhdCI6MTYxNDg5OTAxMiwiZXhwIjoxNjE0OTg1NDEyfQ.f77pFxPnn053bdv4GyL4Ed97XuwJz_VYM1I85Exbr9w",
                  },
      Reply:[
         {
            "session_id": "0",
            "finished_on": "2021-02-20T17:40:40.000Z",
            "total_cost": 80
         },
         {
            "session_id": "1",
            "finished_on": "2020-12-10T11:49:50.000Z",
            "total_cost": 130
         },
         {
            "session_id": "2",
            "finished_on": "2021-03-05T11:26:53.000Z",
            "total_cost": 166.6
         }
      ]
      ```
   - F14 <br/>
     Εμφανίζει το συνολικό κόστος των γεγονότων φόρτισης για το αντίστοιχο διάστημα, για τον ιδιοκτήτη.
      ```json
      Type: POST,
      URl: http://localhost:8765/evcharge/api/getCummulativeCostPerPeriod,
      Headers: {
         "Content-Type": "application/json",
         "x-observatory-auth": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImlhdCI6MTYxNDg5OTAxMiwiZXhwIjoxNjE0OTg1NDEyfQ.f77pFxPnn053bdv4GyL4Ed97XuwJz_VYM1I85Exbr9w",
                  },
      Body:
      {
         "started_date":"2020-02-25",
         "finished_date":"2021-03-07"
      }
      Reply:
      {
         "total_cost": 276.47
      }

      ```   
   - F31 <br/>
     Εμφανίζει τους bonus πόντους του ιδιοκτήτη.
      ```json
      Type: GET,
      URl: http://localhost:8765/evcharge/api/getTotalBonus,
      Headers: {
         "x-observatory-auth": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImlhdCI6MTYxNDg5OTAxMiwiZXhwIjoxNjE0OTg1NDEyfQ.f77pFxPnn053bdv4GyL4Ed97XuwJz_VYM1I85Exbr9w",
                  },
      Reply:
      {
         "bonus_points": 138
      }
      ```
   - F26 <br/>
     Εμφανίζει το συνολικό πλήθος και τη μέθοδο πληρωμών του ιδιοκτήτη.
      ```json
      Type: GET,
      URl: http://localhost:8765/evcharge/api/getTimesPaidCard,
      Headers: {
         "x-observatory-auth": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImlhdCI6MTYxNDg5OTAxMiwiZXhwIjoxNjE0OTg1NDEyfQ.f77pFxPnn053bdv4GyL4Ed97XuwJz_VYM1I85Exbr9w",
                  },
      Reply:{
            "card": 1,
            "cash": 9
      }

      ```