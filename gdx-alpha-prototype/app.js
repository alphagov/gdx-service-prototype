const express = require('express');
const nunjucks = require('nunjucks');
const path = require('path');
const data = require('./data.js');
const app = express();
const port = 3000;

const datasets = data.datasets;

nunjucks.configure([
    'templates',
    'node_modules/govuk-frontend/'
    ], {
    express: app
});

app.get("/", (req, res) => {
   res.render("index.html");
})

app.get("/dashboard", (req, res) => {
   res.render("dashboard.html", {
       datasetCount: datasets.fetchCount()
   });
})

app.get("/datasets", (req, res) => {
   res.render("datasets.html", {
       datasets: datasets.fetchAllSummaries(),
       datasetCount: datasets.fetchCount()
   });
})

app.get("/datasets/:datasetId", (req, res) => {
   const dataset = datasets.fetchById(req.params.datasetId);
   res.render("dataset.html", {dataset: dataset});
})

function localAsset(assetPath) {
    return express.static(path.join(__dirname, assetPath));
}

app.use('/assets/images', localAsset('/node_modules/govuk-frontend/govuk/assets/images'));
app.use('/assets/fonts', localAsset('/node_modules/govuk-frontend/govuk/assets/fonts'));
app.use('/assets/js/all.js', localAsset('/node_modules/govuk-frontend/govuk/all.js'));
app.use('/assets/css', localAsset('/css'));

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});
