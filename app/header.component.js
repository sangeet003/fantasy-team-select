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
var player_service_1 = require('./player.service');
var selected_pipe_1 = require('./selected.pipe');
var type_pipe_1 = require('./type.pipe');
var HeaderComponent = (function () {
    function HeaderComponent(router, playerService) {
        this.router = router;
        this.playerService = playerService;
    }
    HeaderComponent.prototype.ngOnInit = function () {
        var user = JSON.parse(window.localStorage.getItem('user')) || {};
        this.playerService.getData(user.id);
    };
    HeaderComponent.prototype.onSignOut = function () {
        window.localStorage.clear();
        this.playerService.teamName = '';
        this.playerService.money = this.playerService.initMoney;
        this.playerService.players = [];
        this.playerService.count = 0;
        this.playerService.loaded = false;
        this.router.navigate(['Login']);
    };
    HeaderComponent = __decorate([
        core_1.Component({
            selector: 'header-renderer',
            templateUrl: 'app/header.component.html',
            styleUrls: ['app/header.component.css'],
            pipes: [selected_pipe_1.SelectedPipe, type_pipe_1.PlayerTypePipe],
            directives: []
        }), 
        __metadata('design:paramtypes', [router_deprecated_1.Router, player_service_1.PlayerService])
    ], HeaderComponent);
    return HeaderComponent;
}());
exports.HeaderComponent = HeaderComponent;
//# sourceMappingURL=header.component.js.map