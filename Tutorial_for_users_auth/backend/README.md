# Rest Api Documentation

## Base URL: https://localhost:8765/evcharge/api

1. Ιδιοκτήτες ηλεκτρικών οχημάτων - Φόρτιση
   - F01
   ```json
      Type: GET,
      URl: http://localhost:8765/evcharge/api/getvehicledata,
      Headers: {
         x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImlhdCI6MTYxNDg5OTAxMiwiZXhwIjoxNjE0OTg1NDEyfQ.f77pFxPnn053bdv4GyL4Ed97XuwJz_VYM1I85Exbr9w,
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
         x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImlhdCI6MTYxNDg5OTAxMiwiZXhwIjoxNjE0OTg1NDEyfQ.f77pFxPnn053bdv4GyL4Ed97XuwJz_VYM1I85Exbr9w,
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
         Content-Type: application/json,
         x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImlhdCI6MTYxNDg5OTAxMiwiZXhwIjoxNjE0OTg1NDEyfQ.f77pFxPnn053bdv4GyL4Ed97XuwJz_VYM1I85Exbr9w,
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
         x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImlhdCI6MTYxNDg5OTAxMiwiZXhwIjoxNjE0OTg1NDEyfQ.f77pFxPnn053bdv4GyL4Ed97XuwJz_VYM1I85Exbr9w,
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
5. Ιδιοκτήτες Ηλεκτρικών Οχημάτων - Πληρωμή και ανάλυση εξόδων 
   - F07
      ```json
      Type: GET,
      URl: http://localhost:8765/evcharge/api/getCummulativeCostPerCharge,
      Headers: {
         x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImlhdCI6MTYxNDg5OTAxMiwiZXhwIjoxNjE0OTg1NDEyfQ.f77pFxPnn053bdv4GyL4Ed97XuwJz_VYM1I85Exbr9w,
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
         Content-Type: application/json,
         x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImlhdCI6MTYxNDg5OTAxMiwiZXhwIjoxNjE0OTg1NDEyfQ.f77pFxPnn053bdv4GyL4Ed97XuwJz_VYM1I85Exbr9w,
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
         x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImlhdCI6MTYxNDg5OTAxMiwiZXhwIjoxNjE0OTg1NDEyfQ.f77pFxPnn053bdv4GyL4Ed97XuwJz_VYM1I85Exbr9w,
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
         x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImlhdCI6MTYxNDg5OTAxMiwiZXhwIjoxNjE0OTg1NDEyfQ.f77pFxPnn053bdv4GyL4Ed97XuwJz_VYM1I85Exbr9w,
                  },
      Reply:{
            "card": 1,
            "cash": 9
      }
      
   ```