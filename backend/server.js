const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = 4000;
const cookieParser = require("cookie-parser");
const path = require("path");

const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const orderRoutes = require("./routes/orderRoutes");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}));
app.use(cookieParser());



app.use("/api/users",userRoutes);
app.use("/api/category",categoryRoutes);
app.use("/api/products",productRoutes);
app.use("/api/upload",uploadRoutes);
app.use("/api/orders",orderRoutes);

//app.get('/',(res,req) => {
 //   res.send('Hello World!')
//});

app.get("/api/config/paypal",(req,res) => {
    res.send({clientId:"Paypal_Client_Id"});
});

//const  __dirname = path.resolve();
app.use("/uploads",express.static(path.join(__dirname + "/uploads")));


app.listen(port,() => {
    mongoose.connect('mongodb+srv://E-commerce:anuj008@cluster0.vqlwp77.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {
        console.log(`Connected to MongoDB on ${port}`);
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
        });
    
})