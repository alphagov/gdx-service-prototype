const express = require('express');
const nunjucks = require('nunjucks');
const path = require('path');
const data = require('./data.js');
const app = express();
const port = 3000;

const catalogue = data.catalogue;

nunjucks.configure([
    'templates',
    'node_modules/govuk-frontend/'
    ], {
    express: app
});

app.get("/", (req, res) => {
   res.render("index.html.njk");
})

app.get("/dashboard", (req, res) => {
   res.render("dashboard.html.njk", {
       datasetCount: catalogue.fetchCount()
   });
})

app.get("/shared", (req, res) => {
    res.render("shared.html.njk", {
        datasetCount: catalogue.fetchCount()
    });
})

app.get("/consumed", (req, res) => {
    res.render("consumed.html.njk", {
        datasetCount: catalogue.fetchCount()
    });
})

app.get("/catalogue", (req, res) => {
    res.render("catalogue.html.njk", {
        dataItems:catalogue.fetchAllSummaries(),
        itemCount: catalogue.fetchCount()
    });
})


app.get("/catalogue/:dataItemId", (req, res) => {
   const dataItem = catalogue.fetchById(req.params.dataItemId);
   res.render("dataitem.html.njk", {dataItem: dataItem});
})

app.get("/requestaccess", (req, res) => {
    const dataItem = catalogue.fetchById(req.query.dataitem);
    res.render("requestaccess.html.njk", {dataItem:dataItem});
})

app.get("/requestconfirmation", (req, res) => {
    res.render("requestconfirmation.html.njk");
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
