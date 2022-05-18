const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/error.js");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const path = require("path");
var cors = require("cors");

// const port = process.env.PORT || 4000;

let corsOptions = {
  origin: "*",
};

// config
// if (process.env.NODE_ENV !== "PRODUCTION") {
//   require("dotenv").config({ path: "backend/config/config.env" });
// }

// app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(fileUpload());

// Route Imports
const user = require("./routes/userRoute");
const project = require("./routes/projectRoute");

app.use("/api/v1", project);
app.use("/api/v1", user);

// app.use(express.static(path.join(__dirname, "../client/build")));

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "../client/build/index.html"));
// });

// Middleware for error
app.use(errorMiddleware);

module.exports = app;
