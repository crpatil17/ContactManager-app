const express = require("express"); // express module import
const errorHandler = require("./middleware/errorHandler");

const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();

connectDb();

const app = express(); // all express methods given to variable app

//middlewares
app.use(express.json()); //it can extract data from body that send in json format
app.use("/api/contacts", require("./routes/contactRoutes")); //provide routing
app.use(errorHandler); // middleware error handler
app.use("/api/users", require("./routes/usersRoutes"));
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
