const mongoose = require('mongoose')

const locationSchema = new mongoose.Schema({
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true }
});
const clientSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    phone_number: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    image: { type: String, required: false },
    location: { type: locationSchema, required: true },
    salesPersonId: {type:Number} 
})
const clientModel = mongoose.model('clients', clientSchema)

// clientSchema.virtual("salesPersons", {
//     ref: "salesPersons",
//     localField: "salesPersonId",
//     foreignField: "id",
// });

// clientSchema.set('toObject', { virtuals: true });
// clientSchema.set('toJSON', { virtuals: true });

module.exports = clientModel;