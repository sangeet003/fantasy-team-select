import { Pipe } from '@angular/core';

@Pipe ({
  name: "positioned"
})
export class PositionedPipe {
  transform(players, value){
    // console.log("selectedPipe:" + value);
    return players.filter((player) => {
      return (player.pos != undefined && player.pos.pos !== null && player.pos.pos != 'b') === JSON.parse(value);
    });
  }
}
