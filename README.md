# Lookup.Api

<img src="https://user-images.githubusercontent.com/75196744/123205334-512ea280-d4d7-11eb-9e27-6f974170bbc7.png" height="140" align="right">

<!--
[![npm @valexe-technologies/lookup.api package](https://img.shields.io/npm/v/@valexe-technologies/lookup.api)](https://www.npmjs.com/package/@valexe-technologies/lookup.api)
-->
[![github @valexe-technologies/lookup.api issues](https://img.shields.io/github/issues/ValEXE-Technologies/Lookup.Api)](https://github.com/ValEXE-Technologies/Lookup.Api/issues)
[![github @valexe-technologies/lookup.api forks](https://img.shields.io/github/forks/ValEXE-Technologies/Lookup.Api)](https://github.com/ValEXE-Technologies/Lookup.Api/network/members)
[![github @valexe-technologies/lookup.api stargazers](https://img.shields.io/github/stars/ValEXE-Technologies/Lookup.Api)](https://github.com/ValEXE-Technologies/Lookup.Api/stargazers)
[![github @valexe-technologies/lookup.api license](https://img.shields.io/github/license/ValEXE-Technologies/Lookup.Api)](https://github.com/ValEXE-Technologies/Lookup.Api/LICENSE)

`Lookup.Api` is a [Node](https://nodejs.dev/) library which provides the RESTApi wrapper over [Lookup.Services](https://github.com/ValEXE-Technologies/Lookup.Services).

## Getting Started

To setup and run `Lookup.Api` in your local machine, follow 3 simple steps:

### Clone github Repo

```bash
git clone https://github.com/ValEXE-Technologies/Lookup.Api.git
```

### Install `npm` packages

```bash
npm i
```

### Run

```bash
npm run start
```

This should start `nodemon` secure server on `Port# 5001` and you should see message on console

```bash
Lookup RESTApi listening at https://localhost:5001
```

## RESTApi

### Check Status

The status API to check whether application is up and running and is in healthy state to serve the requests.

```bash
/api/status
```

#### Usage

```bash
curl https://localhost:5001/api/status
```

#### Response

```json
{
  "status": "Successful",
  "message": "Lookup RESTApi is up and running",
  "data": null
}
```

### Supported Currencies

```bash
/api/referenceData/currencies
```

#### Usage

```bash
curl https://localhost:5001/api/referenceData/currencies
```

#### Response

Returns JSON object with value of `data` property as collection of supported currencies.

```json
{
  "status": "Successful",
  "message": null,
  "data": [
    {
        "code": "INR",
        "symbol": "₹",
        "name": "Indian Rupee"
    },
    {
        "code": "USD",
        "symbol": "$",
        "name": "United States of America"
    }
  ]
}
```

### Registrars

> `:currency` must be value of currency `code` from [Supported Currencies](#supported-currencies); like `INR`, `USD`, etc.

```bash
/api/domain/:currency/registrars
```

#### Usage

```bash
curl https://localhost:5001/api/domain/INR/registrars
```

#### Response

Returns JSON object with value of `data` property as collection of registrars.

```json
{
  "status": "Successful",
  "message": null,
  "data": [
    {
        "name": "GoDaddy",
        "baseUrl": "https://in.godaddy.com",
        "currencyCodes": [ "INR", "USD" ],  
        "features": [ "Basic DNS" ]
    },
    {
        "name": "BigRock",
        "baseUrl": "https://www.bigrock.in",
        "currencyCodes": [ "INR", "USD" ],
        "features": [
          "Basic DNS",
          "2 Email Accounts",
          "Domain Forwarding",
          "URL Masking",
          "DNS Management",
          "Domain Theft Protection"
        ]
    }
  ]
}
```

### Domain Availability

> `:domainNameWithTLD` must be complete domain name including TLD; like `.com`, `.co.in`, etc.

```bash
/api/domain/isAvailable/:domainNameWithTLD
```

#### Usage

```bash
curl https://localhost:5001/api/domain/isAvailable/whatblarandomdomainxyz.com
```

#### Response

Returns JSON object with value of `data` property as `true` if domain is available and `false` if domain is not available.

```json
{
  "status": "Successful",
  "message": null,
  "data": true or false
}
```

### Domain Price

> `:currency` must be value of currency `code` from [Supported Currencies](#supported-currencies); like `INR`, `USD`, etc.
> 
> `:registrar` must be value of registrar `name` from [Registrars](#registrars); like `GoDaddy`, `BigRock`, etc.
> 
> `:domainNameWithTLD` must be complete domain name including TLD; like `.com`, `.co.in`, etc.

```bash
/api/domain/:currency/:registrar/:domainNameWithTLD/price
```

#### Usage

```bash
curl https://localhost:5001/api/domain/INR/BigRock/whatblarandomdomainxyz.com/price
```

#### Response

Returns JSON object with value of `data` property with domain price and registrar url.

```json
{
  "status": "Successful",
  "message": null,
  "data": {
    "url": "https://www.bigrock.in",
    "price": 799
  }
}
```
