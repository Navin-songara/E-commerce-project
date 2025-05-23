let mongoose = require('mongoose');
// mongoose librery used to providemongodb schema class to manage structure of data for database.

const Schema = mongoose.Schema;
// Schema named class provide information about data type;
// productcatg is object and used fileds / coloums of database with datatypes.

let ProductCatg = new Schema({
    pcatid: { type: Number },
    pcatname: { type: String }
},
    {
        collection: "productCatg"
    }
);
module.exports = mongoose.model('ProductCatg', ProductCatg);
