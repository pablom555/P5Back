const { Schema, model } = require('mongoose');

let typeValid = {
    values: ['BIG', 'SMALL', 'CLOTHING'],
    message: '{VALUE} Does not a type valid'
};

const packageSchema = new Schema({

    packageName: {
        type: String,
        required: [true, 'Package Name is required'],
    },
    type: {
        type: String,
        required: [true, 'Package Type is required'],
        enum: typeValid
    },
    passenger: {
        type: Schema.Types.ObjectId, ref: "Passenger",
    }
});

module.exports = model('Package', packageSchema);