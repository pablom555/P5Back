const Hapi = require('@hapi/hapi');
const routesPackages = require('./src/routes/package.route');

require('./src/config');
require('./database');

const init = async () => {

    const server = new Hapi.Server({
        port: process.env.PORT,
        host: 'localhost',
        routes: {
            cors: {
                origin: ['*'] // an array of origins or 'ignore'           
            }
        }
    });

    server.route(routesPackages);

    await server.start();
    console.log(`Server is running on: ${server.info.uri}`);

};

init();
