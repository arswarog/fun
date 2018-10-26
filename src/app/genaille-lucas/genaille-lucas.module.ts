import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GenailleLucasComponent } from './genaille-lucas.component';

const routes: Routes = [
  {
    path     : '',
    component: GenailleLucasComponent,
  },
];

@NgModule({
  imports     : [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [GenailleLucasComponent],
})
export class GenailleLucasModule {}
