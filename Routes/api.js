const express = require('express');
const router = express.Router();
const clientModel = require('../Models/clientModel');
const salesPersonsModel = require('../Models/salesPersonsModel');
const fs = require('fs');
const path = require('path');
router.get('/clients', async (req, res) => {
    try {   
        const filePath = path.join(__dirname, '../util/ClientsData.json');
        const response = fs.readFileSync(filePath, 'utf-8')
         const data = JSON.parse(response);

    await clientModel.insertMany(data);

    const result = await clientModel.find();
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


router.get('/salesPersons', async (req, res) => {
    try {   
        const filePath = path.join(__dirname, '../util/SalesPersons.json');
        const response = fs.readFileSync(filePath, 'utf-8')
      console.log(response,"Response in routes")
    const data = JSON.parse(response);
    console.log(data,"data in routes")
    await salesPersonsModel.insertMany(data);
    const result = await salesPersonsModel.find();
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
