SF-Grunt
========

Salesforce Grunt automated task runner.

This Grunt task that will automatically compile your LESS files, concat all JavaScript code, include images and deploy it into Salesforce as one single resource. All with one command!

Available commands:
- grunt default (no deployment)
- grunt all (with deployment)

###Instruction
1. Clone GitHub repo
2. Open the command line to the cloned folder
3. Use command: npm install, to get all the dependencies
4. Use command: bower install, to get the project dependencies
5. Open the Gruntfile.js and add your username and password for the sandbox where you find SALESFORCE_USERNAME and SALESFORCE_PASSWORD

You can change the name of the static resource in package.json

Typing: "grunt watch" will watch for any changes to js files or less files in the src folder and deploy them into salesforce.
