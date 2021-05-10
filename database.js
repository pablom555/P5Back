const mongoose = require('mongoose');
require('./src/config');

mongoose.connect(process.env.URLDB, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
})
    .then(connectDB => console.log(`Success connection to ${connectDB.connections[0].name} BBDD`))
    .catch(err => console.log('Error trying to connect Data Base: ', err.message));

    