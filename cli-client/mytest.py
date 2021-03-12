import subprocess
import os
from pathlib import Path

def capture(command):
	proc = subprocess.Popen(command,
		stdout = subprocess.PIPE,
		stderr = subprocess.PIPE,
	)
	out,err = proc.communicate()
	return out, err, proc.returncode


def test_valid_login():
	home = str(Path.home())
	command = ["./login", "--username", "Chucho", "--passw", "password1"]
	out, err, exitcode = capture(command)
	assert os.path.exists(home + '/softeng20bAPI.token')
	assert exitcode == 0
	assert b"200" in out

def test_invalid_login():
	command = ["./login", "--username", "Chucho", "--passw", "wrongpassword:("]
	out, err, exitcode = capture(command)
	assert exitcode == 1
	assert b"401" in out

def test_valid_logout():
	home = str(Path.home())
	with open(home + '/softeng20bAPI.token', 'r') as file:
		data = file.read().replace('\n', '')
	command = ["./logout", "--apikey", data]
	out, err, exitcode = capture(command)
	assert b"200" in out

def test_invalid_logout():
	command = ["./logout", "--apikey", "thisisaninvalidkey"]
	out, err, exitcode = capture(command)
	assert b"401" in out

def test_valid_relogin():
	home = str(Path.home())
	command = ["./login", "--username", "Chucho", "--passw", "password1"]
	out, err, exitcode = capture(command)
	assert os.path.exists(home + '/softeng20bAPI.token')
	assert exitcode == 0
	assert b"200" in out

def test_valid_upload_sessions():
	home = str(Path.home())
	with open(home + '/softeng20bAPI.token', 'r') as file:
		data = file.read().replace('\n', '')
	command = ["./Admin", "--sessionsupd", "--source", "./mycsv.csv", "--apikey", data]
	out, err, exitcode = capture(command)
	assert b"200" in out

def test_invalid_upload_sessions():
	command = ["./Admin", "--sessionsupd", "--source", "./mycsv.csv", "--apikey", "thisisaninvalidkey"]
	out, err, exitcode = capture(command)
	assert b"401" in out


def test_healthcheck():
	home = str(Path.home())
	with open(home + '/softeng20bAPI.token', 'r') as file:
		data = file.read().replace('\n', '')
	command = ["./Admin", "--healthcheck", "--apikey", "./mycsv.csv", "--apikey", data]
	out, err, exitcode = capture(command)
	assert b"200" in out

def test_usermod_update_password():
	home = str(Path.home())
	with open(home + '/softeng20bAPI.token', 'r') as file:
		data = file.read().replace('\n', '')
	command = ["./Admin", "--usermod", "--username", "alex2", "--passw", "newpassword2", "--apikey", data]
	out, err, exitcode = capture(command)
	assert b"200" in out

def test_usermod_add_user():
	home = str(Path.home())
	with open(home + '/softeng20bAPI.token', 'r') as file:
		data = file.read().replace('\n', '')
	command = ["./Admin", "--usermod", "--username", "alex42", "--passw", "passw42", "--apikey", data]
	out, err, exitcode = capture(command)
	assert b"200" in out

def test_users():
	home = str(Path.home())
	with open(home + '/softeng20bAPI.token', 'r') as file:
		data = file.read().replace('\n', '')
	command = ["./Admin", "--users", "--username", "Chucho", "--apikey", data]
	out, err, exitcode = capture(command)
	assert b"200" in out



