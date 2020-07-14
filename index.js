var api = require('./lib/api.js');
var config = require('./config.js');

// Testing data - START //
var seQrInfoUrl = "https://staging.safeentry-qr.gov.sg/login/STG2-SAFE-ENTRY-SELF-TEST";

var lat = 1.275424514596223;
var long = 103.7993860244751;

var data = {
    "subType": "uinfin",
    "actionType": "checkin",
    "sub": "S9812381D",
    "venueId": "STG2-SAFE-ENTRY-SELF-TEST-SINGLE",
    "mobileno": "12345678"
};

// Testing data - END //

var apiType = process.argv[3];

if (apiType == "entry") {
    // Call SE Entry API

    api.callEntry(data, config)
        .then(result => {
            console.log(result);
        })
        .catch(error => {
            console.log(error);
        });
}