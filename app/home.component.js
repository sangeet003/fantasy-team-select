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
var header_component_1 = require('./header.component');
var player_component_1 = require('./player.component');
var selected_pipe_1 = require('./selected.pipe');
var type_pipe_1 = require('./type.pipe');
var HomeComponent = (function () {
    function HomeComponent(router, playerService) {
        this.router = router;
        this.playerService = playerService;
    }
    HomeComponent.prototype.onSelect = function (player) {
        var select = this.playerService.togglePlayer(player);
        if (!select.status) {
            alert(select.msg);
        }
    };
    HomeComponent.prototype.onNext = function () {
        var selectedPlayers = this.playerService.players.filter(function (player) { return Boolean(player.selected) === true; });
        var playerIds = [];
        if (selectedPlayers.length == 15
            && this.playerService.getPlayerType('Goal-Keeper', selectedPlayers).length >= 1
            && this.playerService.getPlayerType('Defender', selectedPlayers).length >= 3
            && this.playerService.getPlayerType('Attacker', selectedPlayers).length >= 1
            && this.playerService.teamName != '') {
            for (var i = 0; i < selectedPlayers.length; i++) {
                playerIds.push(selectedPlayers[i].id);
            }
            this.playerService.saveTeam(1, playerIds, this.playerService.teamName)
                .then(function (res) {
                if (res == 'success') {
                    alert('Team Saved!');
                }
                else {
                    alert('Error saving team');
                }
            });
        }
        else {
            alert('error');
        }
    };
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'home',
            templateUrl: 'app/home.component.html',
            styleUrls: ['app/home.component.css'],
            pipes: [selected_pipe_1.SelectedPipe, type_pipe_1.PlayerTypePipe],
            directives: [player_component_1.PlayerComponent, header_component_1.HeaderComponent, router_deprecated_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [router_deprecated_1.Router, player_service_1.PlayerService])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map