const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = 9191;
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./DB");
const stateRoute = require("./admin/state.route");
// const cityRoute = require("./admin/city.route");
const productCatgRoute = require("./admin/productcatg.route");
const VenderRoute = require('./vender/vender.route');
// const venderRoute = require("./vender/vender.route");
// const customerRoute = require('./customer/customer.route');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/state", stateRoute);
// app.use("/city", cityRoute);
app.use("/productcatg", productCatgRoute);
// app.use("/vender", venderRoute);
// app.use("/customer", customerRoute);

mongoose.connect(config.URL,
  {useNewUrlParser:true}
).then(
  ()=>{console.log('Database is connected'+config.URL)},
  err=>{console.log('Can not cannot to the database'+err)}
);

app.listen(PORT,function(){
  console.log('Server is running on Port:',PORT);
});
  
//   .connect(config.URL, { useNewUrlParser: true })
//   .then(() => {
//     console.log(`Database is connected {config.URL}`);
//   })
//   .catch((err) => {
//     console.log(`Can not connect to the data ${err}`);
//   });

// app.listen(PORT, () => {
//   console.log(`Server is Running ${PORT}`);
// });
