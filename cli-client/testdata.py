import argparse
import requests
import json
from pathlib import Path
from datetime import date

def sessions_per_point(ar):
    url = 'http://pluganddrive.ddns.net:8765/evcharge/api/getvehicledata'
    headers = {'x-access-token' : ar.apikey}
    res = requests.get(url, headers=headers)
    print(res.status_code)
    json = res.json() #in reality a python dict
    print(json)
    #print(json['accessToken'])
    return True


parser = argparse.ArgumentParser()
parser.add_argument('--apikey', help='Give API key', required='TRUE')
args = parser.parse_args()

sessions_per_point(args)

#print (args)
