"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * @author @vranahub.
 * @license MIT
 * @version 0.0.5
 * Module for integrating with the Pay U payment service throught Node.js.
 */
let Promise = require("bluebird");
let querystring = require("querystring");
let axios = require("axios");
let moment = require("moment-mini");

let Config = require("./config");
let Utils = require("./utils");
let CardUtils = require("../../utils/card.utils");
let ErrorUtils = require("../../utils/error.utils");

let formatCardNumber = cardNumber => {
    return cardNumber.replace(/ /g, "");
};
/* let dev_card_brand_url = `${config.images_url}/payment-methods-flags/42x20`; */

let config = {};

let Card = module.exports = {
    init: options => {
        config = Config.init(options); // Initialize module.
        return Card; // Returns the module.
    },
    create: (() => {
        var _ref = _asyncToGenerator(function* (card, xAccessToken) {
            return new Promise((() => {
                var _ref2 = _asyncToGenerator(function* (resolve, reject) {
                    try {
                        let reqConfig = { headers: {} };
                        if (xAccessToken) reqConfig.headers["x-access-token"] = xAccessToken;
                        let tokenize_card_url = `${config.server_url}/card`;
                        let tokenized = (yield axios.post(tokenize_card_url, card, reqConfig)).data;
                        resolve(tokenized);
                    } catch (e) {
                        ErrorUtils.handle(reject, e);
                    }
                });

                return function (_x3, _x4) {
                    return _ref2.apply(this, arguments);
                };
            })());
        });

        return function create(_x, _x2) {
            return _ref.apply(this, arguments);
        };
    })(),
    delete: (() => {
        var _ref3 = _asyncToGenerator(function* (card, xAccessToken) {
            return new Promise((() => {
                var _ref4 = _asyncToGenerator(function* (resolve, reject) {
                    try {
                        let reqConfig = { headers: {} };
                        if (xAccessToken) reqConfig.headers["x-access-token"] = xAccessToken;
                        let delete_card_url = `${config.server_url}/card/${card.id}`;
                        let deleted = (yield axios.delete(delete_card_url, reqConfig)).data;
                        resolve(deleted);
                    } catch (e) {
                        ErrorUtils.handle(reject, e);
                    }
                });

                return function (_x7, _x8) {
                    return _ref4.apply(this, arguments);
                };
            })());
        });

        return function _delete(_x5, _x6) {
            return _ref3.apply(this, arguments);
        };
    })(),
    list: (() => {
        var _ref5 = _asyncToGenerator(function* (customer, xAccessToken) {
            return new Promise((() => {
                var _ref6 = _asyncToGenerator(function* (resolve, reject) {
                    try {
                        let reqConfig = { headers: {} };
                        if (xAccessToken) reqConfig.headers["x-access-token"] = xAccessToken;
                        let list_cards_url = `${config.server_url}/customer/${customer.id}/cards`;
                        let list = (yield axios.get(list_cards_url, reqConfig)).data;
                        resolve(list);
                    } catch (e) {
                        ErrorUtils.handle(reject, e);
                    }
                });

                return function (_x11, _x12) {
                    return _ref6.apply(this, arguments);
                };
            })());
        });

        return function list(_x9, _x10) {
            return _ref5.apply(this, arguments);
        };
    })(),
    getExpirationOptions: (() => {
        var _ref7 = _asyncToGenerator(function* () {
            return CardUtils.initExpirationDates();
        });

        return function getExpirationOptions() {
            return _ref7.apply(this, arguments);
        };
    })()
};