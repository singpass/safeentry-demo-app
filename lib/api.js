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
else if (env == "sandbox"){
    STAGE_PREFIX = "sandbox.api";
}

var seEntryUrl = "https://"+STAGE_PREFIX+".safeentry-qr.gov.sg/partner/v1/entry";

exports.callEntry = async function (data, config){
    var url = seEntryUrl
    var urlObj = new URL(url);
    
    var method = "POST";
    var strContentType = "";
    var params = {};

    var body;

    var header;
    if(config[env].security){
        // if using security, Content-Type must be "application/jose"
        header = {
            "Content-Type": "application/jose"
        };
        params.jose = await jwe.encryptCompactJWE(fs.readFileSync(config[env].publicCertPath).toString(), JSON.stringify(data));
        header.Authorization = security.generateSHA256withRSAHeader(urlObj.origin+urlObj.pathname, params, method, strContentType, config[env].appId, config[env].privateKeyPath, "");
        body = params.jose;
    }
    else{
        header = {
            "Content-Type": "application/json"
        };
        body = JSON.stringify(data);
    }
        
    return requestHandler.getResponse(urlObj.host, urlObj.pathname, header, method, body);
}