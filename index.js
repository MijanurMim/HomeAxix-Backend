const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary");

// config
dotenv.config({ path: "config/config.env" });

// Handle Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error:${err.message}`);
  console.log(`Shutting Down The Server Due to Uncaught Exception`);

  process.exit(1);
});

// Connecting to database
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Database connected"))
  .catch((err) => {
    console.log(err);
  });

// Cloudninary Connection
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.get("/", (req, res) => {
  res.send("Home Axis server is Running");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is Running on port : ${process.env.PORT} `);
});

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting Down The Server Due to Unhandled Promise Rejection`);
  server.close(() => {
    process.exit(1);
  });
});
