const router = require('../Routes/api')
const mongoose = require("mongoose");
const clientModel = require("../Models/clientModel")
const express = require('express');
const salesPersonsModel = require('../Models/salesPersonsModel');
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
    const clientId = req.params.id;
    if (!mongoose.isValidObjectId(clientId)) {
      return res.status(400).json({ message: "Invalid client ID" });
    }
    const client = await clientModel.findOne({ _id: clientId });

    if (!client) {
      return res.status(404).json({ message: "Client Not Found!" });
    } else {
      const associatedSalesPersons = await salesPersonsModel.find({ id: client.salesPersonId });
      const response = {
        client,
        associatedSalesPersons
      };

      res.json(response);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
});



module.exports = router