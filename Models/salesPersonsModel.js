const mongoose = require('mongoose')

const locationSchema = mongoose.Schema({
    latitude: { type: Number, required: true },
    longitude: {type: Number,required: true}
})
const salesPersonsSchema = new mongoose.Schema({

    id: { type: Number, required: true },
    name: { type: String, required: true },
    phone_number: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    image: { type: String, required: false },
    location: { type: locationSchema, required: true },
   clientId: {type:[]}
})



const salesPersonsModel = mongoose.model('salesPersons', salesPersonsSchema)

module.exports = salesPersonsModel;