const mongoose = require("mongoose");
mongoose.set("strictQuery", false);


const connectDatabase = () =>{
    mongoose.connect(process.env.DB_URL).then((data) => {
      // mongoose.connect("mongodb://127.0.0.1:27017/pikyard").then((data) => {
        console.log(`Mongodb connected with server: ${data.connection.host}`);
      });
      
}

module.exports = connectDatabase