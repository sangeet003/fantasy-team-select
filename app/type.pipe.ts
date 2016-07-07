import { Pipe } from '@angular/core';

@Pipe ({
  name: "type"
})
export class PlayerTypePipe {
  transform(players, type){
    return players.filter((player) => player.type === type);
  }
}
