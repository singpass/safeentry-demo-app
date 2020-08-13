const _ = require('lodash');
const crypto = require('crypto');
const querystring = require('querystring');
const uuid = require("uuid");
var qs = require('querystring');
var fs = require('fs');

var security = {};

// Sorts a JSON object based on the key value in alphabetical order
function sortJSON(json) {
  if (_.isNil(json)) {
    return json;
  }

  var newJSON = {};
  var keys = Object.keys(json);
  keys.sort();

  for (var key in keys) {
    newJSON[keys[key]] = json[keys[key]];
  }

  return newJSON;
}

/**
 * @param url Full API URL
 * @param params JSON object of params sent, key/value pair.
 * @param method
 * @param appId ClientId
 * @param keyCertContent Private Key Certificate content
 * @param keyCertPassphrase Private Key Certificate Passphrase
 * @returns {string}
 */
security.generateSHA256withRSAHeader = function(url, params, method, appId, keyCertContent, keyCertPassphrase) {
  var nonceValue = uuid.v4();
  var timestamp = (new Date).getTime();

  // A) Construct the Authorisation Token
  var defaultApexHeaders = {
    "app_id": appId, // App ID assigned to your application
    "nonce": nonceValue, // secure random number
    "signature_method": "RS256",
    "timestamp": timestamp // Unix epoch time
  };

  // B) Forming the Signature Base String

  // i) Normalize request parameters
  var baseParams = sortJSON(_.merge(defaultApexHeaders, params));
  console.log("baseParams:",baseParams);
  var baseParamsStr = qs.stringify(baseParams);
  baseParamsStr = qs.unescape(baseParamsStr);
  console.log("baseParamsStr:",baseParamsStr);

  // ii) construct request URL ---> url is passed in to this function

  // iii) concatenate request elements
  var baseString = method.toUpperCase() + "&" + url + "&" + baseParamsStr;

  console.log("Formulated Base String:");
  console.log(baseString);

  // C) Signing Base String to get Digital Signature
  var signWith = {
    key: fs.readFileSync(keyCertContent, 'utf8')
  };

  if (!_.isUndefined(keyCertPassphrase) && !_.isEmpty(keyCertPassphrase)) _.set(signWith, "passphrase", keyCertPassphrase);

  // Load pem file containing the x509 cert & private key & sign the base string with it.
  var signature = crypto.createSign('RSA-SHA256')
    .update(baseString)
    .sign(signWith, 'base64');

  console.log("Digital Signature:");
  console.log(signature);


  // D) Assembling the Header
  var strApexHeader = "PKI_SIGN timestamp=\"" + timestamp +
    "\",nonce=\"" + nonceValue +
    "\",app_id=\"" + appId +
    "\",signature_method=\"RS256\"" +
    ",signature=\"" + signature +
    "\"";

  return strApexHeader;
};

module.exports = security;
