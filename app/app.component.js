"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_deprecated_1 = require('@angular/router-deprecated');
var login_component_1 = require('./login.component');
var home_component_1 = require('./home.component');
var formation_component_1 = require('./formation.component');
var player_service_1 = require('./player.service');
// import { PlayersComponent }     from './players.component';
// import { PlayerDetailComponent } from './player-detail.component';
var AppComponent = (function () {
    function AppComponent(router, playerService) {
        this.router = router;
        this.playerService = playerService;
        this.loggedIn = false;
    }
    AppComponent.prototype.ngOnInit = function () {
        this.loggedIn = JSON.parse(window.localStorage.getItem('loggedIn'));
        if (this.loggedIn) {
            console.log('loggedIn');
            this.router.navigate(['Home']);
        }
        else {
            console.log('not loggedIn');
            this.router.navigate(['Login']);
        }
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: "\n    <router-outlet></router-outlet>\n  ",
            styleUrls: ['app/app.component.css'],
            directives: [router_deprecated_1.ROUTER_DIRECTIVES],
            providers: [
                router_deprecated_1.ROUTER_PROVIDERS,
                player_service_1.PlayerService
            ]
        }),
        router_deprecated_1.RouteConfig([
            { path: '/login', name: 'Login', component: login_component_1.LoginComponent, useAsDefault: true },
            { path: '/home', name: 'Home', component: home_component_1.HomeComponent },
            { path: '/formation', name: 'Formation', component: formation_component_1.FormationComponent }
        ]), 
        __metadata('design:paramtypes', [router_deprecated_1.Router, player_service_1.PlayerService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map