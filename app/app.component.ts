import { Component, OnInit } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, Router } from '@angular/router-deprecated';
import { LoginComponent }  from './login.component';
import { HomeComponent }  from './home.component';
import { FormationComponent } from './formation.component';
import { PlayerService } from './player.service';
// import { PlayersComponent }     from './players.component';
// import { PlayerDetailComponent } from './player-detail.component';

@Component({
  selector: 'my-app',
  template: `
    <router-outlet></router-outlet>
  `,
  styleUrls: ['app/app.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [
    ROUTER_PROVIDERS,
    PlayerService
  ]
})
@RouteConfig([
  { path: '/login',  name: 'Login',  component: LoginComponent, useAsDefault: true },
  { path: '/home', name: 'Home', component: HomeComponent },
  { path: '/formation', name: 'Formation', component: FormationComponent }
])
export class AppComponent implements OnInit {
  constructor(private router: Router, public playerService:PlayerService) { }
  loggedIn: boolean = false;


  ngOnInit() {
    this.loggedIn = JSON.parse(window.localStorage.getItem('loggedIn'));
    if(this.loggedIn){
      console.log('loggedIn');
      this.router.navigate(['Home']);
    } else {
      console.log('not loggedIn');
      this.router.navigate(['Login']);
    }
  }
}
