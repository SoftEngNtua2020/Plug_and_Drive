var bcrypt = require("bcryptjs"),
    Sequelize = require("sequelize");
const { user } = require(".");
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
var userObj =  [
    {
		username: 'username',
		password: 'password',
		email: 'email'
	},
	{
		username: 'username',
		password: 'password',
		email: 'email'
	},
	{
		username: 'username',
		password: 'password',
		email: 'email'
	},
	{
		username: 'username',
		password: 'password',
		email: 'email'
	},
	{
		username: 'username',
		password: 'password',
		email: 'email'
	},
	{
		username: 'username',
		password: 'password',
		email: 'email'
	},
	{
		username: 'username',
		password: 'password',
		email: 'email'
	},
	{
		username: 'username',
		password: 'password',
		email: 'email'
	},
	{
		username: 'username',
		password: 'password',
		email: 'email'
	},
	{
		username: 'username',
		password: 'password',
		email: 'email'
	},
	{
		username: 'username',
		password: 'password',
		email: 'email'
	},
	{
		username: 'username',
		password: 'password',
		email: 'olivrt@gmail.com'
	},
	{
		username: 'username',
		password: 'password',
		email: 'scherrett4@paginegialle.it'
	},
	{
		username: 'username',
		password: 'password',
		email: 'ebrunnen1k@a8.net',
	},
	{
		username: 'username',
		password: 'password',
		email: 'lcarnie27@soup.io'
	},
	{
		username: 'username',
		password: 'password',
		email: 'wstelli2u@hp.com'
	},
	{
		username: 'username',
		password: 'password',
		email: 'email'
	},
	{
		username: 'username',
		password: 'password',
		email: 'email'
	},
	{
		username: 'username',
		password: 'password',
		email: 'email'
	},
	{
		username: 'username',
		password: 'password',
		email: 'email'
	},
	{
		username: 'username',
		password: 'password',
		email: 'email'
	},
	{
		username: 'username',
		password: 'password',
		email: 'email'
	}
]

var adminObj =  [

    {
        first_name: 'Alexander',
        last_name : 'Kyriakakis',
		user_id: 1
    },
    {
    	first_name: 'Ian',
    	last_name: 'Alexopoulos',
		user_id: 2
    },
    {
    	first_name: 'Konstantinos',
    	last_name: 'Kopsinis',
		user_id: 3
    },
    {
    	first_name: 'Nick',
    	last_name: 'Kostas',
		user_id: 4
    },
    {
    	first_name: 'George',
    	last_name: 'Paraksevopoulos',
		user_id: 5
    },
    {
    	first_name: 'Lefteris',
    	last_name: 'Komvopoulos',
		user_id: 6
    }
]

var vehicle_designerObj = [
	{
		designer_name: 'Nissan',
		user_id: 7
	},
	{
		designer_name: 'Tesla',
		user_id: 8
	},
	{
		designer_name: 'BAIC',
		user_id: 9
	},
	{
		designer_name: 'Zotye',
		user_id: 10
	},
	{
		designer_name:'ZD',
		user_id: 11
	}
]

var vehicle_ownerObj = [

	{
		first_name: 'Olivia',
		last_name: 'Stewart',
		phone_Number: '959-260-7314',
		birth_date:'1985-12-05',
		bonus_points: 100,
		user_id: 12
	},
	{
		first_name: 'Sherman',
		last_name: 'Cherrett',
		phone_Number: '594-336-8901',
		birth_date:'1995-09-06',
		bonus_points: 120,
		user_id: 13
	},
	{
		first_name: 'Ema',
		last_name: 'Brunnen',
		phone_Number: '806-899-7920',
		birth_date:'1995-05-28',
		bonus_points: 130,
		user_id: 14
	},
	{
		first_name: 'Lulita',
		last_name: 'Carnie',
		phone_Number: '191-170-7039',
		birth_date:'1973-06-14',
		bonus_points: 105,
		user_id: 15
	},
	{
		first_name: 'Wenda',
		last_name: 'Stelli',
		phone_Number: '267-514-5977',
		birth_date:'1998-06-17',
		bonus_points: 152,
		user_id: 16
	}
]

