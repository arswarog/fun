import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GenailleLucasComponent } from './genaille-lucas.component';
import { GenailleLucasService } from './genaille-lucas.service';
import { IndexRulerComponent } from './index-ruler/index-ruler.component';
import { RulerComponent } from './ruler/ruler.component';
import { TriangleComponent } from './ruler/triangle/triangle.component';

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
  providers   : [
    GenailleLucasService,
  ],
  declarations: [
    GenailleLucasComponent,
    IndexRulerComponent,
    RulerComponent,
    TriangleComponent,
  ],
})
export class GenailleLucasModule {}
