const mongoose = require('mongoose');
const router = require('./Routes/api')
const express = require('express')
mongoose.connect('mongodb+srv://natashasharif:FDpdO6bYchNwIaYg@user-management-cluster.o30ud6m.mongodb.net/?retryWrites=true&w=majority&appName=User-Management-Cluster', {

});
const app = express();
const db = mongoose.connection;
app.use(router);

// app.use('/api', router);
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.once('open', function() {
  console.log("Connected to MongoDB database successfully");
});


// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

