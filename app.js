const express = require("express");
const app = express();
const ErrorHandler = require("./middleware/error");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const path = require("path");
const dotenv = require("dotenv");
const cors=require("cors");


app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true,limit:"50mb"}));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(fileUpload({useTempFiles: true}));

// config

// dotenv.config({ path: "backend/config/config.env" });
// STRIPE_SECRET_KEY=sk_test_51N220GSJ2EiT5z33HILsA8OLQPVqkYk6cYVoAXS1MN21tMLsIB2Zc9AJHGAHMBK5sv5VOB8qeKFHzHhnsfBN7nRz00lavPlKWY
// STRIPE_API_KEY=pk_test_51N220GSJ2EiT5z33foJdifw1DLvmlweuYcwLABdfi1arc5hbynjtcnPYt0ikSjOh9XsZPeFJ1uudXTjQZmiQyeCL00OZoG7FiT




dotenv.config({ path: "./config/config.env" });

// Route imports
const product = require("./routes/ProductRoute");
const user = require("./routes/UserRoute");
const order = require("./routes/OrderRoute");
const payment = require("./routes/PaymentRoute");
const cart = require("./routes/WishListRoute");
const variant=require("./routes/VariantRoute")



app.use("/api/v2",product);

app.use("/api/v2",user);

app.use("/api/v2",order);

app.use("/api/v2",payment);

app.use("/api/v2",cart);

app.use("/api/v2",variant)




// app.use(express.static(path.join(__dirname,"../frontend/build")));

// app.get("*",(req,res) =>{
//     res.sendFile(path.resolve(__dirname,"../frontend/build/index.html"));
// })




// it's for errorHandeling
app.use(ErrorHandler);

module.exports = app