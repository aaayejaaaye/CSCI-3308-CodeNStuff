/***********************
  Load Components!
  Express      - A Node.js Framework
  Body-Parser  - A tool to help use parse the data in a post request
***********************/

var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(__dirname + '/')); // This line is necessary for us to use relative paths and access our resources directory

// viewed at http://localhost:3000
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

// viewed at http://localhost:3000/data
app.get('/data', function(req, res) {
    res.sendFile(path.join(__dirname + '/data.html'));
    spawn
});

app.listen(3000);
console.log('3000 is the magic port');

/////////////////////////////////////////////////////////////////////////////
// CALLING THE PYTHON CHILD PROCESS, CURRENTLY JUST PIPES OUTPUT TO MY TERMINAL
var spawn = require('child_process').spawn;
var py_script = __dirname + "/webscraper.py"
const child = spawn('python', [py_script, 'https://www.apple.com/'])
// var child = child_process.spawnSync(("python " + py_script), ["1", "2"], { encoding : 'utf8' });
console.log("Process finished.");
child.stdout.pipe(process.stdout);
child.stderr.pipe(process.stderr);
/////////////////////////////////////////////////////////////////////////////
