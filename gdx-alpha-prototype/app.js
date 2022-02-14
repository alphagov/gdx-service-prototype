const express = require("express");
const nunjucks = require("nunjucks");
const path = require("path");
const service = require("./service.js");
const session = require("express-session");
const crypto = require("crypto");
const flash = require("connect-flash");
const app = express();
const port = process.env.PORT || 3000;

const catalogue = service.catalogue;
const dataRequests = service.dataRequests;
const users = service.users;

app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: crypto.randomBytes(32).toString("hex"),
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 },
  })
);

app.use(flash());

nunjucks.configure(["templates", "node_modules/govuk-frontend/"], {
  express: app,
});

app.get("/", (req, res) => {
  res.render("index.html.njk", {
    error_messages: req.flash("error"),
  });
});

app.post("/login", (req, res) => {
  req.session.regenerate(() => {
    const username = req.body.user;
    const user = users.fetchUserByName(username);
    if (user != null) {
      req.session.user = user;
      res.redirect("dashboard");
    } else {
      req.flash("error", "No such user");
      res.redirect("/");
    }
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
    datasets: catalogue.fetchAllSummaries(),
    datasetCount: catalogue.fetchCount(),
  });
});

app.get("/catalogue/:datasetId", (req, res) => {
  const dataset = catalogue.fetchById(req.params.datasetId);
  res.render("dataset.html.njk", {
    dataset: dataset,
    user: req.session.user,
  });
});

app.get("/requestaccess", (req, res) => {
  if (req.query.dataset != null) {
    const dataset = catalogue.fetchById(req.query.dataset);
    res.render("requestaccess.html.njk", {
      dataset: dataset,
      user: req.session.user,
    });
  } else {
    res.redirect("catalogue");
  }
});

app.post("/requestaccess", (req, res) => {
  const datasetId = req.body.datasetId;
  const datasetName = catalogue.fetchById(datasetId).name;
  dataRequests.createRequest({
    requestingUser: req.session.user,
    datasetId: datasetId,
    datasetName: datasetName,
    detail: req.body.requestDetail,
    use: req.body.use,
    legalBasis: req.body.legalBasis,
    approved: false,
    requestDate: new Date(),
  });
  req.flash("success", "Thank you, your request has been submitted");
  res.redirect("requestconfirmation");
});

app.get("/requestconfirmation", (req, res) => {
  res.render("requestconfirmation.html.njk", {
    user: req.session.user,
    success_messages: req.flash("success"),
  });
});

app.get("/requests", (req, res) => {
  allRequests = dataRequests.fetchAllSummaries();
  if (allRequests.length == 0) {
    dataRequests.createRequest({
      requestingUser: req.session.user,
      datasetId: "death-events",
      datasetName: "Death Events",
      detail: "Request for data",
      use: "The data will be used for x",
      legalBasis: "consent",
      approved: false,
      requestDate: new Date(),
    });
    allRequests = dataRequests.fetchAllSummaries();
  }
  res.render("requests.html.njk", {
    user: req.session.user,
    dataRequests: allRequests,
  });
});

app.get("/requests/:requestId", (req, res) => {
  const dataRequest = dataRequests.fetchById(req.params.requestId);
  res.render("request.html.njk", {
    user: req.session.user,
    dataRequest: dataRequest,
  });
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
