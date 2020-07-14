var api = require('./lib/api.js');
var config = require('./config.js');

// Testing data - START //
/* NOTE 
* venueId is the unique id of the SafeEntry QR venue used to checkin/checkout
*/

// Staging - Example for Single checkin
var data = {
    "subType": "uinfin",
    "actionType": "checkin",
    "sub": "S9960846C",
    "venueId": "STG2-SAFE-ENTRY-SELF-TEST-SINGLE",
    "mobileno": "92376345"
};

// Staging - Example for Multiple checkin
// var data = {
//     "subType": "uinfin",
//     "actionType": "checkin",
//     "sub": "S9960846C",
//     "venueId": "STG2-SAFE-ENTRY-SELF-TEST",
//     "mobileno": "92376345",
//     "tenantId": "ohlala"
// };



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