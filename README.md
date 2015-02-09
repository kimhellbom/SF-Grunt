SF-Grunt
========

Salesforce Grunt automated task runner.

This Grunt build will compile your LESS files, concat all JavaScript code, include images and deploy it into Salesforce as one single resource. All with one command!

[Npm], [Bower] and [ant] are required.

###Instructions
1. Clone GitHub repo
2. Open the command line to the cloned folder
3. Use command: `npm install`, to get all the dependencies
4. Use command: `bower install`, to get the project dependencies
5. Open the Gruntfile.js and add your username and password for the sandbox where you find yourusername and yourpassword

You can change the name of the static resource in package.json

Available commands:
- `grunt default` (no deployment)
- `grunt all` (with deployment)

Typing: `grunt watch` will watch for any changes to js files or less files in the src folder and deploy them into salesforce.


[ant]:http://ant.apache.org/
[Npm]:https://www.npmjs.com
[Bower]:http://bower.io/
