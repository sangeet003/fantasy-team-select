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
var http_1 = require('@angular/http');
require('rxjs/add/operator/toPromise');
// import { HeroFormComponent } from './hero-form.component'
var LoginComponent = (function () {
    function LoginComponent(router, http) {
        this.router = router;
        this.http = http;
        this.apiUrl = 'http://fantasy-team-select.herokuapp.com/'; // URL to web api
        this.username = "sangeet";
        this.password = "sangeet";
        this.error = "";
    }
    LoginComponent.prototype.doLogin = function (username, password) {
        var _this = this;
        var headers = new http_1.Headers({
            'Content-Type': 'application/json' });
        var data = { name: username, password: password };
        this.http
            .post(this.apiUrl + 'login', JSON.stringify(data), { headers: headers })
            .toPromise()
            .then(function (res) {
            var op = res.json();
            console.log(op);
            if (op.status === 'success') {
                window.localStorage.setItem('loggedIn', 'true');
                window.localStorage.setItem('user', JSON.stringify(op.user));
                _this.router.navigate(['Home']);
            }
            else {
                alert('Invalid Username / Password!');
            }
        })
            .catch(console.log);
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'login',
            templateUrl: 'app/login.component.html',
            styleUrls: ['app/login.component.css']
        }), 
        __metadata('design:paramtypes', [router_deprecated_1.Router, http_1.Http])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map