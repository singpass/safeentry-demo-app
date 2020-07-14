const https = require('https');

/*
	domain - The domain of the URL
	requestPath - The url that is requesting
	headers - The headers of the request
	method - The request method
*/
exports.getResponse = function (domain, requestPath, headers, method, body){
  return new Promise((resolve, reject) => {
    var requestOptions = {
      method: method,
      protocol:"https:",
      hostname: domain,
      port: 443,
      path: requestPath,
      headers: headers
    };

    console.log("requestOptions: ",requestOptions);

    requestOptions.agent = new https.Agent(requestOptions);

    var request = new Promise((resolve, reject) => {
      console.log("http requesting...");
      let callRequest = https.request(requestOptions, (resp) => {
        let data = '';

        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
          data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
          console.log("resolving...");
          console.log("Headers:", resp.headers);
          if (resp.statusCode == 200) {
            resolve({"statusCode": resp.statusCode, "msg": data});
          } else {
            reject({"statusCode": resp.statusCode, "msg": data});
          }
        });

        resp.on('error', (e) => {
          reject({"statusCode": resp.statusCode, "msg": e});
        });
      });
      callRequest.end(body);
    });

  	request
    .then(data => {
      var response = data;
      resolve(response);
    })
    .catch(error => {
      reject(error);
    });
  });
};
