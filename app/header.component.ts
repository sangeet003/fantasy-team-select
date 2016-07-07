import { Component, OnInit }         from '@angular/core';
import { Router } from '@angular/router-deprecated';

import { PlayerService } from './player.service';
import { SelectedPipe } from './selected.pipe';
import { PlayerTypePipe } from './type.pipe';

@Component({
  selector: 'header-renderer',
  templateUrl: 'app/header.component.html',
  styleUrls: ['app/header.component.css'],
  pipes: [SelectedPipe, PlayerTypePipe],
  directives: []
})
export class HeaderComponent implements OnInit {
  title: 'Header';
  error: any;
  constructor(private router: Router, private playerService: PlayerService) { }
  ngOnInit(){
    let user = JSON.parse(window.localStorage.getItem('user')) || {};
    this.playerService.getData(user.id);
  }

  onSignOut(){
    window.localStorage.clear();
    this.playerService.teamName = '';
    this.playerService.money = this.playerService.initMoney;
    this.playerService.players = [];
    this.playerService.count = 0;
    this.playerService.loaded = false;
    this.router.navigate(['Login']);
  }
}
