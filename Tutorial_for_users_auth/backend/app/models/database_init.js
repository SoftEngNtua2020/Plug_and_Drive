var bcrypt = require("bcryptjs"),
    Sequelize = require("sequelize");
//--------------------------shops---------------------------------    
/*
var adminObj =  [

    {
        first_name: 'ΑΛΕΞΑΝΔΡΟΣ',
        last_name : 'ΚΥΡΙΑΚΑΚΗΣ'
    },
    {
    	first_name: 'ΓΙΑΝΝΗΣ',
    	last_name: 'ΑΛΕΞΟΠΟΥΛΟΣ'
    },
    {
    	first_name: 'ΚΩΝΣΤΑΝΤΙΝΟΣ',
    	last_name: 'ΚΟΨΙΝΗΣ'
    },
    {
    	first_name: 'ΝΙΚΟΣ',
    	last_name: 'ΚΩΣΤΑΣ'
    },
    {
    	first_name: 'ΓΙΩΡΓΟΣ',
    	last_name: 'ΠΑΡΑΣΚΕΥΟΠΟΥΛΟΣ'
    },
    {
    	first_name: 'ΛΕΥΤΕΡΗΣ',
    	last_name: 'ΚΟΜΒΟΠΟΥΛΟΣ'
    }

]
*/

var adminObj =  [

    {
        first_name: 'Alexander',
        last_name : 'Kyriakakis'
    },
    {
    	first_name: 'Ian',
    	last_name: 'Alexopoulos'
    },
    {
    	first_name: 'Konstantinos',
    	last_name: 'Kopsinis'
    },
    {
    	first_name: 'Nick',
    	last_name: 'Kostas'
    },
    {
    	first_name: 'George',
    	last_name: 'Paraksevopoulos'
    },
    {
    	first_name: 'Lefteris',
    	last_name: 'Komvopoulos'
    }

]

var vehicle_designerObj = [
	{
		designer_name: 'Nissan'
	},
	{
		designer_name: 'Tesla'
	},
	{
		designer_name: 'BAIC'
	},
	{
		designer_name: 'Zotye'
	},
	{
		designer_name:'ZD'
	}
]

var vehicle_ownerObj = [

	{
		first_name: 'Olivia',
		last_name: 'Stewart',
		phone_Number: '959-260-7314',
		email: 'olivrt@gmail.com',
		birth_date:'1985-12-05'
	},
	{
		first_name: 'Sherman',
		last_name: 'Cherrett',
		phone_Number: '594-336-8901',
		email: 'scherrett4@paginegialle.it',
		birth_date:'1995-09-06'
	},
	{
		first_name: 'Ema',
		last_name: 'Brunnen',
		phone_Number: '806-899-7920',
		email: 'ebrunnen1k@a8.net',
		birth_date:'1995-05-28'
	},
	{
		first_name: 'Lulita',
		last_name: 'Carnie',
		phone_Number: '191-170-7039',
		email: 'lcarnie27@soup.io',
		birth_date:'1973-06-14'
	},
	{
		first_name: 'Wenda',
		last_name: 'Stelli',
		phone_Number: '267-514-5977',
		email: 'wstelli2u@hp.com',
		birth_date:'1998-06-17'
	}
]


var vehicleObj = [
	{
		brand: 'Audi',
		type: 'bev' ,
		model: 'e-tron 55',
		release_year: 2019,
		usable_battery_size: 86.5,
		average_consumption: 23.4,
		current_battery_charge: 12.3,
		designer_id: 1,
		owner_id: 1

	},
	{
		brand: 'BMW',
		type: 'bev' ,
		model: 'i3',
		release_year: 2020,
		usable_battery_size: 18.8,
		average_consumption: 14.5,
		current_battery_charge: 6.3,
		designer_id: 2,
		owner_id: 2

	},
	{
		brand: 'Fiat',
		type: 'bev' ,
		model: '500e',
		release_year: 2020,
		usable_battery_size: 42.0,
		average_consumption: 16.8,
		current_battery_charge: 32.4,
		designer_id: 3,
		owner_id: 3

	},
	{
		brand: 'Ford',
		type: 'bev' ,
		model: 'Focus electric',
		release_year: 2017,
		usable_battery_size: 33.5,
		average_consumption: 16.4,
		current_battery_charge: 9.42,
		designer_id: 4,
		owner_id: 4

	},
	{
		brand: 'Hyundai',
		type: 'bev' ,
		model: 'Ioniq',
		release_year: 2016,
		usable_battery_size: 28.0,
		average_consumption: 14.4,
		current_battery_charge: 9.6,
		designer_id: 5,
		owner_id: 5

	}	
]
var stationObj = [
	{
		location: 'Athina',
		company_name: 'Shell',
		phone_number: '2109375817',
		number_of_spaces: 3 
	},
	{
		location: 'Thessaloniki',
		company_name: 'Shell',
		phone_number: '2109765817',
		number_of_spaces: 3 
	},
	{
		location: 'Larisa',
		company_name: 'EKO',
		phone_number: '2105915817',
		number_of_spaces: 3 
	},
	{
		location: 'Thessaloniki',
		company_name: 'BP',
		phone_number: '2109765527',
		number_of_spaces: 3 
	},
	{
		location: 'Athina',
		company_name: 'IKEA',
		phone_number: '2109709817',
		number_of_spaces: 3
	},
	{
		location: 'Athina',
		company_name: 'IKEA',
		phone_number: '2109700001',
		number_of_spaces: 3
	}
]


