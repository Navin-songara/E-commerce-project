// this file is used to define operation like insert , update , delete , serach , show etc;
const express = require('express');
const stateRoute = express.Router();
//router is used to define route of web page , if we use routing in web page , if we use routing in web api it make searching easy and fast , it create index for each for each web page so searching will be fast of particullar web page .

var State = require('./state.model') // it connect model

// function to save state
stateRoute.route('/save').post((req, res) => {
        var state = new State(req.body);
        state.save()
            .then(state => {
                res.send("State Saved");
                res.end();
            }).catch(err => {
                res.send(err);
                res.end();
            });
    });

//function to search state
stateRoute.route('/search/:stid').get((req, res) => {
    State.findOne({ "stid": req.params.stid })
        .then(state => {
            res.send(state);
            res.end();
        }).catch(err => {
            res.send(err);
            res.end();
        });
});

// function to update state
stateRoute.route('/update').put((req, res) => {
    State.updateOne({ 'stid': req.body.stid }, { 'stid': req.body.stid, 'stname': req.body.stname, 'status': req.body.status })
        .then(state => {
            res.send('State Updated Successfully');
            res.end();
        }).catch((err) => {
            res.send(err);
            res.end();
        });
});

//delete enable or disable
stateRoute.route('/delete/:stid').delete((req, res) => {
    State.updateOne({ 'stid': req.params.stid }, { 'status': 0 })
        .then((state) => {
            res.send('State Disabled Successfully');
            res.end();
        }).catch((err) => {
            res.send(err);
            res.end();
        });
});

//show all used to get all data from mongodb
stateRoute.route('/show').get((req, res) => {
    State.find({ 'status': 1 })
        .then(state => {
            res.send(state);
            res.end();
        }).catch((err) => {
            res.send(err);
            res.end();
        });
});

//search state by name to avoid duplicate entry
stateRoute.route('/searchbyname/:stname').get((req, res) => {
    State.findOne({ 'stname': req.params.stname })
        .then((state) => {
            res.send(state);
            res.end();
        }).catch((err) => {
            res.send(err);
            res.end();
        });
});

module.exports = stateRoute;