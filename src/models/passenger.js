const { Schema, model } = require('mongoose');

const passengerSchema = new Schema({

    documentNumber: {
        type: Number,
        required: [true, 'Document Number is required']
    },
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    flightNumber: {
        type: String,
        required: [true, 'FlightNumber is required']
    },    
    packages: [{
        type: Schema.Types.ObjectId, ref: "Package",
    }]

});


module.exports = model('Passenger', passengerSchema);