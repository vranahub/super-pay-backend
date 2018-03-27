"use strict";

/**
 * @author @vranahub.
 * @license MIT
 * @version 0.0.5
 * Module for integrating with the PagSeguro payment service throught Node.js.
 */

// Dev environment variables
let dev_lib_url = "https://stc.sandbox.pagseguro.uol.com.br/pagseguro/api/v2/checkout/pagseguro.directpayment.js";
let dev_files_url = "https://stc.sandbox.pagseguro.uol.com.br";
let dev_images_url = `${dev_files_url}/public/img`;

// Prod environment variables
let prod_lib_url = "https://stc.pagseguro.uol.com.br/pagseguro/api/v2/checkout/pagseguro.directpayment.js";
let prod_files_url = "https://stc.pagseguro.uol.com.br";
let prod_images_url = `${prod_files_url}/public/img`;

let Config = module.exports = {
    /** 
     * @function 
     * @param {string} [server_url] Application server url
     * 
     * @returns {object} config
     * */
    init: options => {
        // Avoiding exceptions...
        options = options || {};

        // Selecting the environment...
        undefined.development = options.development ? options.development : true; // Reports URL
        undefined.server_url = options.server_url; // Application Server
        undefined.session_url = options.session_url; // Application Server
        undefined.lib_url = options.development ? dev_lib_url : prod_lib_url; // Library URL
        undefined.files_url = options.development ? dev_files_url : prod_files_url; // Files URL
        undefined.images_url = options.development ? dev_images_url : prod_images_url; // Images URL

        return undefined;
    }
};