var station_moderatorObj =  [

    {
        first_name: 'A',
        last_name : 'B',
		user_id: 17
    },
    {
    	first_name: 'C',
    	last_name: 'D',
		user_id: 18
    },
    {
    	first_name: 'E',
    	last_name: 'F',
		user_id: 19
    },
    {
    	first_name: 'G',
    	last_name: 'H',
		user_id: 20
    },
    {
    	first_name: 'I',
    	last_name: 'J',
		user_id: 21
    },
    {
    	first_name: 'J',
    	last_name: 'K',
		user_id: 22
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
		st_moderator_id: 1,
		provider_id: 1
	},
	{
		location: 'Thessaloniki',
		company_name: 'Shell',
		phone_number: '2109765817',
		st_moderator_id: 2,
		provider_id: 2
	},
	{
		location: 'Larisa',
		company_name: 'EKO',
		phone_number: '2105915817',
		st_moderator_id: 3,
		provider_id: 3
	},
	{
		location: 'Thessaloniki',
		company_name: 'BP',
		phone_number: '2109765527',
		st_moderator_id: 4,
		provider_id: 4
	},
	{
		location: 'Athina',
		company_name: 'IKEA',
		phone_number: '2109709817',
		st_moderator_id: 5,
		provider_id: 1
	},
	{
		location: 'Athina',
		company_name: 'IKEA',
		phone_number: '2109700001',
		st_moderator_id: 6,
		provider_id: 2
	}
]


var sessionObj = [
	{
		started_on: '2021-02-25 19:30:40',
		finished_on: '2021-02-25 19:40:40',
		energy_deliverd: 30,
		protocol: 'AC',
		payment_method: 'CASH',
		bonus_points_energy: 100,
		total_cost: 60,
		vehicle_id: 1,
		station_id: 1,
		point_id: 1,
		program_id: 1
	},
	{
		started_on: '2021-02-20 19:30:40',
		finished_on: '2021-02-20 19:40:40',
		energy_deliverd: 40,
		protocol: 'AC',
		payment_method: 'CASH',
		bonus_points_energy: 120,
		total_cost: 80,
		vehicle_id: 2,
		station_id: 3,
		point_id: 5,
		program_id: 5
	},
	{
		started_on: '2021-01-25 19:30:40',
		finished_on: '2021-01-25 19:40:40',
		energy_deliverd: 50,
		protocol: 'DC',
		payment_method: 'CASH',
		bonus_points_energy: 70,
		total_cost: 65,
		vehicle_id: 3,
		station_id: 6,
		point_id: 11,
		program_id: 11
	},
	{
		started_on: '2021-01-22 12:31:40',
		finished_on: '2021-01-22 12:47:50',
		energy_deliverd: 36,
		protocol: 'DC',
		payment_method: 'CREDIT_CARD',
		bonus_points_energy: 90,
		total_cost: 90,
		vehicle_id: 4,
		station_id: 5,
		point_id: 9,
		program_id: 9
	},
	{
		started_on: '2021-01-07 09:10:40',
		finished_on: '2021-01-07 09:23:33',
		energy_deliverd: 60,
		protocol: 'AC',
		payment_method: 'CREDIT_CARD',
		bonus_points_energy: 40,
		total_cost: 50,
		vehicle_id: 4,
		station_id: 3,
		point_id: 6,
		program_id: 6
	},
	{
		started_on: '2020-12-25 12:31:40',
		finished_on: '2020-12-25 12:49:50',
		energy_deliverd: 54,
		protocol: 'DC',
		payment_method: 'CREDIT_CARD',
		bonus_points_energy: 100,
		total_cost: 70,
		vehicle_id: 5,
		station_id: 3,
		point_id: 5,
		program_id: 5
	},
	{
		started_on: '2020-12-10 13:31:40',
		finished_on: '2020-12-10 13:49:50',
		energy_deliverd: 60,
		protocol: 'AC',
		payment_method: 'CREDIT_CARD',
		bonus_points_energy: 40,
		total_cost: 50,
		vehicle_id: 2,
		station_id: 3,
		point_id: 6,
		program_id: 6
	},
	{
		started_on: '2020-11-22 08:31:40',
		finished_on: '2020-11-22 08:49:50',
		energy_deliverd: 70,
		protocol: 'AC',
		payment_method: 'CREDIT_CARD',
		bonus_points_energy: 100,
		total_cost: 60,
		vehicle_id: 4,
		station_id: 6,
		point_id: 12,
		program_id: 12
	},
	{
		started_on: '2020-12-10 13:31:40',
		finished_on: '2020-12-10 13:49:50',
		energy_deliverd: 70,
		protocol: 'AC',
		payment_method: 'CASH',
		bonus_points_energy: 40,
		total_cost: 50,
		vehicle_id: 4,
		station_id: 6,
		point_id: 11,
		program_id: 11
	},
	{
		started_on: '2020-10-22 10:31:40',
		finished_on: '2020-10-22 10:49:50',
		energy_deliverd: 70,
		protocol: 'AC',
		payment_method: 'CREDIT_CARD',
		bonus_points_energy: 100,
		total_cost: 60,
		vehicle_id: 1,
		station_id: 2,
		point_id: 3,
		program_id: 3
	},
	{
		started_on: '2020-12-10 13:31:40',
		finished_on: '2020-12-10 13:49:50',
		energy_deliverd: 70,
		protocol: 'AC',
		payment_method: 'CREDIT_CARD',
		bonus_points_energy: 45,
		total_cost: 60,
		vehicle_id: 3,
		station_id: 4,
		point_id: 2,
		program_id: 2
	}
]

