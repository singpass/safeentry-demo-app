/* This file provides functions to encrypt/decrypt data */
var jose = require('node-jose');

/**
 * Function to decrypt JWE compact serialization Format
 * - pemPrivateKey : Private Key string, PEM format
 * - compactJWE : data in compact serialization format - header.encryptedKey.iv.ciphertext.tag
**/
exports.decryptCompactJWE = function(pemPrivateKey, compactJWE) {
  return new Promise((resolve, reject) => {
    var jweParts = compactJWE.split("."); // header.encryptedKey.iv.ciphertext.tag
    var keystore = jose.JWK.createKeyStore();
    if(jweParts.length != 5){
      reject({"msg":"Internal Server Error"});
    }
    keystore.add(pemPrivateKey, "pem")
      .then(key => {
        // Formulate data into structure for decryption
        var data = {
          "type": "compact",
          "protected": jweParts[0],
          "encrypted_key": jweParts[1],
          "iv": jweParts[2],
          "ciphertext": jweParts[3],
          "tag": jweParts[4],
          "header": JSON.parse(jose.util.base64url.decode(jweParts[0]).toString())
        };
        // Decrypting
        console.log("Decrypting JWE...");
        return jose.JWE.createDecrypt(key)
          .decrypt(data);
      })
      .then(result => {
        // Success! Resolving promise
        console.log("Successfully decrypted JWE!");
        resolve(result.payload.toString());
      })
      .catch(error => {
        console.log("Failed to decrypt JWE!");
        reject(error);
      });
  });
};

/**
 * Function to Encrypt data into JWE compact serialization Format
 * - pemPublicCert : Public Cert string, PEM format
 * - data : data to be encrypted
 * - return : Promise that resolve to encrypted content in JWE compact serialization format
**/
exports.encryptCompactJWE = function(pemPublicCert, data){
  var keystore = jose.JWK.createKeyStore();

  return new Promise(function(resolve, reject) {
    keystore.add(pemPublicCert, "pem")
      .then(key => {
        var keyOpt = {
          format: 'compact',
          fields: {
            alg: "RSA-OAEP",
            enc: "A256GCM"
          }
        };

        return jose.JWE.createEncrypt(keyOpt, key)
          .update(Buffer.from(data))
          .final();
      })
      .then(result => {
        console.log("Successfully encrypted Person Data!");
        resolve(result);
      })
      .catch(error => {
        console.log("Failed to encrypt Person Data!");
        reject(error);
      });
  });
}
