import { Component, Input, OnInit } from '@angular/core';
import { Cell } from '../core';

@Component({
  selector   : 'cell',
  templateUrl: './cell.component.html',
  styleUrls  : ['./cell.component.scss'],
})
export class CellComponent implements OnInit {

  @Input() cell: Cell = new Cell(0, 0);

  constructor() { }

  ngOnInit() {
  }
}

@Component({
  selector   : 'cell-span',
  template: `<span [hidden]="hidden" [ngClass]="{exclude: exclude}">{{val}}</span>`,
  styles  : ['.exclude {text-decoration: line-through; color: lightgrey}'],
})
export class CellSpanComponent implements OnInit {

  @Input() cell: Cell = new Cell(0, 0);
  @Input() val: string;

  get hidden() {
    return this.cell.available.indexOf(this.val) === -1;
  }

  get exclude() {
    return this.cell.exclude.indexOf(this.val) !== -1;
  }

  constructor() { }

  ngOnInit() {
  }
}
