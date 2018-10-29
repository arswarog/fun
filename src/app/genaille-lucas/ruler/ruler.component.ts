import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {GenailleLucasModule} from '../genaille-lucas.module';
import {GenailleLucasService, ISection} from '../genaille-lucas.service';

export type IRulerSection = {
  numbers: number[];
  count: number;
  target: number;
  active: boolean;
}[];

@Component({
  selector: 'app-ruler',
  templateUrl: './ruler.component.html',
  styleUrls: ['./ruler.component.scss'],
})
export class RulerComponent implements OnChanges {

  @Input() public digit: number = 0;
  @Input() public factor: number = 0;
  @Input() public rIndex: number = 0;

  public sections: IRulerSection[] = [];
  public numInIndex: number = null;

  constructor(private service: GenailleLucasService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('digit' in changes)
      if (this.service.rulers[this.digit])
        this.sections = this.service.rulers[this.digit].sections.map(translateForView);

    if ('factor' in changes || 'rIndex' in changes) {
      this.numInIndex = (this.sections[this.factor - 1][0].numbers[0] + this.rIndex) % 10;
      for (let start = 0, i = 0; i < this.sections[this.factor - 1].length; i++) {
        const sub = this.sections[this.factor - 1][i];
        start += sub.numbers.length;
        if (this.rIndex < start) {
          sub.active = true;
          break;
        }
      }
    }
  }
}

export function translateForView(section: ISection): IRulerSection {
  let start = 0;

  return section.relations.map(
    rel => {
      const ret = {
        numbers: section.numbers.slice(start, start + rel.count),
        count: rel.count,
        target: rel.target - start,
        active: false,
      };
      start += rel.count;
      return ret;
    },
  );
}
