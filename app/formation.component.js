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
var ng2_dnd_1 = require('ng2-dnd/ng2-dnd');
var router_deprecated_1 = require('@angular/router-deprecated');
var player_1 = require('./player');
var player_service_1 = require('./player.service');
var header_component_1 = require('./header.component');
var player_component_1 = require('./player.component');
var selected_pipe_1 = require('./selected.pipe');
var type_pipe_1 = require('./type.pipe');
var positioned_pipe_1 = require('./positioned.pipe');
var FormationComponent = (function () {
    function FormationComponent(router, playerService) {
        this.router = router;
        this.playerService = playerService;
        this.team = {
            gk: player_1.Player[1] = [],
            df: player_1.Player[4] = [],
            mf: player_1.Player[4] = [],
            at: player_1.Player[2] = []
        };
        this.teamComplete = false;
        this.formation = [];
    }
    FormationComponent.prototype.ngOnInit = function () {
        // this.playerService.players = [...this.playerService.players];
        console.log(this.playerService.players.filter(function (p) { return p.selected == true; }));
        this.team = {
            gk: player_1.Player[1] = this.playerService.players.filter(function (player) {
                if (player.pos && player.pos.pos === 'gk')
                    return true;
            }),
            df: player_1.Player[4] = this.playerService.players.filter(function (player) {
                if (player.pos && player.pos.pos === 'df')
                    return true;
            }),
            mf: player_1.Player[4] = this.playerService.players.filter(function (player) {
                if (player.pos && player.pos.pos === 'mf')
                    return true;
            }),
            at: player_1.Player[2] = this.playerService.players.filter(function (player) {
                if (player.pos && player.pos.pos === 'at')
                    return true;
            })
        };
    };
    FormationComponent.prototype.transferDataSuccess = function ($event, pos, posIdx) {
        if (this.team[pos][posIdx] != undefined) {
            this.playerService.togglePos(this.team[pos][posIdx], undefined);
        }
        this.team[pos][posIdx] = this.playerService.togglePos($event.dragData, { pos: pos, idx: posIdx });
        this.formation = [];
        this.formation = this.formation.concat(this.team.gk).concat(this.team.df).concat(this.team.mf).concat(this.team.at);
        if (this.formation.length == 11) {
            this.teamComplete = true;
        }
    };
    FormationComponent.prototype.onNext = function () {
        // this.formation = [];
        // this.formation = formation.concat(this.team.gk).concat(this.team.df).concat(this.team.mf).concat(this.team.at);
        debugger;
        var selected = this.playerService.players.filter(function (player) { return Boolean(player.selected); });
        var teamJSON = [];
        for (var i = 0; i < selected.length; i++) {
            if (!selected[i].pos)
                teamJSON.push({ id: selected[i].id, idx: -1, pos: 'b' });
            else
                teamJSON.push({ id: selected[i].id, idx: selected[i].pos.idx, pos: selected[i].pos.pos });
        }
        this.playerService.saveFormation(teamJSON).then(function (res) {
            if (res == 'success')
                alert('Formation Saved!');
            else
                alert('Error Saving Formation!');
        });
    };
    FormationComponent = __decorate([
        core_1.Component({
            selector: 'formation',
            // changeDetection: ChangeDetectionStrategy.OnPush,
            templateUrl: 'app/formation.component.html',
            styleUrls: ['app/formation.component.css'],
            pipes: [selected_pipe_1.SelectedPipe, type_pipe_1.PlayerTypePipe, positioned_pipe_1.PositionedPipe],
            directives: [player_component_1.PlayerComponent, header_component_1.HeaderComponent, ng2_dnd_1.DND_DIRECTIVES, router_deprecated_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [router_deprecated_1.Router, player_service_1.PlayerService])
    ], FormationComponent);
    return FormationComponent;
}());
exports.FormationComponent = FormationComponent;
//# sourceMappingURL=formation.component.js.map