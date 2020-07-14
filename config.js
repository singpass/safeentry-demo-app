var config = {};

config.test = {
    appId: "STG2-MYINFO-SELF-TEST",
    privateKeyPath: "./cert/stg-myinfo-2018.pem",
    publicCertPath: "./cert/pub.stg.consent.myinfo.gov.sg.cer"
};

/* PRODUCTION
    Please replace "XXX" with your own credentials
*/
// config.production = {
//     appId: "XXX",
//     privateKeyPath: "XXX",
//     publicCertPath: "./cert/pub.consent.myinfo.gov.sg.cer"
// };

module.exports = config;