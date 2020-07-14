var security = require('./security.js');
var qs = require('querystring');
var jwe = require('./jwe.js');
var fs = require('fs');
var requestHandler = require('./requestHandler.js');

var env = process.argv[2];
var STAGE_PREFIX;
if(env == "production"){
    STAGE_PREFIX = "api";
}
else if (env == "test"){
    STAGE_PREFIX = "test.api";
}

var seEntryUrl = "https://"+STAGE_PREFIX+".safeentry-qr.gov.sg/partner/v1/entry";

exports.callEntry = async function (data, config){
    var url = seEntryUrl
    var urlObj = new URL(url);
    
    var method = "POST";
    var strContentType = "";
    var params = {};

    params.jose = await jwe.encryptCompactJWE(fs.readFileSync(config[env].publicCertPath).toString(), JSON.stringify(data));
    
    // Content-Type must be "application/jose"
    var header = {
        "Content-Type": "application/jose"
    };
    header.Authorization = security.generateSHA256withRSAHeader(urlObj.origin+urlObj.pathname, params, method, strContentType, config[env].appId, config[env].privateKeyPath, "")
        
    return requestHandler.getResponse(urlObj.host, urlObj.pathname, header, method, params.jose);
}