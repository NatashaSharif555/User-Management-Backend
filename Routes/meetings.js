const Meeting = require("../Models/Meetings");
const clientModel = require("../Models/clientModel");
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
 
router.get("/getMeetings/:id", async (req, res) => {
  const salesPersonId = req.params.id;
  try {
    const meetings = await Meeting.find({ salesPersonId });
    if (meetings.length === 0) {
      return res
        .status(404)
        .json({ message: "No meetings found for this salesperson." });
    }
    const clientIds = [...new Set(meetings.map((meeting) => meeting.clientId))];
 
 
    // Fetch client details
    const clients = await clientModel.find({ _id: { $in: clientIds } });
    const clientMap = clients.reduce((acc, client) => {
      acc[client._id] = {
        name: client.name,
        location: client.location,
        address: client.address
      };
 
      return acc;
    }, {});
 
    // Attach client names to meetings
    const meetingsWithClientNames = meetings.map(
      (meeting) => (
        {
          ...meeting.toObject(),
          clientName: clientMap[meeting.clientId]?.name,
          location: clientMap[meeting.clientId]?.location,
          address: clientMap[meeting.clientId]?.address,

        }
      )
    );
 
 
    res.status(200).json(meetingsWithClientNames);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
 
module.exports = router;