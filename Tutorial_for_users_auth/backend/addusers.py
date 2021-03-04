import requests
import json
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
for i in range(1,7):
    signup("alex" + str(i), "password" + str(i), "myemail"+str(i)+"@mydb.com" , "admin")
for i in range(7,12):
    signup("alex" + str(i), "password" + str(i), "myemail"+str(i)+"@mydb.com" , "vehicle_designer")
for i in range(12,17):
    signup("alex" + str(i), "password" + str(i), "myemail"+str(i)+"@mydb.com" , "vehicle_owner")
for i in range(17,23):
    signup("alex" + str(i), "password" + str(i), "myemail"+str(i)+"@mydb.com" , "station_admin")
#print (args)
