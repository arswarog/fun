import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AppComponent} from './app.component';

const routes: Routes = [
  {path: 'genaille-lucas', loadChildren: './genaille-lucas/genaille-lucas.module#GenailleLucasModule'},
  {path: 'sudoku', loadChildren: './sudoku/sudoku.module#SudokuModule'},
  {path: '**', redirectTo: '/'},
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, {useHash: true}),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
