const mongoose = require("mongoose");
const express = require("express");
const router = require("./Routes/api");

const clientsRouter = require("./Routes/clients");
const salesPersonRouter = require("./Routes/salesPerson");

const cors = require("cors");
const app = express();
app.use(cors());

app.use((req, res, next) => {
  // Set headers to allow cross-origin requests
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(clientsRouter);
app.use(salesPersonRouter);

mongoose.connect(
  "mongodb+srv://natashasharif:FDpdO6bYchNwIaYg@user-management-cluster.o30ud6m.mongodb.net/?retryWrites=true&w=majority&appName=User-Management-Cluster",
  {}
);
const db = mongoose.connection;
app.use(router);

// app.use('/api', router);
db.on("error", console.error.bind(console, "MongoDB connection error:"));

db.once("open", function () {
  console.log("Connected to MongoDB database successfully");
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
