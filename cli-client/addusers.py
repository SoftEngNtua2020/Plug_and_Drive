import requests
import json
def signup(username, password, email, role):
    #url = 'https://localhost:8765/evcharge/api/login'
    url = 'https://localhost:8080/api/auth/signup'
    info = {'username': username, 'password': password, 'email' : email, 'roles' : [role]}
    headers = {'Content-Type' : 'application/json'}
    res = requests.post(url, data=info, headers=headers, verify=False)
    print(res.status_code)
    print(res)
    return True

for i in range(1,7):
    signup(f'alex{i}', f'password{i}', f'myemail{i}@mydb.com', 'admin')

#print (args)
