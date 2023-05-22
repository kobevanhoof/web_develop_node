const express = require('express');
const app = express();
const fs = require('fs');
const csv = require('csv-parser');
const ejs = require('ejs');
const { JSDOM } = require('jsdom');

const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(express.static('public'));
app.use('/css', express.static(__dirname + '/public/css'));
app.use('/ts', express.static(__dirname + '/public/ts'));
app.use('/js', express.static(__dirname + '/public/ts'));
app.use('/img', express.static(__dirname + '/public/images'));

app.get('/', async (req, res) => {
  try {
    if (!req.cookies.hasData) {
      res.cookie('hasData', true);
    }

    // Read the CSV file
    const results = await new Promise((resolve, reject) => {
      const data = [];
      fs.createReadStream('../generate_csv/output.csv')
        .pipe(csv())
        .on('data', (row) => {
          data.push(row);
        })
        .on('end', () => {
          resolve(data);
        })
        .on('error', (error) => {
          reject(error);
        });
    });

    // Render the EJS template
    const html = await new Promise((resolve, reject) => {
      ejs.renderFile('html/index.ejs', { data: results, selectedColors: [], hasData: req.cookies.hasData }, (err, renderedHtml) => {
        if (err) {
          reject(err);
        } else {
          resolve(renderedHtml);
        }
      });
    });

    res.send(html);
  } catch (error) {
    console.log('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/data', async (req, res) => {
  const selectedColors = req.query.colors ? req.query.colors.split(',') : [];
  const selectedRandomNs = req.query.RandomN ? req.query.RandomN.split(',') : [];

  try {
    if (!req.cookies.hasData) {
      res.cookie('hasData', true);
    }
    const stream = fs.createReadStream('../generate_csv/output.csv');
    const csvData = await new Promise((resolve, reject) => {
      const results = [];
      stream
        .pipe(csv())
        .on('data', (data) => {
          if ((selectedColors.length === 0 || selectedColors.includes(data.Color)) &&
              (selectedRandomNs.length === 0 || selectedRandomNs.includes(data.RandomN))) {
            results.push(data);
          }
        })
        .on('end', () => resolve(results))
        .on('error', reject);
    });

    const html = await ejs.renderFile('html/index.ejs', { data: csvData, selectedColors, selectedRandomNs, hasData: req.cookies.hasData });
    const dom = new JSDOM(html);
    const projectsDiv = dom.window.document.getElementById('productsContainer');
    const projectsHTML = projectsDiv.innerHTML;

    res.send(projectsHTML);
  } catch (err) {
    console.log('Error rendering template:', err);
    res.status(500).send('Internal Server Error');
  }
});


app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
