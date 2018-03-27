/* External Dependencies */
let moment = require("moment");
let Promise = require("bluebird");
let CardInfo = require("@polvo-labs/card-type");

/* Internal Modules */
let Utils = require("../utils/utils");

let CardUtils = module.exports = {
    getBrand: async (cardNumber) => {
        return new Promise((resolve, reject) => {
            let brand = CardInfo.cardType(cardNumber);
            resolve(brand);
        });
    },
    initExpirationDates: async () => {
        return new Promise((resolve, reject) => {
            let expiration = {
                months: [],
                years: []
            };
            for (let month = 1; month <= 12; month++) {
                expiration.months.push(Utils.pad(month));
            }
            for (let year = 0; year <= 30; year++) {
                expiration.years.push(moment().add(year, "years").format("YYYY"));
            }
            resolve(expiration);
        });
    }
}