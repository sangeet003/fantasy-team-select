import { Component }         from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router-deprecated';

import { Player } from './player';
import { PlayerService } from './player.service';
import { HeaderComponent } from './header.component';
import { PlayerComponent } from './player.component';
import { SelectedPipe } from './selected.pipe';
import { PlayerTypePipe } from './type.pipe';

@Component({
  selector: 'home',
  templateUrl: 'app/home.component.html',
  styleUrls: ['app/home.component.css'],
  pipes: [SelectedPipe, PlayerTypePipe],
  directives: [PlayerComponent, HeaderComponent, ROUTER_DIRECTIVES]
})
export class HomeComponent {
  title: 'Select Team';
  error: any;
  constructor(private router: Router, private playerService: PlayerService) { }

  onSelect (player: Player){
    let select:any = this.playerService.togglePlayer(player);
    if(!select.status){
      alert(select.msg);
    }
  }

  onNext(){
    let selectedPlayers : Player[] = this.playerService.players.filter((player)=> Boolean(player.selected) === true);
    let playerIds : number[] = [];

    if(
      selectedPlayers.length == 15
      && this.playerService.getPlayerType('Goal-Keeper', selectedPlayers).length >= 1
      && this.playerService.getPlayerType('Defender', selectedPlayers).length >= 3
      && this.playerService.getPlayerType('Attacker', selectedPlayers).length >= 1
      && this.playerService.teamName != ''
    ){
      for (let i = 0; i < selectedPlayers.length; i++) {
          playerIds.push(selectedPlayers[i].id);
      }
      this.playerService.saveTeam(1, playerIds, this.playerService.teamName)
        .then((res) => {
          if(res == 'success'){
            alert('Team Saved!')
          } else {
            alert('Error saving team');
          }
        });
    } else {
      alert('error');
    }
  }

}
