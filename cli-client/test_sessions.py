import subprocess
import os
from pathlib import Path


datefrom = "20190204"
dateto = "20200204"




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

home = str(Path.home())
file =  open(home + '/softeng20bAPI.token', 'r')
data = file.read().replace('\n', '')

def test_sessionsperevJS():
	command = ["./SessionsPerEv", "--format", "json", "--datefrom", datefrom , "--dateto", dateto ,"--apikey", data, "--ev", "2"]
	out, err, exitcode = capture(command)
	#assert err != 0
	assert b"200" in out

def test_sessionsperevCSV():
	command = ["./SessionsPerEv", "--format", "csv", "--datefrom", datefrom, "--dateto", dateto,"--apikey", data, "--ev", "2"]
	out, err, exitcode = capture(command)
	#assert err != 0
	assert b"200" in out


def test_sessionsperpointJS():
	command = ["./SessionsPerPoint", "--format", "json", "--datefrom", datefrom, "--dateto", dateto,"--apikey", data, "--point", "1"]
	out, err, exitcode = capture(command)
	#assert err != 0
	assert b"200" in out

def test_sessionsperpointCSV():
	command = ["./SessionsPerPoint", "--format", "csv", "--datefrom", datefrom, "--dateto", dateto,"--apikey", data, "--point", "1"]
	out, err, exitcode = capture(command)
	#assert err != 0
	assert b"200" in out

def test_sessionsperproviderJS():
	command = ["./SessionsPerProvider", "--format", "json", "--datefrom", datefrom, "--dateto", dateto,"--apikey", data, "--provider", "1"]
	out, err, exitcode = capture(command)
	#assert err != 0provider
	assert b"200" in out

def test_sessionsperproviderCSV():
	command = ["./SessionsPerProvider", "--format", "csv", "--datefrom", datefrom, "--dateto", dateto,"--apikey", data, "--provider", "1"]
	out, err, exitcode = capture(command)
	#assert err != 0
	assert b"200" in out


def test_sessionsperstationJS():
	command = ["./SessionsPerStation", "--format", "json", "--datefrom", datefrom, "--dateto", dateto,"--apikey", data, "--station", "1"]
	out, err, exitcode = capture(command)
	#assert err != 0provider
	assert b"200" in out

def test_sessionsperstationCSV():
	command = ["./SessionsPerStation", "--format", "csv", "--datefrom", datefrom, "--dateto", dateto,"--apikey", data, "--station", "1"]
	out, err, exitcode = capture(command)
	#assert err != 0
	assert b"200" in out