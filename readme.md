# Safe Entry Demo App

This is a demo application meant to illustrate how to integrate your application with Safe Entry

## Safe Entry Demo App Setup

### 1.1 Install Node and NPM

In order for the demo application to run, you will need to install Node and NPM.

Follow the instructions given by the links below depending on your OS.

- [Install Node and NPM for Windows](http://blog.teamtreehouse.com/install-node-js-npm-windows)
- [Install Node and NPM for Linux](http://blog.teamtreehouse.com/install-node-js-npm-linux)
- [nstall Node and NPM for Mac](http://blog.teamtreehouse.com/install-node-js-npm-mac)


### 1.2 Run NPM install

Run the following command in the folder you unzipped the application:
```
npm install
```

## To call Safe Entry API

API input parameters can be changed in:
```
index.js
```

AppId and Cert path can be changed in:
```
config.js
```


### 2.1 Entry

Run the following command in the folder you unzipped the application:
```
npm run entry
```

### Possible scenarios:

### Single tenant SafeEntry QR app

**Success**

Sample data:
```
{
    "subType": "uinfin",
    "actionType": "checkin",
    "sub": "S9960846C",
    "venueId": "STG-180000001W-83338-SEQRSELFTESTSINGLE-SE",
    "mobileno": "92376345"
}
```

Response:
```
Http status code: 201
Body: <empty>
```

**Fail - Missing field**

Sample data:
```
{
    "actionType": "checkin",
    "sub": "S9960846C",
    "venueId": "STG-180000001W-83338-SEQRSELFTESTSINGLE-SE",
    "mobileno": "92376345"
}
```

Response:
```
Http status code: 400
Body: {"code":400,"message":"Invalid subType"}
```


**Fail - Invalid sub type. Only allow "uinfin" or "others"**

Sample data:
```
{
    "subType": "test",
    "actionType": "checkin",
    "sub": "S9960846C",
    "venueId": "STG-180000001W-83338-SEQRSELFTESTSINGLE-SE",
    "mobileno": "92376345"
}
```

Response:
```
Http status code: 400
Body: {"code":400,"message":"Invalid subType"}
```


**Fail - Invalid venue**

Sample data:
```
{
    "subType": "uinfin",
    "actionType": "checkin",
    "sub": "S9960846C",
    "venueId": "test",
    "mobileno": "92376345"
}
```

Response:
```
Http status code: 400
Body: {"code":400,"message":"Invalid venue"}
```


**Fail - Invalid uinfin**

Sample data:
```
{
    "subType": "uinfin",
    "actionType": "checkin",
    "sub": "test",
    "venueId": "STG-180000001W-83338-SEQRSELFTESTSINGLE-SE",
    "mobileno": "92376345"
}
```

Response:
```
Http status code: 400
Body: {"code":400,"message":"Invalid uinfin"}
```


**Fail - Invalid mobileno**

Sample data:
```
{
    "subType": "uinfin",
    "actionType": "checkin",
    "sub": "S9960846C",
    "venueId": "STG-180000001W-83338-SEQRSELFTESTSINGLE-SE",
    "mobileno": "test"
}
```

Response:
```
Http status code: 400
Body: {"code":400,"message":"Invalid mobileno"}
```

#### Multiple tenant SafeEntry QR app

**Success**

Sample data:
```
{
    "subType": "uinfin",
    "actionType": "checkin",
    "sub": "S9960846C",
    "venueId": "STG-180000001W-409531-SEQRSELFTESTMULTIPLE-SE",
    "mobileno": "92376345",
    "tenantId": "VENUE1"
}
```

Response:
```
Http status code: 201
Body: <empty>
```


**Fail - Missing tenantId. TenantId is mandatory for Multiple tenant SafeEntry QR app**

Sample data:
```
{
    "subType": "uinfin",
    "actionType": "checkin",
    "sub": "S9960846C",
    "venueId": "STG-180000001W-409531-SEQRSELFTESTMULTIPLE-SE",
    "mobileno": "92376345"
}
```

Response:
```
Http status code: 400
Body: {"code":400,"message":"Missing tenantId"}
```