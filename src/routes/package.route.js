const Joi = require('@hapi/joi');

const packagesHandlers = require('../handlers/package.handler');
const { createJSONResponse } = require('../utils/utils');

const routes = [
    {
        method: 'GET',
        path: '/api/passengers',
        handler: packagesHandlers.getPassengers
    },
    {
        method: 'GET',
        path: '/api/passengers/{id}',
        handler: packagesHandlers.getPassengersByID            
    },   
    {
        method: 'DELETE',
        path: '/api/passengers/{id}',
        handler: packagesHandlers.deletePassenger            
    },       
    {
        method: 'POST',
        path: '/api/packages',
        handler: packagesHandlers.addPackage,
        options: {
            validate: {
                payload: Joi.object({
                    documentNumber: Joi.string().min(8).max(8).required(),
                    passengerName: Joi.string().required(),
                    flightNumber: Joi.string().min(5).max(5).required(),
                    packageName: Joi.string().required(),
                    packageType: Joi.string().valid('BIG', 'SMALL', 'CLOTHING').required(),
                }),
                failAction: (request, h, error) => {
                    return error.isJoi ?
                        h.response(createJSONResponse(false, "Validate Error", error.details[0])).takeover() :
                        h.response(error).takeover()
                }
            }
        }
    }

]

module.exports = routes;