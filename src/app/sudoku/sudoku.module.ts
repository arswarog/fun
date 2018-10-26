import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SudokuComponent } from './sudoku.component';
import { CellComponent, CellSpanComponent } from './cell/cell.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path     : '',
    component: SudokuComponent,
  },
];


@NgModule({
  imports     : [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    SudokuComponent,
    CellComponent,
    CellSpanComponent,
  ],
  bootstrap   : [
    SudokuComponent,
  ],
})
export class SudokuModule {
}
