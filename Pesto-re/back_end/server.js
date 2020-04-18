const express = require("express");
const passport = require("passport");
const users = require("./routes/api/v1/users");
const pestos = require("./routes/api/v1/pestos");
const admin = require("./routes/api/v1/admin");
const app = express();


const connectDB = require("./config/db");

// connect to MongoDB
connectDB();

// Init Body Parser middleware
app.use(express.json({ extended: false }));

const PORT = 5000;
//allows usage of custom port :- PORT=444 node index.js . If not given, use 5000

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
// Routes
app.use("/api/v1/users", users);
app.use("/api/v1/pestos", pestos);
app.use("/api/v1/admin",admin);
// app.use("/healthcheck", require("express-healthcheck")());

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});