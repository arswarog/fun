import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { GenailleLucasModule } from '../genaille-lucas.module';
import { GenailleLucasService, ISection } from '../genaille-lucas.service';

export type IRulerSection = {
  numbers: number[];
  count: number;
  target: number;
}[];

@Component({
  selector   : 'app-ruler',
  templateUrl: './ruler.component.html',
  styleUrls  : ['./ruler.component.scss'],
})
export class RulerComponent implements OnChanges {

  @Input() public index: number  = 0;
  @Input() public digit: number  = 0;
  @Input() public rIndex: number = 0;

  public sections: IRulerSection[] = [];

  constructor(private service: GenailleLucasService) { }

  ngOnChanges(changes: SimpleChanges) {
    if ('index' in changes)
      if (this.service.rulers[this.index])
        this.sections = this.service.rulers[this.index].sections.map(translateForView);
  }
}

export function translateForView(section: ISection): IRulerSection {
  let start = 0;

  return section.relations.map(
    rel => {
      const ret    = {
        numbers: section.numbers.slice(start, start + rel.count),
        count  : rel.count,
        target : rel.target - start,
      };
      start += rel.count;
      return ret;
    },
  );
}
