/**
 * @author @vranahub.
 * @license MIT
 * @version 0.0.5
 * Module for integrating with the Pay U payment service throught Node.js.
 */
let querystring = require('querystring');
let axios = require("axios");
let xmlJS = require("xml-js");
let Promise = require("bluebird");

/* Util modules */
let ErrorUtils = require("../../utils/error.utils");

let Config = require("./config");
let config = {};

let Session = module.exports = {
    init: (options) => {
        config = Config.init(options);
        return Session;
    },
    create: () => {
        return new Promise(async (resolve, reject) => {
            try {
                let session_token_url = `${config.gateway_url}/v2/sessions`;
                let credentials = {
                    email: config.api_email,
                    token: config.api_token
                };
                let url = session_token_url + `?${querystring.stringify(credentials)}`;
                let response = (await axios.post(url)).data;
                let token = xmlJS.xml2js(response, { compact: true }).session.id._text;
                resolve(token);
            } catch (e) {
                ErrorUtils.handle(reject, e);
            }
        });
    }
};