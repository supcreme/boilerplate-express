const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();

console.log(process.env.MESSAGE_STYLE);

// Use body-parser to Parse POST Requests
app.use(bodyParser.urlencoded({extended: true}));

// Get Data from POST Requests
app.post('/name', (req, res) => {
  let firstName = req.body.first;
  let lastName = req.body.last;
  let jsonObj = {name: `${firstName} ${lastName}`};
  console.log(req.body);
  res.json(jsonObj);
});

// Get Query Parameter Input from the Client
// ?first=firstname&last=lastname
// need send json file: { name: 'firstname lastname'}
app.get('/name', (req, res) => {
  let name = req.query.first;
  let lastName = req.query.last;
  let jsonObj = {name: `${name} ${lastName}`};
  // console.log(jsonObj);
  // console.log(req.query);
  res.json(jsonObj);
});

// Get Route Parameter Input from the Client
app.get('/:word/echo', (req, res) => {
  res.json({echo: req.params.word});
});

// Chain Middleware to Create a Time Server
app.get('/now', (req, res, next) => {
  req.time = new Date().toString();
  next();
}, (req, res) => {
  res.send({
    time: req.time,
  });
});

// Implement a Root-Level Request Logger Middleware
// GET /json - ::ffff:127.0.0.1
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

// Use the .env File
app.get('/json', (req, res) => {
  if (process.env.MESSAGE_STYLE === 'uppercase') {
    res.json({'message': 'HELLO JSON'});
  } else {
    res.json({'message': 'Hello json'});
  }
});

// Serve JSON on a Specific Route
// app.get("/json", (req, res) => {
//   res.json({
//     message: "Hello json"
//   });
// });

// Serve Static Assets
let mountPath = __dirname + '/public';
app.use('/public', express.static(mountPath));

// Serve an HTML FilePassed
app.get('/', function(req, res) {
  let absolutePath = __dirname +
      '/views/index.html';
  res.sendFile(absolutePath);
});

// app.get("/", function (req, res) {
//   res.send('Hello Express');
// });

// console.log('Hello World');

module.exports = app;
