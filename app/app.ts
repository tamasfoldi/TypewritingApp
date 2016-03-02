/// <reference path="../node_modules/angular2/typings/browser.d.ts" /> 

import {bootstrap}    from "angular2/platform/browser";
import {MainComponent} from "./main/main.component";
import {Component, provide} from "angular2/core";
import {ROUTER_PROVIDERS, APP_BASE_HREF} from "angular2/router";

bootstrap(MainComponent, [ROUTER_PROVIDERS]);
