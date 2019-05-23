# respire-hybrid-app

Made with love by [148 ❤︎](https://148.fr)  
Please follow us on [Facebook](https://www.facebook.com/weare148), [Instagram](https://www.instagram.com/weare148/) and [LinkedIn](https://www.linkedin.com/company/agence-148)   
And check our shots on [Dribbble](https://dribbble.com/weare148) !  

If you want to support [Respire Asso](https://www.respire-asso.org/dons/), you can make a donation  
And follow them on [Facebook](https://www.facebook.com/AssociationRespire/) !  
  

Based on [vue-cordova-demo](https://github.com/kartsims/vue-cordova-demo).

## How-to

**Install NPM dependencies and build static files**

``` bash
npm install
```

**Test in iOS**

``` bash
npm run ios
```
**Test in Android**

``` bash
npm run android
```

**Test in browser**

``` bash
npm run browser
```

> Testing in the browser only allows you to test a very few plugins as Cordova emulates poorly most plugins in the browsers. This can still be useful to tweak the demo app quickly (hot reloading, yay!), instead of building the script files each time you want to preview your changes.

Thanks to [barryvdh](https://github.com/barryvdh) for implementing this feature.

**Test in other platforms**

This demo *should* work on any platform.

It has been tested on OSX only, to build an iOS app. Please let me know how it did for you on your setup.

## Troubleshooting

If you can't access the demo chances are you don't meet Cordova requirements, check them by typing :

``` bash
npm run check
```
