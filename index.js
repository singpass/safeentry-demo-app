var api = require('./lib/api.js');
var config = require('./config.js');

// Testing data - START //
/* NOTE 
* venueId is the unique id of the SafeEntry QR venue used to checkin/checkout
*/

// Staging - Example for Venue with no destination configured
var data = {
    "subType": "uinfin",
    "actionType": "checkin",
    "sub": "S9960846C",
    "venueId": "STG-180000001W-83338-SEQRSELFTESTSINGLE-SE",
    "mobileno": "92376345"
};

// Staging - Example for Venue with multiple destinations (e.g. Lobby, Swimming Pool, Restaurant)
// var data = {
//     "subType": "uinfin",
//     "actionType": "checkin",
//     "sub": "S9960846C",
//     "venueId": "STG-180000001W-409531-SEQRSELFTESTMULTIPLE-SE",
//     "mobileno": "92376345",
//     "tenantId": "VENUE1"
// };



// Testing data - END //

var apiType = process.argv[3];

if (apiType == "entry") {
    // Call SE Entry API

    api.callEntry(data, config)
        .then(result => {
            console.log("Success! \nBody:");
        })
        .catch(error => {
            console.log("Error! \nBody:",error);
        });
}