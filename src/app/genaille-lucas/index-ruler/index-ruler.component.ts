import { Component, OnInit } from '@angular/core';
import { GenailleLucasService, ISection, range } from '../genaille-lucas.service';

@Component({
  selector   : 'app-index-ruler',
  templateUrl: './index-ruler.component.html',
  styleUrls  : [
    '../ruler/ruler.component.scss',
    './index-ruler.component.scss',
  ],
})
export class IndexRulerComponent {
  public sections: ISection[];

  constructor(private service: GenailleLucasService) {
    this.sections = range(9).map(
      number => ({
        numbers  : range(0, number - 1),
        relations: null,
      }),
    );

    console.log(this.sections);
  }
}
