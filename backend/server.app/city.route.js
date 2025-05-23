const express = require("express");
const cityRoute = express.Router();
var City = require("./city.model");


//save city
cityRoute.route("/save").post((req, res) => {
  let city = new City(req.body);
  city.save()
    .then((city) => {
      res.send("City Saved");
    })
    .catch((error) => {
      res.send(error);
    });
});

// Search City
cityRoute.route("/search/:ctid").get((req, res) => {
  City.findOne({ ctid: req.params.ctid })
    .then((city) => {
      res.send(city);
    })
    .catch((error) => {
      res.send(error);
    });
});


cityRoute.route("/update").put((req, res) => {
  City.updateOne(
    { ctid: req.body.ctid },
    {
      ctid: req.body.ctid,
      ctname: req.body.ctname,
      stid: req.body.stid,
      stname: req.body.stname,
      status: req.body.status
    }
  )
    .then((city) => {
      res.send("City Updated Successfully");
    })
    .catch((err) => {
      res.send(err);
    });
});

// Delete Enable and Disable Route
cityRoute.route("/delete/:ctid").delete((req, res) => {
  City.updateOne(
    {
      ctid: req.params.ctid,
    },
    { status: 0 }
  ).then((city) => {
    res.send("City Disabled Successfully");
  }).catch((err) => {
    res.send(err)
  });
});


cityRoute.route("/getall").get((req, res) => {
  City.find({ status: 1 })
    .then((city) => {
      res.send(city);
    }).catch((err) => {
      res.send(err);
    });
});

// Show All Cities 
cityRoute.route('/show').get((req, res) => {
  City.find({ status: 1 })
    .then((city) => {
      res.send(city);
    }).catch((err) => {
      res.send(err);
    });
});

// Search state by name to avoid duplicate entry.
cityRoute.route('/searchbyname/:ctname').get((req, res) => {
  City.findOne({ 'ctname': req.params.ctname })
    .then((city) => {
      res.send(city);
    }).catch((err) => {
      res.send(err);
    });
});

module.exports = cityRoute;
