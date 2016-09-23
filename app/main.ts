// This code initializes the platform that your application runs in,
// then uses the platform to bootstrap your AppModule.
//
// Because the QuickStart application runs directly in the browser,
// main.ts imports the platformBrowserDynamic function
// from @angular/platform-browser-dynamic, not @angular/core.
// On a mobile device, you might load a module with Apache Cordova or NativeScript,
// using a bootstrap function that's specific to that platform.

import { platformBrowserDynamic }       from '@angular/platform-browser-dynamic';
import { AppModule }                    from './app.module';

const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule)
    .then(success => console.log('Boostrap success'))
    .catch(error => console.log(error));