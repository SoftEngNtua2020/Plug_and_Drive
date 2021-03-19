# Back end Server REST Api


![NodeJS](https://img.shields.io/badge/nodeJS-v7.3+-blue.svg)
![Express](https://img.shields.io/badge/express-v4.17.1+-red.svg)
![Sequelize](https://img.shields.io/badge/sequelize-v6.5+-green.svg)
![mysql](https://img.shields.io/badge/mysql-v2.2.5+-blue.svg)
## Overview

- Restfull Api Application, for [Plug&Drive] website. 
- Api URL: [http://pluganddrive.ddns.net:8765](http://pluganddrive.ddns.net:8765)
- All the API Endpoints are described [app/README.md]

## NodeJS Packages
```json
"dependencies": {
    "bcryptjs": "^2.4.3",
    "body-parser": "^1.19.0",
    "chai": "^4.3.3",
    "chai-http": "^4.3.0",
    "convert-array-to-csv": "^2.0.0",
    "cors": "^2.8.5",
    "csvtojson": "^2.0.10",
    "express": "^4.17.1",
    "jsonwebtoken": "^8.5.1",
    "mocha": "^8.3.2",
    "multer": "^1.4.2",
    "mysql2": "^2.2.5",
    "nodemon": "^2.0.7",
    "react-router-dom": "^5.2.0",
    "save": "^2.4.0",
    "semver": "^7.3.4",
    "sequelize": "^6.5.0"
  }
```

## Initializing Database
   1. Start a mysql server
   2. Create a database
   3. Fill the credentials -> /back-end/app/config/db.config.js

## Installation
For a quick installation 

```bash
$ npm install
$ node server.js
```
(The first time running the server uncomment the [lines 98-101 in server.js] file)

## Data
We randomly generated data to test the usage of the server. 
It can be found in folder [data]

## License

MIT



   [Plug&Drive]: http://pluganddrive.ddns.net
   [app/README.md]: https://github.com/SoftEngNtua2020/Plug_and_Drive/blob/master/back-end/app/README.md
   [data]: https://github.com/SoftEngNtua2020/Plug_and_Drive/tree/master/back-end/data
   [lines 98-101 in server.js]: https://github.com/SoftEngNtua2020/Plug_and_Drive/blob/master/back-end/server.js#L101-L104