var programObj = [
    {
        kwh_price: 2.032,
        program_name: 'STANDARD',
        bonus_per_kwh: 0.5,
        station_id: 1
    },
    {
        kwh_price: 1.862,
        program_name: 'DISCOUNT',
        bonus_per_kwh: 0.5,
        station_id: 1
    },
    {
        kwh_price: 3.542,
        program_name: 'STANDARD',
        bonus_per_kwh: 0.8,
        station_id: 2
    },
    {
        kwh_price: 2.902,
        program_name: 'DISCOUNT',
        bonus_per_kwh: 0.8,
        station_id: 2
    },
    {
        kwh_price: 2.403,
        program_name: 'STANDARD',
        bonus_per_kwh: 0.6,
        station_id: 3
    },
    {
        kwh_price: 2.031,
        program_name: 'DISCOUNT',
        bonus_per_kwh: 0.6,
        station_id: 3
    },
    {
        kwh_price: 1.432,
        program_name: 'STANDARD',
        bonus_per_kwh: 0.4,
        station_id: 4
    },
    {
        kwh_price: 1.332,
        program_name: 'DISCOUNT',
        bonus_per_kwh: 0.3,
        station_id: 4
    },
    {
        kwh_price: 3.111,
        program_name: 'STANDARD',
        bonus_per_kwh: 1.1,
        station_id: 5
    },
    {
        kwh_price: 2.643,
        program_name: 'DISCOUNT',
        bonus_per_kwh: 1.1,
        station_id: 5
    },
    {
        kwh_price: 2.542,
        program_name: 'STANDARD',
        bonus_per_kwh: 0.7,
        station_id: 6
    },
    {
        kwh_price: 2.121,
        program_name: 'DISCOUNT',
        bonus_per_kwh: 0.7,
        station_id: 6
    }
]

var pointObj = [
	{
		station_id: 1
	},
	{
		station_id: 1
	},
	{
		station_id: 2
	},
	{
		station_id: 2
	},
	{
		station_id: 3
	},
	{
		station_id: 3
	},
	{
		station_id: 4
	},
	{
		station_id: 4
	},
	{
		station_id: 5
	},
	{
		station_id: 5
	},
	{
		station_id: 6
	},
	{
		station_id: 6
	}
]

var providerObj = [
	{
		provider_name: 'DEH',
	},
	{
		provider_name: 'Heron',
	},
	{
		provider_name: 'Elpedison',
	},
	{
		provider_name: 'Protergeia',
	}
]

module.exports = {
 	admins: adminObj,
 	designers: vehicle_designerObj,
 	owners: vehicle_ownerObj,
	sessions: sessionObj,
	st_moderators: station_moderatorObj,
	stations: stationObj,
 	vehicles: vehicleObj,
	points: pointObj,
 	programs: programObj,
	providers: providerObj,
	users: userObj
}
