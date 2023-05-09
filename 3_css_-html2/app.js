// Imports
const express = require('express')
const app = express()
const port = 3000

const fs = require("fs");
const { parse } = require("csv-parse");

fs.createReadStream("../generate_csv/output.csv")
  .pipe(parse({ delimiter: ",", from_line: 2 }))
  .on("data", function (row) {
    console.log(row);
  })
  .on("end", function () {
    console.log("finished");
  })
  .on("error", function (error) {
    console.log(error.message);
  });

// Static Files
app.use(express.static('public'));
// Specific folder example
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'public/images'))

// Set View's
app.set('views', './html');
app.set('view engine', 'ejs');

// Navigation
app.get('', (req, res) => {
    res.render('index', { text: 'Hey' })
})

app.get('/about', (req, res) => {
    res.render('about', { text: 'about page' })
})

app.listen(port, () => console.info(`App listening on port ${port}`))