const router = require('../Routes/api')
const associatedSalesPersonsModel = require('../Models/associatedPersonsModel')

router.get("/associatedPersons", async (req, res) => {
  try {
    const result = await associatedSalesPersonsModel.find();
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router