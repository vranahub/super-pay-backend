"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * @author @vranahub.
 * @license MIT
 * @version 0.0.5
 * Module for integrating with the Pay U payment service throught Node.js.
 */

/* External Dependencies */
let Promise = require("bluebird");
let querystring = require("querystring");
let axios = require("axios");
let moment = require("moment");

let Config = require("./config");
let Globals = require("./globals");
let Utils = require("./utils");

let config = {};

let Session = module.exports = {
    token: "",
    init: (() => {
        var _ref = _asyncToGenerator(function* (options) {
            config = Config.init(options);
            undefined.token = yield undefined.create();
            return undefined;
        });

        return function init(_x) {
            return _ref.apply(this, arguments);
        };
    })(),
    create: () => {
        return new Promise((() => {
            var _ref2 = _asyncToGenerator(function* (resolve, reject) {
                try {
                    let session_url = `${config.server_url}/session`;
                    Globals.sessionToken = (yield axios.get(session_url)).data;
                    Globals.senderHash = PagSeguroDirectPayment.getSenderHash();
                    PagSeguroDirectPayment.setSessionId(Globals.sessionToken);
                    resolve(Globals.sessionToken);
                } catch (e) {
                    console.log(e);
                }
            });

            return function (_x2, _x3) {
                return _ref2.apply(this, arguments);
            };
        })());
    }
};