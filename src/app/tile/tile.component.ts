import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Tile } from '../models/Tile';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss']
})
export class TileComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() isX!: boolean;
  @Input() position!: number;
  @Output() turn: EventEmitter<Tile> = new EventEmitter();

  sign!: string;

  wasClicked: boolean = false

  onChange(): void {
    if(this.wasClicked === false){
      if(this.isX)
        this.sign = 'X'
      else
        this.sign = 'O'
      this.turn.emit({turn: !this.isX, position: this.position});
      this.wasClicked = true;
    }
  }

  reset(): void{
    this.sign = '';
    this.wasClicked = false;
  }
}