var sessionObj = [
	{
		started_on: '2021-02-25 19:30:40',
		finished_on: '2021-02-25 19:40:40',
		energy_deliverd: 30, 
		point_id: 1,
		protocol: 'AC',
		payment_method: 'CASH',
		bonus_points_energy: 100,
		total_cost: 60,
		vehicle_id: 1,
		station_id: 1
	},
	{
		started_on: '2021-02-20 19:30:40',
		finished_on: '2021-02-20 19:40:40',
		energy_deliverd: 40, 
		point_id: 1,
		protocol: 'AC',
		payment_method: 'CASH',
		bonus_points_energy: 120,
		total_cost: 80,
		vehicle_id: 2,
		station_id: 3
	},
	{
		started_on: '2021-01-25 19:30:40',
		finished_on: '2021-01-25 19:40:40',
		energy_deliverd: 50, 
		point_id: 2,
		protocol: 'DC',
		payment_method: 'CASH',
		bonus_points_energy: 70,
		total_cost: 65,
		vehicle_id: 3,
		station_id: 6
	},
	{
		started_on: '2021-01-22 12:31:40',
		finished_on: '2021-01-22 12:47:50',
		energy_deliverd: 36, 
		point_id: 3,
		protocol: 'DC',
		payment_method: 'CREDIT_CARD',
		bonus_points_energy: 90,
		total_cost: 90,
		vehicle_id: 4,
		station_id: 5
	},
	{
		started_on: '2021-01-07 09:10:40',
		finished_on: '2021-01-07 09:23:33',
		energy_deliverd: 60, 
		point_id: 3,
		protocol: 'AC',
		payment_method: 'CREDIT_CARD',
		bonus_points_energy: 40,
		total_cost: 50,
		vehicle_id: 4,
		station_id: 3
	},
	{
		started_on: '2020-12-25 12:31:40',
		finished_on: '2020-12-25 12:49:50',
		energy_deliverd: 54, 
		point_id: 2,
		protocol: 'DC',
		payment_method: 'CREDIT_CARD',
		bonus_points_energy: 100,
		total_cost: 70,
		vehicle_id: 5,
		station_id: 3
	},
	{
		started_on: '2020-12-10 13:31:40',
		finished_on: '2020-12-10 13:49:50',
		energy_deliverd: 60, 
		point_id: 3,
		protocol: 'AC',
		payment_method: 'CREDIT_CARD',
		bonus_points_energy: 40,
		total_cost: 50,
		vehicle_id: 2,
		station_id: 3
	},
	{
		started_on: '2020-11-22 08:31:40',
		finished_on: '2020-11-22 08:49:50',
		energy_deliverd: 70, 
		point_id: 1,
		protocol: 'AC',
		payment_method: 'CREDIT_CARD',
		bonus_points_energy: 100,
		total_cost: 60,
		vehicle_id: 4,
		station_id: 6
	},
	{
		started_on: '2020-12-10 13:31:40',
		finished_on: '2020-12-10 13:49:50',
		energy_deliverd: 70, 
		point_id: 2,
		protocol: 'AC',
		payment_method: 'CASH',
		bonus_points_energy: 40,
		total_cost: 50,
		vehicle_id: 4,
		station_id: 6
	}
]
module.exports = {
 	admins: adminObj,
 	designers: vehicle_designerObj,
 	owners: vehicle_ownerObj,
	session: sessionObj,
	station: stationObj,
 	vehicles: vehicleObj	 
}