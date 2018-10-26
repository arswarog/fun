import { Component, HostListener, OnInit } from '@angular/core';
import { Cell, Matrix } from './core';

@Component({
  selector   : 'app-sudoku',
  templateUrl: './sudoku.component.html',
  styleUrls  : ['./sudoku.component.scss'],
})
export class SudokuComponent implements OnInit {

  matrix: Matrix = new Matrix('default');

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    console.log(event);
    let sel = this.matrix.selected;
    switch (event.code) {
      case 'Numpad1':
      case 'Digit1':
      case 'Numpad2':
      case 'Digit2':
      case 'Numpad3':
      case 'Digit3':
      case 'Numpad4':
      case 'Digit4':
      case 'Numpad5':
      case 'Digit5':
      case 'Numpad6':
      case 'Digit6':
      case 'Numpad7':
      case 'Digit7':
      case 'Numpad8':
      case 'Digit8':
      case 'Numpad9':
      case 'Digit9':
        const key = event.code.substring(event.code.length - 1);
        if (event.shiftKey)
          this.matrix.exclude(key);
        else
          this.matrix.setValue(key);
        break;
      case 'KeyR':
        if (event.shiftKey)
          this.matrix.reset(event.ctrlKey);
        else if (this.matrix.selected) {
          this.matrix.selected.reset();
          this.matrix.checkMatrix();
        }
        break;
      case 'Space':
      case 'Enter':
      case 'NumpadEnter':
        this.matrix.findTrivial();
        break;
      case 'Numpad0':
      case 'Digit0':
      case 'Delete':
        this.matrix.setValue(null);
        break;
      case 'KeyH':
        if (this.matrix.selected && this.matrix.selected.value)
          this.matrix.selected.hard = !this.matrix.selected.hard;
        this.matrix.save();
        break;
      case 'ArrowLeft':
        if (sel) {
          if (sel.posy) {
            this.matrix.unselect();
            this.matrix.select(this.matrix.cells[sel.posx][sel.posy - 1]);
          }
        }
        else
          this.matrix.select();
        break;
      case 'ArrowRight':
        if (sel) {
          if (sel.posy + 1 < this.matrix.height) {
            this.matrix.unselect();
            this.matrix.select(this.matrix.cells[sel.posx][sel.posy + 1]);
          }
        }
        else
          this.matrix.select();
        break;
      case 'ArrowUp':
        if (sel) {
          if (sel.posx) {
            this.matrix.unselect();
            this.matrix.select(this.matrix.cells[sel.posx - 1][sel.posy]);
          }
        }
        else
          this.matrix.select();
        break;
      case 'ArrowDown':
        if (sel) {
          if (sel.posx + 1 < this.matrix.width) {
            this.matrix.unselect();
            this.matrix.select(this.matrix.cells[sel.posx + 1][sel.posy]);
          }
        }
        else
          this.matrix.select();
        break;
      default:
        return;
    }
    event.stopPropagation();
  }

  constructor() {
  }

  ngOnInit() {
  }
}
