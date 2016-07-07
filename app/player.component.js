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
// import { DND_DIRECTIVES } from 'ng2-dnd/ng2-dnd';
var PlayerComponent = (function () {
    function PlayerComponent() {
        this.toggle = new core_1.EventEmitter();
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PlayerComponent.prototype, "player", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], PlayerComponent.prototype, "toggle", void 0);
    PlayerComponent = __decorate([
        core_1.Component({
            selector: 'player-item',
            // encapsulation: ViewEncapsulation.None,
            template: "\n    <span class=\"player-element\">\n      <span class=\"id\">#{{ player.id }}</span>\n      <div class=\"info\">\n        <span class=\"name\">{{ player.name }}</span>\n        <span class=\"type\">{{ player.type }}</span>\n        <span class=\"cost\">{{ player.cost | currency:'USD':true }}</span>\n      </div>\n      <span *ngIf=\"!player.selected\" class=\"btn add\" (click)=\"toggle.emit(player)\">Add</span>\n      <span *ngIf=\"player.selected\" class=\"btn remove\" (click)=\"toggle.emit(player)\">Remove</span>\n    </span>",
            styleUrls: ['app/player.component.css']
        }), 
        __metadata('design:paramtypes', [])
    ], PlayerComponent);
    return PlayerComponent;
}());
exports.PlayerComponent = PlayerComponent;
//# sourceMappingURL=player.component.js.map