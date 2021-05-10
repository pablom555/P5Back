const fetch = require("node-fetch");

const createJSONResponse = (ok, message, details) => {

    let jsonResp = {
        ok,
        message
    };

    if (!ok) {
        jsonResp.details = { err: details }
    } else {
        jsonResp.data = details
    }

    return jsonResp;
};

const fetchingApi = async (url) => {

    return fetch(url)

}



module.exports = {
    createJSONResponse,
    fetchingApi,

}