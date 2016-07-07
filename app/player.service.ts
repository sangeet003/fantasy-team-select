import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Player } from './player';
@Injectable()
export class PlayerService {
  private playersUrl = 'http://localhost:3005/players';  // URL to web api
  public players: Player[] = [];
  public initMoney: number = 10000000;
  public money: number = 10000000;
  public count: number = 0;
  public teamName: string;
  public positionsSet: boolean;
  public loaded: boolean = false;
  private userId: number;


  constructor(private http: Http) { }



  getData(id:number) {
    this.userId = id;
    if(this.loaded)
      return;

    this.http.get(this.playersUrl)
      .toPromise()
      .then(response => {
        this.players = response.json();
        this.getTeam();
      })
      .catch(this.handleError);
  }

  togglePlayer(player: Player):any {
    if(!player.selected){
      if(this.money < player.cost){
          return {status: false, msg: 'Not enough money!'};
      } else if (this.players.filter(p => p.selected).length > 14){
          return {status: false, msg: 'Only 15 players allowed!'};
      } else if (this.money >= player.cost){
        this.money -= player.cost;
        this.count++;
      }
    }
    else{
      this.money += player.cost;
      this.count--;
    }
    const selected = !player.selected;
    const idx = this.players.indexOf(this.players.filter(p => p.id == player.id)[0]);
    const toggledPlayer = Object.assign({}, this.players[idx], {selected});
    this.players = [
      ...this.players.slice(0, idx),
      toggledPlayer,
      ...this.players.slice(idx + 1)
    ];

    return {status: true, msg: 'Success!'};
  }

  togglePos(player: Player, pos:any): Player{
    const idx = this.players.indexOf(this.players.filter(p => p.id == player.id)[0]);
    const toggledPlayer = Object.assign({}, this.players[idx], {pos});
    this.players = [
      ...this.players.slice(0, idx),
      toggledPlayer,
      ...this.players.slice(idx + 1)
    ];
    // console.log(toggledPlayer);
    return toggledPlayer;
  }

  getPlayerType(type: string, players:Player[]): Player[]{
    return players.filter((player)=> player.type === type);
  }

  // Add new Player
  saveTeam(uid:number, pid:number[], teamName:string):Promise<any> {
    let headers = new Headers({
      'Content-Type': 'application/json'});
    let data = {uid: uid, pid: pid, team_name: teamName};
    return this.http
               .post('http://localhost:3005/save_team', JSON.stringify(data), {headers: headers})
               .toPromise()
               .then(res => res.text())
               .catch(this.handleError);
  }

  saveFormation(formation:any[]){
    let uid:number = 1;
    let headers = new Headers({
      'Content-Type': 'application/json'});
    let data = {uid: uid, formation: formation};
    return this.http
               .post('http://localhost:3005/save_formation', JSON.stringify(data), {headers: headers})
               .toPromise()
               .then(res => res.text())
               .catch(this.handleError);
  }

  // Add new Player
  getTeam() {
    let headers = new Headers({
      'Content-Type': 'application/json'});
    let data = {uid: this.userId};
    this.http
           .post('http://localhost:3005/get_team', JSON.stringify(data), {headers: headers})
           .toPromise()
           .then(res => {
              let op = res.json();
              this.teamName = op.team_name;
              if(op.formation_set != 1)
              this.positionsSet = true;
              for (let player of this.players) {
                let match = op.players.filter(p => p.player_id == player.id)[0];
                if(match){
                    this.togglePlayer(player);
                    if(op.formation_set != 1){
                      // console.log(match);
                      console.log(match.pos);
                      this.togglePos(player, {pos: match.pos, idx: match.idx});
                    }
                }
              }


             this.loaded = true;
           })
           .catch(this.handleError);
  }

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

  save(player: Player): Promise<Player>  {
    if (player.id) {
      return this.put(player);
    }
    return this.post(player);
  }

  delete(player: Player) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let url = `${this.playersUrl}/${player.id}`;
    return this.http
               .delete(url, headers)
               .toPromise()
               .catch(this.handleError);
  }

  // Add new Player
  private post(player: Player): Promise<Player> {
    let headers = new Headers({
      'Content-Type': 'application/json'});
    return this.http
               .post(this.playersUrl, JSON.stringify(player), {headers: headers})
               .toPromise()
               .then(res => res.json().data)
               .catch(this.handleError);
  }

  // Update existing Player
  private put(player: Player) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let url = `${this.playersUrl}/${player.id}`;
    return this.http
               .put(url, JSON.stringify(player), {headers: headers})
               .toPromise()
               .then(() => player)
               .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
