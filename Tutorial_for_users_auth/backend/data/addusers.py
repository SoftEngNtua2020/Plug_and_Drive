import requests
import json
import numpy as np
import pandas as pd
import mysql.connector
mydb = mysql.connector.connect(
    host = "snf-17690.ok-kno.grnetcloud.net",
    user = "PnG",
    passwd = "alexander",
    database = "test1"
)
mycursor = mydb.cursor()
People = pd.read_csv("./people.csv")

def signup(username, password, email, role):
    #url = 'https://localhost:8765/evcharge/api/login'
    url = 'http://localhost:8765/evcharge/api/auth/signup'
    info = {"username": username, "password": password, "email": email, "roles": [role]}
    info =  json.dumps(info)
    headers = {'Content-Type' : 'application/json'}
    res = requests.post(url, data=info, headers=headers)
    print(res.status_code)
    return True
"""
for i in range(7,10):
    signup("alex" + str(i), "password" + str(i), "myemail"+str(i)+"@mydb.com" , "admin")
"""

"""
roles = ["admin", "vehicle_designer", "vehicle_owner", "station_admin"]
print(People["first_name"][0].replace("'","").replace('"',""))
print(People["email"][0])
"""
# ADMINS
for i in range(1,51):
    first_name = People["first_name"][i].replace("'","").replace('"',"")
    last_name = People["last_name"][i].replace("'","").replace('"',"")    
    signup(first_name, "password" + str(i), People["email"][i] , "admin")
    
    sqlFormula = """INSERT INTO admins (first_name,last_name,user_id) 
                    VALUES ('{}','{}','{}')""".format(first_name,last_name,i)
    mycursor.execute(sqlFormula)
    mydb.commit() #Save Data

designers = ["Tesla","Anteros","Aurica","Bremach","BXR","Chrysler","CustomCraftedCars","Dodge","ElioMotors","EquusAutomotive","E-Z-GO","Falcon","Faraday","Ford","GeneralMotors","Buick","Cadillac","Chevrolet","GMC","Hennessey","Jeep","Karma","Lincoln","Local","Lucid","Lyons","Niama-Reisser","Panoz","Polaris","Racefab","RamTrucks","Rezvani","Rivian","Rossion","Saleen","ShelbyAmerican","TrionSupercars","Zimmer","Merkur","Mosler","Oakland","Oldsmobile","Packard","Plymouth","Pontiac","Rambler","ReliableDayton","Saturn","Studebaker","Vector","Willys"]
j = 0
# Designers
for i in range(51,101):
    first_name = People["first_name"][i].replace("'","").replace('"',"")
    signup(first_name, "password" + str(i), People["email"][i] , "vehicle_designer")
    
    sqlFormula = """INSERT INTO designers (designer_name,user_id) 
                    VALUES ('{}','{}')""".format(designers[j],i)
    mycursor.execute(sqlFormula)
    mydb.commit() #Save Data
    j += 1
j=0
bonus = np.arange(1,100,1)
for i in range(101,151):
    first_name = People["first_name"][i].replace("'","").replace('"',"")
    last_name = People["last_name"][i].replace("'","").replace('"',"")   
    phone_number = People["ssn"][i].replace("-","")
    birth_date = People["birth"][i]
    bonus_points = np.random.choice(bonus)
    signup(first_name, "password" + str(i), People["email"][i] , "vehicle_owner")
    sqlFormula = """INSERT INTO vehicle_owner (first_name,last_name,phone_Number,birth_date,bonus_points,user_id) 
                    VALUES ('{}','{}','{}','{}','{}','{}')""".format(first_name,last_name,phone_number,birth_date,bonus_points,i)
    mycursor.execute(sqlFormula)
    mydb.commit() #Save Data


for i in range(151,201):
    signup(People["first_name"][i].replace("'","").replace('"',""), "password" + str(i), People["email"][i] , "station_admin")
#print (args)