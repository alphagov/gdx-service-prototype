const express = require('express');
const nunjucks = require('nunjucks');
const path = require('path');
const app = express();
const port = 3000;

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
   res.render("dashboard.html");
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
