const Meeting = require("../Models/Meetings");
const router = require("./api");

router.post("/addMeeting", async (req, res) => {
   
  const meeting = new Meeting({
    ...req.body,
  });
    
   

  try {
    await meeting.save();
    res.status(201).send(meeting);
  } catch (e) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
