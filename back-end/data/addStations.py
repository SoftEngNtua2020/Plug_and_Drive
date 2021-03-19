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


providers = ["NextEra", "Enel Energy", "Duke Energy", "Dominion Energy", "Iberdrola", "The Southern Company", "Exelon", "EDF", "National Grid", "Engie"]
for i in range(10):
   provider_name = providers[i]
   sqlFormula = """INSERT INTO energy_provider (provider_name) 
                    VALUES ('{}')""".format(provider_name)
   mycursor.execute(sqlFormula)
   mydb.commit() #Save Data

locations = ["Athens","Thessaloniki","Patras","Piraeus","Larissa","Heraklion","Peristeri","Kallithea","Acharnes","Kalamaria","Nikaia","Glyfada","Volos","Ilio","Ilioupoli","Keratsini","Evosmos","Chalandri","Nea","Marousi","Agios","Zografou","Egaleo","Nea","Ioannina","Palaio","Korydallos","Trikala","Vyronas","Agia","Galatsi","Agrinio","Chalcis","Petroupoli","Serres","Alexandroupoli","Xanthi","Katerini","Kalamata","Kavala","Chania","Lamia","Komotini","Irakleio","Rhodes","Kifissia","Stavroupoli","Chaidari","Drama","Veria","Alimos","Kozani","Polichni","Karditsa","Sykies","Ampelokipoi"]
companies = ["Shell","EKO","BP","Technip","Motor Oil","Coral Energy"]
phones = np.arange(2100000000,2109999999,10)
provider_ids = np.arange(1,11)
program_names = ["STANDARD","DISCOUNT","VPOWER"]
kwh_prices = np.arange(1.5,4,0.01)
bonus_per_kwhs = np.arange(0.5,3,0.01)
for i in range(1,51):
   location = np.random.choice(locations)
   company_name = np.random.choice(companies)
   phone_number = np.random.choice(phones)
   provider_id = np.random.choice(provider_ids)
   sqlFormula = """INSERT INTO stations (location,company_name,phone_number,st_moderator_id,provider_id) 
                    VALUES ('{}','{}','{}','{}','{}')""".format(location,company_name,phone_number,i,provider_id)
   mycursor.execute(sqlFormula)
   mydb.commit() #Save Data
   for j in range(1,4): 
      # POINTS
      sqlFormula = """INSERT INTO point (station_id) 
                  VALUES ('{}')""".format(i)
      mycursor.execute(sqlFormula)
      mydb.commit() #Save Data

      # Programs
      program_name = program_names[j-1]
      kwh_price = np.random.choice( kwh_prices )
      bonus_per_kwh = np.random.choice(bonus_per_kwhs)
      
      sqlFormula = """INSERT INTO charging_program (program_name,kwh_price,bonus_per_kwh,station_id) 
                  VALUES ('{}','{}','{}','{}')""".format(program_name,kwh_price,bonus_per_kwh,i)
      mycursor.execute(sqlFormula)
      mydb.commit() #Save Data

