<p align="center">
<a href="https://www.ndi-api.gov.sg/safeentry">
  <img width="150" src="https://www.ndi-api.gov.sg/assets/img/safe-entry/SafeEntry_logo_inline.png">
  </a>
</p>

# Safe Entry Demo App


This is a demo application meant to illustrate how to integrate your application with Safe Entry


## Contents

- [1. Quick Start](#quick-start)
- [2. How To Use](#how-to-use)
- [3. Enable Payload Encryption & PKI Digital Signature](#pki)
- [4. Possible scenarios](#possible-scenarios)
    - [4.1. Single tenant SafeEntry QR app](#possible-scenarios-single)
    - [4.2. Multiple tenants SafeEntry QR app](#possible-scenarios-multiple)

<br/>



## <a name="quick-start"></a>1. Quick Start

### 1.1 Install Node and NPM (_skip this step if you have NPM installed_)

For the demo application to run, you will need to install Node and NPM.

Follow the instructions given by the links below depending on your OS.

- [Install Node and NPM for Windows](http://blog.teamtreehouse.com/install-node-js-npm-windows)
- [Install Node and NPM for Linux](http://blog.teamtreehouse.com/install-node-js-npm-linux)
- [Install Node and NPM for Mac](http://blog.teamtreehouse.com/install-node-js-npm-mac)


### 1.2 Run NPM install

Run the following command in the folder you unzipped the application:

```
npm install
```

### 1.3 Start the Application

Execute the following command to call the Entry API:
```
npm run entry
```


## <a name="how-to-use"></a>2. How To Use

You are allowed to change the following configurations in the files below: 

| File |Configs|
|---|---|
|`index.js`| Sample checkin or checkout data |
|`config.js`| Application ID (AppId) and certificates|




## <a name="pki"></a>3. Enable Payload Encryption & PKI Digital Signature

To enable payload encryption and signing. 

`WIP`


## <a name="possible-scenarios"></a>4. Possible scenarios

### <a name="possible-scenarios-single"></a>4.1 Single tenant SafeEntry QR app

<table>
  <tr>
    <th>Scenarios</th>
    <th>Sample data</th>   
    <th>Response (Body)</th>
  </tr>
  <tr>
    <td>Success</td>
    <td><pre lang="json">
{
    "subType": "uinfin",
    "actionType": "checkin",
    "sub": "S9960846C",
    "venueId": "STG-180000001W-83338-SEQRSELFTESTSINGLE-SE",
    "mobileno": "92376345"
}
    </pre></td>
    <td>
    Http status code: <span style="color:green">201</span></br>
    Body: < empty >
    </td>
  </tr>
  <tr>
    <td>Fail - Missing field</td>
    <td><pre lang="json">
{
    "actionType": "checkin",
    "sub": "S9960846C",
    "venueId": "STG-180000001W-83338-SEQRSELFTESTSINGLE-SE",
    "mobileno": "92376345"
}
    </pre></td>  
    <td>
    Http status code: <span style="color:red">400</span></br>
    Body: {"code":400,"message":"Missing subType"}
    </td>
  </tr>
  <tr>
    <td>Fail - Invalid sub type. Only allow "uinfin" or "others</td>
    <td><pre lang="json">
{
    "subType": "test",
    "actionType": "checkin",
    "sub": "S9960846C",
    "venueId": "STG-180000001W-83338-SEQRSELFTESTSINGLE-SE",
    "mobileno": "92376345"
}
    </pre></td>  
    <td>
    Http status code: <span style="color:red">400</span></br>
    Body: {"code":400,"message":"Invalid subType"}
    </td>
  </tr>
  <tr>
    <td>Fail - Invalid venue</td>
    <td><pre lang="json">
{
    "subType": "uinfin",
    "actionType": "checkin",
    "sub": "S9960846C",
    "venueId": "test",
    "mobileno": "92376345"
}
    </pre></td>  
    <td>
    Http status code: <span style="color:red">400</span></br>
    Body: {"code":400,"message":"Invalid venue"}
    </td>
  </tr>  
  <tr>
    <td>Fail - Invalid uinfin</td>
    <td><pre lang="json">
{
    "subType": "uinfin",
    "actionType": "checkin",
    "sub": "test",
    "venueId": "STG-180000001W-83338-SEQRSELFTESTSINGLE-SE",
    "mobileno": "92376345"
}
    </pre></td>  
    <td>
    Http status code: <span style="color:red">400</span></br>
    Body: {"code":400,"message":"Invalid uinfin"}
    </td>
  </tr>   
  <tr>
    <td>Fail - Invalid mobileno</td>
    <td><pre lang="json">
{
    "subType": "uinfin",
    "actionType": "checkin",
    "sub": "S9960846C",
    "venueId": "STG-180000001W-83338-SEQRSELFTESTSINGLE-SE",
    "mobileno": "test"
}
    </pre></td>  
    <td>
    Http status code: <span style="color:red">400</span></br>
    Body: {"code":400,"message":"Invalid mobileno"}
    </td>
  </tr>   
</table>



### <a name="possible-scenarios-multiple"></a>4.2 Multiple tenants SafeEntry QR app


<table>
  <tr>
    <th>Scenarios</th>
    <th>Sample data</th>   
    <th>Response (Body)</th>
  </tr>
  <tr>
    <td>Success</td>
    <td><pre lang="json">
{
    "subType": "uinfin",
    "actionType": "checkin",
    "sub": "S9960846C",
    "venueId": "STG-180000001W-409531-SEQRSELFTESTMULTIPLE-SE",
    "mobileno": "92376345",
    "tenantId": "VENUE1"
}
    </pre></td>
    <td>
    Http status code: <span style="color:green">201</span></br>
    Body: < empty >
    </td>
  </tr>
  <tr>
    <td>Fail - Missing tenantId. TenantId is mandatory for Multiple tenant SafeEntry QR app</td>
    <td><pre lang="json">
{
    "subType": "uinfin",
    "actionType": "checkin",
    "sub": "S9960846C",
    "venueId": "STG-180000001W-409531-SEQRSELFTESTMULTIPLE-SE",
    "mobileno": "92376345"
}
    </pre></td>  
    <td>
    Http status code: <span style="color:red">400</span></br>
    Body: {"code":400,"message":"Missing tenantId"}
    </td>
  </tr>   
  <tr>
    <td>Fail - Invalid tenantId. TenantId does not exist in SafeEntry QR app</td>
    <td><pre lang="json">
{
    "subType": "uinfin",
    "actionType": "checkin",
    "sub": "S9960846C",
    "venueId": "STG-180000001W-409531-SEQRSELFTESTMULTIPLE-SE",
    "mobileno": "92376345"
    "tenantId": "test"
}
    </pre></td>  
    <td>
    Http status code: <span style="color:red">400</span></br>
    Body: {"code":400,"message":"Invalid tenantId"}
    </td>
  </tr>     
</table>

## Reporting Issue

You may contact our [support](mailto:support@myinfo.gov.sg?subject=[SafeEntry]%20Sample%20App) for any other technical issues, and we will respond to you within 5 working days.
