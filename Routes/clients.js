const router = require('../Routes/api')
const mongoose = require("mongoose");
const clientModel = require("../Models/clientModel")
const express = require('express')
router.get("/clients", async (req, res) => {
  try {
    const result = await clientModel.find();
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/clients/:id", async (req, res) => {
  try {
    clientId = req.params.id;
    if (!mongoose.isValidObjectId(clientId)) {
      return res.status(400).json({ message: "Invalid client ID" });
    }
    client = await clientModel.findById(clientId);
    if (!client) {
      return res.status(404).json({ message: "Client Not Found!" });
    } else {
      res.json(client);
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
    console.log(error);
  }
});


module.exports = router