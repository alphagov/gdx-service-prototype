const express = require("express");
const nunjucks = require("nunjucks");
const path = require("path");
const service = require("./service.js");
const session = require("express-session");
const crypto = require("crypto");
const app = express();
const port = 3000;

const catalogue = service.catalogue;
const dataRequests = service.dataRequests;

app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: crypto.randomBytes(32).toString("hex"),
    resave: false,
    saveUninitialized: false,
  })
);

nunjucks.configure(["templates", "node_modules/govuk-frontend/"], {
  express: app,
});

app.get("/", (req, res) => {
  res.render("index.html.njk");
});

app.post("/login", (req, res) => {
  req.session.regenerate(() => {
    req.session.user = req.body.user;
    res.redirect("dashboard");
  });
});

app.get("/dashboard", (req, res) => {
  res.render("dashboard.html.njk", {
    user: req.session.user,
    datasetCount: catalogue.fetchCount(),
  });
});

app.get("/shared", (req, res) => {
  res.render("shared.html.njk", {
    user: req.session.user,
    datasetCount: catalogue.fetchCount(),
  });
});

app.get("/consumed", (req, res) => {
  res.render("consumed.html.njk", {
    user: req.session.user,
    datasetCount: catalogue.fetchCount(),
  });
});

app.get("/catalogue", (req, res) => {
  res.render("catalogue.html.njk", {
    user: req.session.user,
    dataItems: catalogue.fetchAllSummaries(),
    itemCount: catalogue.fetchCount(),
  });
});

app.get("/catalogue/:dataItemId", (req, res) => {
  const dataItem = catalogue.fetchById(req.params.dataItemId);
  res.render("dataitem.html.njk", {
    dataItem: dataItem,
    user: req.session.user,
  });
});

app.get("/requestaccess", (req, res) => {
  if (req.query.dataitem != null) {
    const dataItem = catalogue.fetchById(req.query.dataitem);
    res.render("requestaccess.html.njk", {
      dataItem: dataItem,
      user: req.session.user,
    });
  } else {
    res.redirect("catalogue");
  }
});

app.post("/requestaccess", (req, res) => {
  dataRequests.createRequest({ detail: req.body.detail });
  res.redirect("requestconfirmation");
});

app.get("/requestconfirmation", (req, res) => {
  res.render("requestconfirmation.html.njk", { user: req.session.user });
});

function localAsset(assetPath) {
  return express.static(path.join(__dirname, assetPath));
}

app.use(
  "/assets/images",
  localAsset("/node_modules/govuk-frontend/govuk/assets/images")
);
app.use(
  "/assets/fonts",
  localAsset("/node_modules/govuk-frontend/govuk/assets/fonts")
);
app.use(
  "/assets/js/all.js",
  localAsset("/node_modules/govuk-frontend/govuk/all.js")
);
app.use("/assets/css", localAsset("/css"));

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
