const express = require('express');
const venderRoute = express.Router();
const bodyParser = require('body-parser');
const Vender = require('./vender.model');
var fs = require('fs/promises');
const multer = require('multer');


// Vender Registration 
venderRoute.route("/register")
    .post((req, res) => {
        var vender = new Vender(req.body);
        vender.save()
            .then((vender) => {
                if (vender != null) {
                    res.send("Registration Successful");
                } else {
                    res.send("Registration Failed");
                }
            }).catch((error) => {
                res.status(400).send("Registration Failed");
            });
    })

// Vender Login (Fixed query typo)
venderRoute.route("/login")
    .post((req, res) => {
        let id = req.body.vuid;
        let pass = req.body.vupass;
        console.log(`userId : ${id} password: ${pass}`);
        Vender.findOne({ $and: [{ "VUserId": id }, { "VUserPass": pass }] })  // Removed colon typo
            .then((vender) => {
                if (vender) {
                    res.send(vender);  // Send vendor data on success
                } else {
                    res.status(400).send("Invalid ID/Password");
                }
            }).catch((err) => {
                res.status(500).send("Something went wrong");
            });
    })

// Get Images
venderRoute.route('/getimage/:vpicname')
    .get((req, res) => {
        res.sendFile("C:/Users/PC/OneDrive/Desktop/PROGRAMING/React.Js/ReactDemo14/backend/server/vender/venderimages/" + req.params.vpicname);
    });

// Image Save (Multer)
const st = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'C:/Users/PC/OneDrive/Desktop/PROGRAMING/React.Js/ReactDemo14/backend/server/vender/venderimages')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
})
const upload = multer({ storage: st });

venderRoute.post('/savevenderimage', upload.single('file'), (req, res) => {
    res.json({})
})

// Get Vender Count
venderRoute.route("/getvendercount")
    .get((req, res) => {
        Vender.find()
            .then((vender) => {
                res.send(vender);
            }).catch((err) => {
                res.send("Something Went Wrong");
            });
    })

// Enable/Disable Vender
venderRoute.route('/vendermanage/:vid/:status')
    .put((req, res) => {
        Vender.updateOne({ "Vid": req.params.vid }, { "Status": req.params.status })
            .then((vender) => {
                res.send("Vender Status Updated Successfully");
            }).catch((err) => {
                res.send(err);
            });
    });

module.exports = venderRoute;