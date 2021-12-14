#!/bin/bash
echo npm packages:
npm list --global --json
echo python packages:
python -m pip list --format=json
echo java maven 
mvn dependency:list
#END