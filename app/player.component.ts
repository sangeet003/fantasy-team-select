import { Component, Input, Output, EventEmitter } from '@angular/core';
// import { DND_DIRECTIVES } from 'ng2-dnd/ng2-dnd';

@Component({
  selector: 'player-item',
  // encapsulation: ViewEncapsulation.None,
  template: `
    <span class="player-element">
      <span class="id">#{{ player.id }}</span>
      <div class="info">
        <span class="name">{{ player.name }}</span>
        <span class="type">{{ player.type }}</span>
        <span class="cost">{{ player.cost | currency:'USD':true }}</span>
      </div>
      <span *ngIf="!player.selected" class="btn add" (click)="toggle.emit(player)">Add</span>
      <span *ngIf="player.selected" class="btn remove" (click)="toggle.emit(player)">Remove</span>
    </span>`,
    styleUrls: ['app/player.component.css']
})
export class PlayerComponent {
  @Input() player;
  @Output() toggle = new EventEmitter();
}
