var config = {};

config.test = {
    appId: "STG2-SEQR-SELF-TEST",
    privateKeyPath: "./cert/stg-myinfo-2018.pem",
    publicCertPath: "./cert/pub.stg.consent.myinfo.gov.sg.cer"
};

/* PRODUCTION
    Please replace "XXX" with necessary credentials
*/
// config.production = {
//     appId: "XXX",
//     privateKeyPath: "XXX",
//     publicCertPath: "XXX"
// };

module.exports = config;