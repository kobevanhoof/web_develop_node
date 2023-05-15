const express = require('express');
const app = express();
const fs = require('fs');
const csv = require('csv-parser');
const ejs = require('ejs');
const { JSDOM } = require('jsdom');



app.use(express.static('public'));
// Specific folder example
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/ts', express.static(__dirname + '/public/ts'));
app.use('/js', express.static(__dirname + '/public/ts'));
app.use('/img', express.static(__dirname + 'public/images'));

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
      ejs.renderFile('html/index.ejs', { data: results, selectedColors: [] }, (err, html) => {
        if (err) {
          console.log('Error rendering template:', err);
          res.status(500).send('Internal Server Error');
        } else {
          res.send(html);
          
        }
      });
    });
});

app.get('/data', (req, res) => {
  const selectedColors = req.query.colors ? req.query.colors.split(',') : [];
  // Read the CSV file and filter based on selected colors
  const results = [];
  fs.createReadStream('../generate_csv/output.csv')
    .pipe(csv())
    .on('data', (data) => {
      if (selectedColors.length === 0 || selectedColors.includes(data.Color)) {
        results.push(data);
      }
    })
    .on('end', () => {
      // Render the EJS template and send the HTML response
      ejs.renderFile('html/index.ejs', { data: results, selectedColors }, (err, html) => {
        if (err) {
          console.log('Error rendering template:', err);
          res.status(500).send('Internal Server Error');
        } else {
          const dom = new JSDOM(html);
          const projectsDiv = dom.window.document.getElementById('productsContainer');
          const projectsHTML = projectsDiv.innerHTML;

          res.send(projectsHTML);
        }
      });
    });
});


app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
