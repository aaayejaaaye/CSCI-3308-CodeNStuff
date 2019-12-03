/***********************
  Load Components!
  Express      - A Node.js Framework
  Body-Parser  - A tool to help use parse the data in a post request
  Path
  Pug

***********************/

const express = require('express');
const app = express();

const path = require('path');
const bodyParser = require('body-parser');
const pug = require('pug'); // Add the 'pug' view engine

const jsStringify = require('js-stringify');

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/')); // This line is necessary for us to use relative paths and access our resources directory
app.use(bodyParser.urlencoded({extended: true}));


// viewed at http://localhost:3000
app.get('/', function(req, res) {
    // res.render(path.join(__dirname + '/index'));
    res.render('index',{
      my_title:"Webpage Analyzer 2.0",
    });
});

app.post('/submit', async function(req, res, next) {


  function showPageData(urls, data) {
    res.render('submit',{
      my_title:"Webpage Analyzer 2.0 - Results",
      urls: urls,
      data: data,
      jsStringify
    });
  }

    var url_0 = req.body.url_0;

    var url_1 = req.body.url_1;

    var url_2 = req.body.url_2;

    var py_script = "webscraper.py"

    var args = [py_script];

    // making sure there is text inside the url input boxes
    if (typeof url_0 != 'undefined' && url_0) {
      args.push(url_0);
    }
    else {
      url_0 = "None";
    }
    if (typeof url_1 != 'undefined' && url_1) {
      args.push(url_1);
    }
    else {
      url_1 = "None";
    }
    if (typeof url_2 != 'undefined' && url_2) {
      args.push(url_2);
    }
    else {
      url_2 = "None";
    }

    var urls = [url_0, url_1, url_2];

    const util = require('util');
    const execFile = util.promisify(require('child_process').execFile);

    async function getWebData(args, urls) {
      const { stdout } = await execFile('python', args);
      // console.log(typeof stdout);
      // console.log(stdout);
      var data = JSON.parse(stdout);
      // console.log(typeof data);
      // console.log(data);
      showPageData(urls, data);
    }

    getWebData(args, urls);
    // console.log(urls)
});


app.listen(3000);
console.log('3000 is the magic port');
