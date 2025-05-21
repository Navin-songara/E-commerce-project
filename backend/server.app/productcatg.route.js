const express = require('express');
const app = express();
const productRoute = express.Router();
const ProductCat = require('./productcatg.model');
const cors = require("cors");
app.use(cors())

productRoute.route('/addproduct/:pcatid/:pcatname').post((req, res) => {
    let productCat = new ProductCat({ pcatid: req.params.pcatid, pcatname: req.params.pcatname });
    productCat.save().then((savedProductCat) => {
            res.send(savedProductCat);
        }).catch((err) => {
            console.error("Error adding product category:", err);
            res.status(500).send(err);
        });
});

// Show all product categories
productRoute.route('/showproductcat').get((req, res) => {
    ProductCat.find()
        .then((productCategories) => {
            res.send(Array.isArray(productCategories) ? productCategories : []); // ✅ Fix: Always return an array
        })
        .catch((err) => {
            console.error("Error fetching categories:", err);
            res.status(500).send([]); // ✅ Fix: Returns empty array instead of error string
        });
});

module.exports = productRoute;
