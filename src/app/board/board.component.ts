import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Tile } from '../models/Tile';
import { TileComponent } from '../tile/tile.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  isX: boolean = true;
  isWon: boolean = false;
  move: number = 0;
  board: number[] = Array(9).fill(0);

  @ViewChildren(TileComponent)
  tiles!: QueryList<TileComponent>;

  newGame() {
    this.isX = !this.isX;
    this.tiles.forEach(c => c.reset());
    this.board = Array(9).fill(0);
    this.move = 0;
    this.isWon = false;
  }

  onClick(tile: Tile): void {
    this.isX = tile.turn;
    this.board[tile.position] = tile.turn ? 1 : 2;
    if(this.checkForWinner()){
      console.log(`${this.isX ? 'O' : 'X'} Won!`);
      this.tiles.forEach(t => t.wasClicked = true);
      this.isWon = true;
    }
    this.move++;
  }

  checkForWinner(): boolean{
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
        return true;
      }
    }
    return false;
  }
}
