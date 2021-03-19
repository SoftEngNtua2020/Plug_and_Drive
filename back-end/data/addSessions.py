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

years,months,days = np.arange(2019,2021,1), np.arange(1,13,1), np.arange(1,29,1)
hours,minutes,seconds = np.arange(10,20,1), np.arange(10,59,1), np.arange(10,59,1)
energies = np.arange(20,100,1)
protocols = ["AC","DC"]
payment_methods = ["CASH","CREDIT_CARD"]
bonus = np.arange(50,400,1)
costs = np.arange(10,200,1)
stations = np.arange(1,51,1)
points = np.arange(0,3,1)
for i in range(1,51):
   for j in range(400):
      year,month,day = np.random.choice(years), np.random.choice(months), np.random.choice(days)
      hour,minute,second = np.random.choice(hours), np.random.choice(minutes),np.random.choice(seconds)
      start =  str(year)+'-'+str(month)+'-'+str(day)+' '+str(hour)+':'+str(minute)+':'+str(second) 
      finish =  str(year)+'-'+str(month)+'-'+str(day)+' '+str(hour+2)+':'+str(minute)+':'+str(second)
      energy_deliverd = np.random.choice(energies)
      protocol = np.random.choice(protocols)
      payment_method = np.random.choice(payment_methods)
      bonus_points_energy = np.random.choice(bonus)
      total_cost = np.random.choice(costs)
      vehicle_id = i
      station_id = np.random.choice(stations)
      point_id = station_id*3 - np.random.choice(points)
      program_id = station_id*3 - np.random.choice(points)
      sqlFormula = """INSERT INTO session (started_on,finished_on,energy_deliverd,protocol,payment_method,bonus_points_energy,total_cost,vehicle_id,station_id,point_id,program_id) 
                    VALUES ('{}','{}','{}','{}','{}','{}','{}','{}','{}','{}','{}')""".format(start,finish,energy_deliverd,protocol,payment_method,bonus_points_energy,total_cost,vehicle_id,station_id,point_id,program_id)
      mycursor.execute(sqlFormula)
      mydb.commit() #Save Data