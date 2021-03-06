/**
 * @author @vranahub.
 * @license MIT
 * @version 0.0.5
 * Module for integrating with the Pay U payment service throught Node.js.
 */
let PhoneNumber = require("awesome-phonenumber");
let querystring = require("querystring");
let Promise = require("bluebird");
let ip = require("ip");
let axios = require("axios");
let md5 = require("md5");
const countries = require("i18n-iso-countries");

/* Util modules */
let ErrorUtils = require("../../utils/error.utils");

let Config = require("./config");
let config = {};

let Subscriber = module.exports = {
    init: (options) => {
        config = Config.init(options);
        return config;
    },
    create: (subscriber) => {
        return new Promise(async (resolve, reject) => {
            try {
                let phone = new PhoneNumber(subscriber.phone, "BR").getNumber("significant");
                let birthDate = (subscriber.birthDate || "").replace(/\//g, "-");
                let expirationYear = subscriber.instrument.expirationYear;
                expirationYear = expirationYear.substring(2, 4);
                if (subscriber.address && subscriber.address.country && (subscriber.address.country.length < 3))
                    subscriber.address.country = countries.toAlpha3(subscriber.address.country);
                /* Sender information */
                let data = {
                    id: subscriber.reference,
                    code: subscriber.reference,
                    fullname: subscriber.name,
                    email: subscriber.email,
                    phone_area_code: phone ? phone.substring(0, 2) : undefined,
                    phone_number: phone ? phone.substring(2, phone.length) : undefined,
                    birthdate_day: birthDate.substring(0, 2),
                    birthdate_month: birthDate.substring(3, 5),
                    birthdate_year: birthDate.substring(6, 10),
                    cpf: subscriber.document.number ? subscriber.document.number.replace(/[^\d]/g, "") : undefined,
                    address: {
                        street: subscriber.address.street ? subscriber.address.street.split(",")[0] : "",
                        number: subscriber.address.number,
                        complement: subscriber.address.complement,
                        district: subscriber.address.neighbourhood,
                        city: subscriber.address.city,
                        state: subscriber.address.state,
                        country: subscriber.address.country,
                        zipcode: subscriber.address.postalCode ? subscriber.address.postalCode.replace(/[^\d]/g, "") : undefined,
                    },
                };
                let instrumentIsCreditCard = subscriber.instrument && subscriber.instrument.expirationMonth;
                if (instrumentIsCreditCard) {
                    data.billing_info = {
                        credit_card: {
                            holder_name: subscriber.instrument.holder.name,
                            number: subscriber.instrument.number.replace(/ /g, ""),
                            expiration_month: subscriber.instrument.expirationMonth,
                            expiration_year: expirationYear
                        }
                    };
                }
                let url = `${Config.gateway_url}/assinaturas/v1/customers?new_vault=true`;
                let response = (await axios.post(url, data, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Basic ${Config.base64Auth}`
                    }
                })).data;
                resolve(data);
            } catch (e) {
                ErrorUtils.handle(reject, e);
            }
        });
    },
    read: (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                let url = `${Config.gateway_url}/assinaturas/v1/customers/${id}`;
                let response = (await axios.get(url, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Basic ${Config.base64Auth}`
                    }
                })).data;
                resolve(response);
            } catch (e) {
                ErrorUtils.handle(reject, e);
            }
        });
    },
    list: () => {
        return new Promise(async (resolve, reject) => {
            try {
                let url = `${Config.gateway_url}/assinaturas/v1/customers`;
                let response = (await axios.get(url, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Basic ${Config.base64Auth}`
                    }
                })).data;
                resolve(response);
            } catch (e) {
                ErrorUtils.handle(reject, e);
            }
        });
    }
}