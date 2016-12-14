# ROdiaspora
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Dependency Status](https://david-dm.org/gov-ithub/ro-diaspora/status.svg)](https://david-dm.org/gov-ithub/ro-diaspora)
[![devDependency Status](https://david-dm.org/gov-ithub/ro-diaspora/dev-status.svg)](https://david-dm.org/gov-ithub/ro-diaspora#info=devDependencies)
[![Known Vulnerabilities](https://snyk.io/test/github/gov-ithub/ro-diaspora/8f3d6d079920b7f2e53362e4fb8595e8c28593c4/badge.svg)](https://snyk.io/test/github/gov-ithub/ro-diaspora/8f3d6d079920b7f2e53362e4fb8595e8c28593c4)



<a href='https://play.google.com/store/apps/details?id=com.ionicframework.romanescuapp2146162&hl=en&pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'><img alt='acum pe Google Play' src='https://play.google.com/intl/en_us/badges/images/generic/ro_badge_web_generic.png' width="250"/></a>

## Instalare

```
$> npm install -g ionic cordova

$> git clone https://github.com/gov-ithub/ro-diaspora.git
$> cd ro-diaspora
$> npm cache clean
$> npm install
$> ionic serve
```

----------

## Troubleshooting

### Uncaught (in promise): cordova_not_available
`cordova.js` are trebui să ofere API-uri mock pentru plugin-uri sau alte funcții native, însă nu o face foarte bine. Pentru development / testare în browser, este recomandat să folosiți platforma `browser` în loc de `ionic serve`:

```
ionic platform add browser
ionic run browser
```

În Google Chrome Developer tools puteți folosi `Toggle Devices Toolbar` pentru a simula diverse device-uri, iar ionic va oferi alternative pentru funcțiile native de mobil (geolocation, cameră, accelorometru, splashscreen, etc).

**Made with :heart: by [GovITHub](http://ithub.gov.ro)**
