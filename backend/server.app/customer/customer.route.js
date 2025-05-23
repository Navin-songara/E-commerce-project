// const express=require("express");
// const customerRoute=express.Router();
// const bodyparser=require("body-parser");
// const Customer=require("./customer.model");
// var fs=require("fs");
// const multer = require("multer");
// const nodemaller = require("nodemaller");
// const { error } = require("console");

// function sendGMall(mailto)
// {
//     console.log("mail:-"+mailto);

//     res.status(200).json({response:"Mail Sent"});
//     const transporter = nodemailer.createTransport({
//         service:"gmail",
//         port:465,
//         secure:true,
//         auth:{
//             user:"bsmernwala@gmmail.com",
//             pass:"necc umnw wnpi bmzy",
//         },
//     });
// //console.log(req.body.email);
//     const mailOptions={
//         from:"bsmernwala@gmail.com",
//         to:mailto,
//         subject:"Registration Success",
//         text:"Dear Customer,Your Registeration is Successfully done but is in Under Admin Review after Admin Confirmation You Can Login",
//     };
//     transporter.sendMail(mailOptions,(error,info)=> {
//         if(error){
//             console.error("Error sending email:",error);
//         }else{
//             console.log("Email sent:",info.response);
//         }
//     });



// }
// //Customer registration code
// customerRoute.route("/register".post((req,res)=>{
//     var customer=new Customer(req.body);
//     customer.save().then(customer=>{
//         if(customer!=null)
//         {
//             //
//             // sendFmail(req.body.CEmail);
//             res.send("Registration Successfull");
//             res.end();
//         }
//         else{
//             res.send("Registration Failed");
//             res.end();
//         }
//     }).catch(err=>{
//         res.send(err);
//         res.end();
//     });
// });
// //login
// customerRoute.route("login").post((req,res)=>{
//     var id=req.body.CUserid;
//     var pass=req.body.CUserPass;
//     Customer.findOne({$and:[{"CUserid":id},{"CUserPass":pass}]}).then(customer=>{
//         res.send(customer);
//         res.end();
//     }).catch(err=>{
//         res.send("something went wrong");
//         res.end();
//     })
// }
// //get image
// customerRoute.route
// ('/getimage/':cpicname').
//     get((req,res)=>{
//         res.sendFile("/home/administrator/Desktop/REACT@1PM/Project/backend/server-app/customer/customerimage/"+req.params.cpicname);
//     });
//     //image save 
//     const st = multer.diskStorage({
//         destination:(req,file,cb)=>{
//             cb(null,'/home/adminstrator/Desktop/React@1PM/Project?backend/server-app/-customer/customerimages/')
//         },
//         filename:(req,file,cb) => {
//             cb(null,file.originalname)
//         },
//     })
//     const upload = multer({ storage: st });
//     customerRoute.post('/savecustomerimage',upload.single('file'),(req,res)=>{
//         res.json({})
//     })
//     //get customer for count 
//     customerRoute.route("/getcustomercount").get((req,res)=>{
//         Customer.find().then(customer=>{
//             res.send(customer);
//             res.end();
//             }).catch(err=>{
//                 res.send("something went wrong");
//                 res.end();
//             })
//         });
//     //get customer details by id
//     customerRoute.route("/getcustomerdetails/:cd").get((req.res)=>{
//         var id=req.params.cid;
//         Customer.findOne({"Cid":id}).then(customer=>{
//             console.log(customer);
//             res.send(customer);
//             res.end();
//         }).catch(err=>{
//             res.send("something went wrong");
//             res.end();
//         }) 
//         })
//     //get customer List 
//     customerRoute.route("/getcustomerlist").get((req,res)=>{
//         var id=req.params.cid;
//         Customer.find().then(customer=>{
//             console.log(customer);
//             res.send(customer);
//             res.end();
//         }).catch(err=>{
//             res.send("something went wrong");
//             res.end();
//         })
//     });

