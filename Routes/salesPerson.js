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
    salesPersonId = req.params.id;
    if (!mongoose.isValidObjectId) {
      return res.status(400).json({ message: "Invalid Sales Person Id" });
    }
    salesPerson = await salesPersonsModel.findById(salesPersonId);

    const associatedClients = await clientsModel.find().sort({ createdAt: 1 }).limit(3);

      if (!salesPerson) {
          return res.status(404).json({message:"Sales Person not found"})
      }
      else {
        const response = {
          salesPerson,
          associatedClients
        };
        console.log(response,"response in route")
          return res.status(200).json(response)
      }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" })
    
  }
});

module.exports = router;
