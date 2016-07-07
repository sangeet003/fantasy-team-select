"use strict";
// import { XHRBackend } from '@angular/http';
// import { InMemoryBackendService, SEED_DATA } from 'angular2-in-memory-web-api';
// import { InMemoryDataService }               from './in-memory-data.service';
// The usual bootstrapping imports
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var http_1 = require('@angular/http');
var ng2_dnd_1 = require('ng2-dnd/ng2-dnd');
var app_component_1 = require('./app.component');
platform_browser_dynamic_1.bootstrap(app_component_1.AppComponent, [
    http_1.HTTP_PROVIDERS,
    ng2_dnd_1.DND_PROVIDERS
]);
//# sourceMappingURL=main.js.map