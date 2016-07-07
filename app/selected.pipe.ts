import { Pipe } from '@angular/core';

@Pipe ({
  name: "selected"
})
export class SelectedPipe {
  transform(players, value){
    // console.log("selectedPipe:" + value);
    return players.filter((player) => {
      player.selected = player.selected == undefined ? false : player.selected;
      return JSON.parse(player.selected) === JSON.parse(value);
    });
  }
}
