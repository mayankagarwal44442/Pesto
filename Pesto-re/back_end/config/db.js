var mongoose = require("mongoose");
var config = require("config");

//Set up default mongoose connection
var mongoDB = config.get("MONGO_URI");

const connectDB = async () => {
  try {
    await mongoose.connect(mongoDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("MongoDB Connected....");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;