const express = require('express');
const app = express();
const fs = require('fs');
const csv = require('csv-parser');
const ejs = require('ejs');

app.use(express.static('public'));
// Specific folder example
 app.use('/css', express.static(__dirname + 'public/css'))
 app.use('/ts', express.static(__dirname + '/public/ts'));
 app.use('/js', express.static(__dirname + '/public/ts'));

 app.use('/img', express.static(__dirname + 'public/images'))


app.get('/', (req, res) => {
  // Read the CSV file
  const results = [];
  fs.createReadStream('../generate_csv/output.csv')
    .pipe(csv())
    .on('data', (data) => {
      results.push(data);
    })
    .on('end', () => {
      // Render the EJS template
      ejs.renderFile('html/index.ejs', { data: results }, (err, html) => {
        if (err) {
          console.log('Error rendering template:', err);
          res.status(500).send('Internal Server Error');
        } else {


          res.send(html);
        }
      });
    });
});


app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

