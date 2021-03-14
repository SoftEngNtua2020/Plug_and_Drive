# CLI client


![Python](https://img.shields.io/badge/python-v3.6+-blue.svg)
## Contents
- Command Line interface
- CLI functional/unit testing






## Python3 packages



- [argparse] - Parser for command-line options, arguments and sub-commands
- [requests] - Python HTTP library.
- [prettytable] - A simple Python library for easily displaying tabular data in a visually appealing ASCII table format


## Testing tool
- [pytest] - Full-featured Python testing tool

## Installation
For a quick installation 

```sh
pip3 install -r requirements.txt
```
To be able to run scripts without "./"
```sh
export PATH="$PATH:/path/to/cli-client"
```
## Usage 
Use according to the [document] provided by the course instructors
```sh
evgroup72 SCOPE --param1 value1 [--param2 value2 ...]--format fff --apikey kkk
```
To get a help message for each scope
```sh
evgroup72 SCOPE -h
```
Note: for the Admin scope use +h instead

## Testing
Inside the CLI directory 
```sh
pytest test_admin.py
```
Tests administrative commands
```sh
pytest test_sessions.py
```
Tests functionality of SessionsPer{EV,Point,Provider,Station}
## License

MIT

**Free Software, Hell Yeah!**



   [argparse]: https://docs.python.org/3/library/argparse.html
   [pytest]: https://docs.pytest.org/en/stable/
   [requests]: https://requests.readthedocs.io/en/master/
   [prettytable]: https://pypi.org/project/prettytable/
   [document]: https://courses.pclab.ece.ntua.gr/pluginfile.php/11027/mod_resource/content/1/project-softeng20b-rest-cli-specs-v1.0.pdf
