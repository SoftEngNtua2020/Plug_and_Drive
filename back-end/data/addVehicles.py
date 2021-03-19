import requests
import json
import numpy as np
import pandas as pd
import mysql.connector
mydb = mysql.connector.connect(
    host = "******",
    user = "PnG",
    passwd = "******",
    database = "test6"
)
mycursor = mydb.cursor()
designers = ["Tesla","Anteros","Aurica","Bremach","BXR","Chrysler","CustomCraftedCars","Dodge","ElioMotors","EquusAutomotive","E-Z-GO","Falcon","Faraday","Ford","GeneralMotors","Buick","Cadillac","Chevrolet","GMC","Hennessey","Jeep","Karma","Lincoln","Local","Lucid","Lyons","Niama-Reisser","Panoz","Polaris","Racefab","RamTrucks","Rezvani","Rivian","Rossion","Saleen","ShelbyAmerican","TrionSupercars","Zimmer","Merkur","Mosler","Oakland","Oldsmobile","Packard","Plymouth","Pontiac","Rambler","ReliableDayton","Saturn","Studebaker","Vector","Willys"]
types = ["BEV","PHEV"]
models = [ "B-Class EV","i-MiEV", "Spark EV"," Electric","B250e","i3", "i4","i5","Bolt EV", "Leaf"]
years = np.arange(2008,2021,1)
usable = np.arange(25,250,1)
addbat = np.arange(1,20,1)
cons = np.arange(13,25,0.1)
designer_ids = np.arange(1,8,1)
for i in range(1,51):
   brand = designers[i-1]
   ch_type = np.random.choice(types)
   model = np.random.choice(models)
   release_year = np.random.choice(years)
   usable_battery_size = np.random.choice(usable)
   average_consumption = np.random.choice(cons)
   current_battery_charge = usable_battery_size - np.random.choice(addbat)
   designer_id = np.random.choice(designer_ids)
   owner_id = i
   
   sqlFormula = """INSERT INTO vehicles (brand,type,model,release_year,usable_battery_size,average_consumption,current_battery_charge,designer_id,owner_id) 
                    VALUES ('{}','{}','{}','{}','{}','{}','{}','{}','{}')""".format(brand,ch_type,model,release_year,usable_battery_size,average_consumption,current_battery_charge,designer_id,owner_id)
   mycursor.execute(sqlFormula)
   mydb.commit() #Save Data
