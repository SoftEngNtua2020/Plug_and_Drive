# Rest Api Documentation

## Base URL: http://localhost:8765/evcharge/api
## Okeanos URL: http://pluganddrive.ddns.net:8765/evcharge/api

### Login & Logout
   - Login
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
   - Logout
      ```json
         Type: POST,
         URl: http://localhost:8765/evcharge/api/logout,
         Headers: {
           "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImlhdCI6MTYxNDg5OTAxMiwiZXhwIjoxNjE0OTg1NDEyfQ.f77pFxPnn053bdv4GyL4Ed97XuwJz_VYM1I85Exbr9w",
                     },
         Reply: 200
         ```
   - Sign Up
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
   1. 
      ```json
         Type: POST,
         URL: http://localhost:8765/evcharge/api/admin/usermod/:username/:password,
         Headers: {
           "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImlhdCI6MTYxNDg5OTAxMiwiZXhwIjoxNjE0OTg1NDEyfQ.f77pFxPnn053bdv4GyL4Ed97XuwJz_VYM1I85Exbr9w",
                     },
         Reply: {
            "message": "Created User Successfully"
            }
         ```
   2. 
      ```json
      Type: GET,
      URL: http://localhost:8765/evcharge/api/admin/users/:username,
      Headers: {
           "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImlhdCI6MTYxNDg5OTAxMiwiZXhwIjoxNjE0OTg1NDEyfQ.f77pFxPnn053bdv4GyL4Ed97XuwJz_VYM1I85Exbr9w",
                     },
      Reply: {
         "st_moderator_id": 2,
         "first_name": "C",
         "last_name": "D",
         "user_id": 18
         }
      ```
   3. 
      ```json
      Type: POST,
      URL: http://localhost:8765/evcharge/api/admin/system/sessionsupd,
      Headers: {
           "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImlhdCI6MTYxNDg5OTAxMiwiZXhwIjoxNjE0OTg1NDEyfQ.f77pFxPnn053bdv4GyL4Ed97XuwJz_VYM1I85Exbr9w",
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
      1. healthcheck
         ```json
         Type: GET,
         URl: http://localhost:8765/evcharge/api/admin/healthcheck,
         Headers: {
            "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImlhdCI6MTYxNDg5OTAxMiwiZXhwIjoxNjE0OTg1NDEyfQ.f77pFxPnn053bdv4GyL4Ed97XuwJz_VYM1I85Exbr9w",
                  },
         Reply: {
            "status": "200 OK"
         }
         ```

      2. resetsessions
         ```json
         {}
         ```

# Υπόλοιπες Λειτουργίες

1. Ιδιοκτήτες ηλεκτρικών οχημάτων - Φόρτιση
   - F01
      ```json
      Type: GET,
      URl: http://localhost:8765/evcharge/api/getvehicledata,
      Headers: {
         "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImlhdCI6MTYxNDg5OTAxMiwiZXhwIjoxNjE0OTg1NDEyfQ.f77pFxPnn053bdv4GyL4Ed97XuwJz_VYM1I85Exbr9w",
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
   - F33
      ```json
      Type: GET,
      URl: http://localhost:8765/evcharge/api/getvehiclecostassump,
      Headers: {
         "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImlhdCI6MTYxNDg5OTAxMiwiZXhwIjoxNjE0OTg1NDEyfQ.f77pFxPnn053bdv4GyL4Ed97XuwJz_VYM1I85Exbr9w",
                  },
      Reply: [
         {
            "station_id": 5,
            "total_cost": 15.88,
            "total_bonus": 6.61
         },
         {
            "station_id": 6,
            "total_cost": 15.28,
            "total_bonus": 4.21
         },
         {
            "station_id": 6,
            "total_cost": 12.75,
            "total_bonus": 4.21
         }
      ]
      ```
   - F19 
      ```json
      Type: POST,
      URl: http://localhost:8765/evcharge/api/start_charging,
      Headers: {
         "Content-Type": "application/json",
         "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImlhdCI6MTYxNDg5OTAxMiwiZXhwIjoxNjE0OTg1NDEyfQ.f77pFxPnn053bdv4GyL4Ed97XuwJz_VYM1I85Exbr9w",
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
   - F29
      ```json
      Type: GET,
      URl: http://localhost:8765/evcharge/api/getvehicleeventdata,
      Headers: {
         "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImlhdCI6MTYxNDg5OTAxMiwiZXhwIjoxNjE0OTg1NDEyfQ.f77pFxPnn053bdv4GyL4Ed97XuwJz_VYM1I85Exbr9w",
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
3. Parking - Διαχείριση σημείων φόρτισης

   - Get Station Data
      ```json
      Type: GET,
      URl: http://localhost:8765/evcharge/api/getStationData,
      Headers: {
         "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImlhdCI6MTYxNDg5OTAxMiwiZXhwIjoxNjE0OTg1NDEyfQ.f77pFxPnn053bdv4GyL4Ed97XuwJz_VYM1I85Exbr9w",
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
   - F11
      ```json
      Type: POST,
      URl: http://localhost:8765/evcharge/api/manageStations,
      Headers: {
         "Content-Type": "application/json",
         "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImlhdCI6MTYxNDg5OTAxMiwiZXhwIjoxNjE0OTg1NDEyfQ.f77pFxPnn053bdv4GyL4Ed97XuwJz_VYM1I85Exbr9w",
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
   - F31
      ```json
      Type: POST,
         URl: http://localhost:8765/evcharge/api/manageChargingProgram,
         Headers: {
            "Content-Type": "application/json",
            "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImlhdCI6MTYxNDg5OTAxMiwiZXhwIjoxNjE0OTg1NDEyfQ.f77pFxPnn053bdv4GyL4Ed97XuwJz_VYM1I85Exbr9w",
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
5. Ιδιοκτήτες Ηλεκτρικών Οχημάτων - Πληρωμή και ανάλυση εξόδων 
   - F07
      ```json
      Type: GET,
      URl: http://localhost:8765/evcharge/api/getCummulativeCostPerCharge,
      Headers: {
         "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImlhdCI6MTYxNDg5OTAxMiwiZXhwIjoxNjE0OTg1NDEyfQ.f77pFxPnn053bdv4GyL4Ed97XuwJz_VYM1I85Exbr9w",
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
   - F14
      ```json
      Type: POST,
      URl: http://localhost:8765/evcharge/api/getCummulativeCostPerPeriod,
      Headers: {
         "Content-Type": "application/json",
         "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImlhdCI6MTYxNDg5OTAxMiwiZXhwIjoxNjE0OTg1NDEyfQ.f77pFxPnn053bdv4GyL4Ed97XuwJz_VYM1I85Exbr9w",
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
   - F31
      ```json
      Type: GET,
      URl: http://localhost:8765/evcharge/api/getTotalBonus,
      Headers: {
         "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImlhdCI6MTYxNDg5OTAxMiwiZXhwIjoxNjE0OTg1NDEyfQ.f77pFxPnn053bdv4GyL4Ed97XuwJz_VYM1I85Exbr9w",
                  },
      Reply:
      {
         "bonus_points": 138
      }
      ```
   - F26
      ```json
      Type: GET,
      URl: http://localhost:8765/evcharge/api/getTimesPaidCard,
      Headers: {
         "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImlhdCI6MTYxNDg5OTAxMiwiZXhwIjoxNjE0OTg1NDEyfQ.f77pFxPnn053bdv4GyL4Ed97XuwJz_VYM1I85Exbr9w",
                  },
      Reply:{
            "card": 1,
            "cash": 9
      }
      
      ```