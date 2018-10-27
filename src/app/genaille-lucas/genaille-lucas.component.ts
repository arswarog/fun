import { Component, OnInit } from '@angular/core';

@Component({
  selector   : 'app-genaille-lucas',
  templateUrl: './genaille-lucas.component.html',
  styleUrls  : ['./genaille-lucas.component.scss'],
})
export class GenailleLucasComponent implements OnInit {

  rulers = [3, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  constructor() { }

  ngOnInit() {
  }

}
