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
var http_1 = require('@angular/http');
require('rxjs/add/operator/toPromise');
var PlayerService = (function () {
    function PlayerService(http) {
        this.http = http;
        this.playersUrl = 'http://localhost:3005/players'; // URL to web api
        this.players = [];
        this.initMoney = 10000000;
        this.money = 10000000;
        this.count = 0;
        this.loaded = false;
    }
    PlayerService.prototype.getData = function (id) {
        var _this = this;
        this.userId = id;
        if (this.loaded)
            return;
        this.http.get(this.playersUrl)
            .toPromise()
            .then(function (response) {
            _this.players = response.json();
            _this.getTeam();
        })
            .catch(this.handleError);
    };
    PlayerService.prototype.togglePlayer = function (player) {
        if (!player.selected) {
            if (this.money < player.cost) {
                return { status: false, msg: 'Not enough money!' };
            }
            else if (this.players.filter(function (p) { return p.selected; }).length > 14) {
                return { status: false, msg: 'Only 15 players allowed!' };
            }
            else if (this.money >= player.cost) {
                this.money -= player.cost;
                this.count++;
            }
        }
        else {
            this.money += player.cost;
            this.count--;
        }
        var selected = !player.selected;
        var idx = this.players.indexOf(this.players.filter(function (p) { return p.id == player.id; })[0]);
        var toggledPlayer = Object.assign({}, this.players[idx], { selected: selected });
        this.players = this.players.slice(0, idx).concat([
            toggledPlayer
        ], this.players.slice(idx + 1));
        return { status: true, msg: 'Success!' };
    };
    PlayerService.prototype.togglePos = function (player, pos) {
        var idx = this.players.indexOf(this.players.filter(function (p) { return p.id == player.id; })[0]);
        var toggledPlayer = Object.assign({}, this.players[idx], { pos: pos });
        this.players = this.players.slice(0, idx).concat([
            toggledPlayer
        ], this.players.slice(idx + 1));
        // console.log(toggledPlayer);
        return toggledPlayer;
    };
    PlayerService.prototype.getPlayerType = function (type, players) {
        return players.filter(function (player) { return player.type === type; });
    };
    // Add new Player
    PlayerService.prototype.saveTeam = function (uid, pid, teamName) {
        var headers = new http_1.Headers({
            'Content-Type': 'application/json' });
        var data = { uid: uid, pid: pid, team_name: teamName };
        return this.http
            .post('http://localhost:3005/save_team', JSON.stringify(data), { headers: headers })
            .toPromise()
            .then(function (res) { return res.text(); })
            .catch(this.handleError);
    };
    PlayerService.prototype.saveFormation = function (formation) {
        var uid = 1;
        var headers = new http_1.Headers({
            'Content-Type': 'application/json' });
        var data = { uid: uid, formation: formation };
        return this.http
            .post('http://localhost:3005/save_formation', JSON.stringify(data), { headers: headers })
            .toPromise()
            .then(function (res) { return res.text(); })
            .catch(this.handleError);
    };
    // Add new Player
    PlayerService.prototype.getTeam = function () {
        var _this = this;
        var headers = new http_1.Headers({
            'Content-Type': 'application/json' });
        var data = { uid: this.userId };
        this.http
            .post('http://localhost:3005/get_team', JSON.stringify(data), { headers: headers })
            .toPromise()
            .then(function (res) {
            var op = res.json();
            _this.teamName = op.team_name;
            if (op.formation_set != 1)
                _this.positionsSet = true;
            var _loop_1 = function(player) {
                var match = op.players.filter(function (p) { return p.player_id == player.id; })[0];
                if (match) {
                    _this.togglePlayer(player);
                    if (op.formation_set != 1) {
                        // console.log(match);
                        console.log(match.pos);
                        _this.togglePos(player, { pos: match.pos, idx: match.idx });
                    }
                }
            };
            for (var _i = 0, _a = _this.players; _i < _a.length; _i++) {
                var player = _a[_i];
                _loop_1(player);
            }
            _this.loaded = true;
        })
            .catch(this.handleError);
    };
    // saveTeam(uid: number, pid: number): string {
    //   let headers = new Headers();
    //   headers.append('Content-Type', 'application/json');
    //   let url = `${this.playersUrl}/${player.id}`;
    //   return this.http
    //              .put(url, JSON.stringify(player), {headers: headers})
    //              .toPromise()
    //              .then(() => player)
    //              .catch(this.handleError);
    //   }
    // }
    // getPlayer(id: number) {
    //   return this.getPlayers()
    //              .then(players => players.filter(player => player.id === id)[0]);
    // }
    PlayerService.prototype.save = function (player) {
        if (player.id) {
            return this.put(player);
        }
        return this.post(player);
    };
    PlayerService.prototype.delete = function (player) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var url = this.playersUrl + "/" + player.id;
        return this.http
            .delete(url, headers)
            .toPromise()
            .catch(this.handleError);
    };
    // Add new Player
    PlayerService.prototype.post = function (player) {
        var headers = new http_1.Headers({
            'Content-Type': 'application/json' });
        return this.http
            .post(this.playersUrl, JSON.stringify(player), { headers: headers })
            .toPromise()
            .then(function (res) { return res.json().data; })
            .catch(this.handleError);
    };
    // Update existing Player
    PlayerService.prototype.put = function (player) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var url = this.playersUrl + "/" + player.id;
        return this.http
            .put(url, JSON.stringify(player), { headers: headers })
            .toPromise()
            .then(function () { return player; })
            .catch(this.handleError);
    };
    PlayerService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    PlayerService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], PlayerService);
    return PlayerService;
}());
exports.PlayerService = PlayerService;
//# sourceMappingURL=player.service.js.map