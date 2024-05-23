const router = require("../Routes/api");
const mongoose = require("mongoose");
const salesPersonsModel = require("../Models/salesPersonsModel");
const clientsModel = require('../Models/clientModel')
const express = require("express");

router.get("/salesPersons", async (req, res) => {
  try {
    const result = await salesPersonsModel.find();
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/salesPersons/:id", async (req, res) => {
  try {
    const salesPersonId = req.params.id;

    if (!mongoose.isValidObjectId(salesPersonId)) {
      return res.status(400).json({ message: "Invalid Sales Person Id" });
    }

    const salesPerson = await salesPersonsModel.findById(salesPersonId);
    if (!salesPerson) {
      return res.status(404).json({ message: "Sales Person not found" });
    }

    const clientIds = salesPerson.clientId[0].split(',').map(id => parseInt(id.trim()));

    const associatedClients = await clientsModel.find({ id: { $in: clientIds } });

    const response = {
      salesPerson,
      associatedClients
    };
    return res.status(200).json(response);

  } catch (error) {
    console.error(error); 
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;


module.exports = router;