// //enable disable customer by admin 
// customerRoute.route
// ('customermanage/:cid/:status').put((req,res)=>{
//     Customer.updateOne({"Cid":req.params.cid},{"Status":req.params.status}).then(vender =>{
//             res.send('CUstomer Status Updated successfully');
//             res.end();
//         })
//         .catch((err)=>{
//             res.send(err);
//             res.end();
//         });
// });

// module.exports=customerRoute;


const express = require("express");
const customerRoute = express.Router();
const bodyparser = require("body-parser");
const Customer = require("./customer.model");
var fs = require("fs");
const multer = require("multer");
const nodemailer = require("nodemailer"); // Fixed typo: "nodemaller" ➜ "nodemailer"
const { error } = require("console");

function sendGMall(mailto) {
    console.log("mail:-" + mailto);

    // Moved inside function: you can't use res here without passing it
    const transporter = nodemailer.createTransport({
        service: "gmail",
        port: 465,
        secure: true,
        auth: {
            user: "bsmernwala@gmail.com", // Fixed typo: "gmmail.com" ➜ "gmail.com"
            pass: "necc umnw wnpi bmzy",
        },
    });

    const mailOptions = {
        from: "bsmernwala@gmail.com",
        to: mailto,
        subject: "Registration Success",
        text: "Dear Customer,Your Registeration is Successfully done but is in Under Admin Review after Admin Confirmation You Can Login",
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email:", error);
        } else {
            console.log("Email sent:", info.response);
        }
    });
}

// Customer registration code
customerRoute.route("/register").post((req, res) => { // Fixed misplaced parenthesis
    var customer = new Customer(req.body);
    customer.save().then(customer => {
        if (customer != null) {
            // sendGMall(req.body.CEmail); // You can uncomment if needed
            res.send("Registration Successfull");
            res.end();
        } else {
            res.send("Registration Failed");
            res.end();
        }
    }).catch(err => {
        res.send(err);
        res.end();
    });
});

// login
customerRoute.route("/login").post((req, res) => { // Added missing slash
    var id = req.body.CUserid;
    var pass = req.body.CUserPass;
    Customer.findOne({ $and: [{ "CUserid": id }, { "CUserPass": pass }] }).then(customer => {
        res.send(customer);
        res.end();
    }).catch(err => {
        res.send("something went wrong");
        res.end();
    });
});

// get image
customerRoute.route('/getimage/:cpicname') // Fixed route path syntax
    .get((req, res) => {
        res.sendFile("/home/administrator/Desktop/REACT@1PM/Project/backend/server-app/customer/customerimage/" + req.params.cpicname);
    });

// image save
const st = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '/home/administrator/Desktop/React@1PM/Project/backend/server-app/customer/customerimages/'); // Fixed path & typo in "administrator"
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage: st });

customerRoute.post('/savecustomerimage', upload.single('file'), (req, res) => {
    res.json({});
});

// get customer for count 
customerRoute.route("/getcustomercount").get((req, res) => {
    Customer.find().then(customer => {
        res.send(customer);
        res.end();
    }).catch(err => {
        res.send("something went wrong");
        res.end();
    });
});

// get customer details by id
customerRoute.route("/getcustomerdetails/:cid").get((req, res) => { // Fixed typo: req.res ➜ req, res & :cd ➜ :cid
    var id = req.params.cid;
    Customer.findOne({ "Cid": id }).then(customer => {
        console.log(customer);
        res.send(customer);
        res.end();
    }).catch(err => {
        res.send("something went wrong");
        res.end();
    });
});

// get customer List 
customerRoute.route("/getcustomerlist").get((req, res) => {
    Customer.find().then(customer => {
        console.log(customer);
        res.send(customer);
        res.end();
    }).catch(err => {
        res.send("something went wrong");
        res.end();
    });
});

// enable/disable customer by admin 
customerRoute.route('/customermanage/:cid/:status').put((req, res) => { // Fixed route path string quotes
    Customer.updateOne({ "Cid": req.params.cid }, { "Status": req.params.status }).then(vender => {
        res.send('Customer Status Updated successfully');
        res.end();
    }).catch((err) => {
        res.send(err);
        res.end();
    });
});

module.exports = customerRoute;
