import { Component }         from '@angular/core';
import { DND_DIRECTIVES } from 'ng2-dnd/ng2-dnd';
import { Router, ROUTER_DIRECTIVES } from '@angular/router-deprecated';

import { Player } from './player';
import { PlayerService } from './player.service';
import { HeaderComponent } from './header.component';
import { PlayerComponent } from './player.component';
import { SelectedPipe } from './selected.pipe';
import { PlayerTypePipe } from './type.pipe';
import { PositionedPipe } from './positioned.pipe';

@Component({
  selector: 'formation',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'app/formation.component.html',
  styleUrls: ['app/formation.component.css'],
  pipes: [SelectedPipe, PlayerTypePipe, PositionedPipe],
  directives: [PlayerComponent, HeaderComponent, DND_DIRECTIVES, ROUTER_DIRECTIVES]
})
export class FormationComponent {
  title: 'Create Formation';
  error: any;
  team = {
    gk:Player[1] = [],
    df:Player[4] = [],
    mf:Player[4] = [],
    at:Player[2] = []
  }
  teamComplete: boolean = false;
  formation: Player[] = [];

  constructor(private router: Router, private playerService: PlayerService) { }

  ngOnInit(){
    // this.playerService.players = [...this.playerService.players];
    console.log(this.playerService.players.filter(p => p.selected == true));
    this.team = {
      gk:Player[1] = this.playerService.players.filter(player => {
        if(player.pos && player.pos.pos === 'gk')
          return true;
      }),
      df:Player[4] = this.playerService.players.filter(player => {
        if(player.pos && player.pos.pos === 'df')
          return true;
      }),
      mf:Player[4] = this.playerService.players.filter(player => {
        if(player.pos && player.pos.pos === 'mf')
          return true;
      }),
      at:Player[2] = this.playerService.players.filter(player => {
        if(player.pos && player.pos.pos === 'at')
          return true;
      })
    }

  }


  transferDataSuccess($event, pos:string, posIdx:number) {
    if(this.team[pos][posIdx] != undefined){
        this.playerService.togglePos(<Player>this.team[pos][posIdx], undefined);
    }
    this.team[pos][posIdx] = this.playerService.togglePos(<Player>$event.dragData, {pos, idx: posIdx});
    this.formation = [];
    this.formation = this.formation.concat(this.team.gk).concat(this.team.df).concat(this.team.mf).concat(this.team.at);
    if(this.formation.length == 11){
      this.teamComplete = true;
    }
  }

  onNext(){
    // this.formation = [];
    // this.formation = formation.concat(this.team.gk).concat(this.team.df).concat(this.team.mf).concat(this.team.at);
    debugger;
    let selected:Player[] = this.playerService.players.filter(player => Boolean(player.selected));
    let teamJSON = [];
    for (let i = 0; i < selected.length; i++) {
        if(!selected[i].pos)
          teamJSON.push({id: selected[i].id, idx: -1, pos: 'b'});
        else
          teamJSON.push({id: selected[i].id, idx: selected[i].pos.idx, pos: selected[i].pos.pos});
    }
    this.playerService.saveFormation(teamJSON).then(res => {
      if(res == 'success')
        alert('Formation Saved!');
      else
        alert('Error Saving Formation!');
    })
  }

}
