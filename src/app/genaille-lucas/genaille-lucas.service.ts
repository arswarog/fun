import { Injectable } from '@angular/core';

export interface ISection {
  numbers: number[];
  relations: {
    count: number;
    target: number;
  }[];
}

export interface IRuler {
  index: number;
  sections: ISection[];
}

@Injectable({
  providedIn: 'root',
})
export class GenailleLucasService {

  public rulers: IRuler[];

  constructor() {
    this.rulers = range(0, 9).map(generateRulerData);
  }
}

interface IRulerData {
  ruler: number;
  sections: string[];
}

const rulersData: IRulerData[] = [
  {
    ruler   : 0,
    sections: [
      '0->1:0',
      '01->2:0',
      '012->3:0',
      '0123->4:0',
      '01234->5:0',
      '012345->6:0',
      '0123456->7:0',
      '01234567->8:0',
      '012345678->9:0',
    ],
  },
  {
    ruler   : 1,
    sections: [
      '1->1:0',
      '23->2:0',
      '345->3:0',
      '4567->4:0',
      '56789->5:0',
      '678901->4:0,2:1',
      '7890123->3:0,4:1',
      '89012345->2:0,6:1',
      '901234567->1:0,8:1',
    ],
  },
  {
    ruler   : 2,
    sections: [
      '2->1:0',
      '45->2:0',
      '678->3:0',
      '8901->2:0,2:1',
      '01234->5:0',
      '234567->6:0',
      '4567890->6:0,1:1',
      '67890123->4:0,4:1',
      '890123456->2:0,7:1',
    ],
  },
  {
    ruler   : 3,
    sections: [
      '3->1:0',
      '67->2:0',
      '901->1:0,2:1',
      '2345->4:0',
      '56789->5:0',
      '890123->2:0,4:1',
      '1234567->7:0',
      '45678901->6:0,2:1',
      '789012345->3:0,6:1',
    ],
  },
  {
    ruler   : 4,
    sections: [
      //'1->1:0',
      //'23->2:0',
      //'345->3:0',
      //'4567->4:0',
      //'56789->5:0',
      //'678901->4:0,2:1',
      //'7890123->3:0,4:1',
      //'89012345->2:0,6:1',
      //'901234567->1:0,8:1',
    ],
  },
  {
    ruler   : 5,
    sections: [
      //'1->1:0',
      //'23->2:0',
      //'345->3:0',
      //'4567->4:0',
      //'56789->5:0',
      //'678901->4:0,2:1',
      //'7890123->3:0,4:1',
      //'89012345->2:0,6:1',
      //'901234567->1:0,8:1',
    ],
  },
  {
    ruler   : 6,
    sections: [
      //'1->1:0',
      //'23->2:0',
      //'345->3:0',
      //'4567->4:0',
      //'56789->5:0',
      //'678901->4:0,2:1',
      //'7890123->3:0,4:1',
      //'89012345->2:0,6:1',
      //'901234567->1:0,8:1',
    ],
  },
  {
    ruler   : 7,
    sections: [
      //'1->1:0',
      //'23->2:0',
      //'345->3:0',
      //'4567->4:0',
      //'56789->5:0',
      //'678901->4:0,2:1',
      //'7890123->3:0,4:1',
      //'89012345->2:0,6:1',
      //'901234567->1:0,8:1',
    ],
  },
  {
    ruler   : 8,
    sections: [
      //'1->1:0',
      //'23->2:0',
      //'345->3:0',
      //'4567->4:0',
      //'56789->5:0',
      //'678901->4:0,2:1',
      //'7890123->3:0,4:1',
      //'89012345->2:0,6:1',
      //'901234567->1:0,8:1',
    ],
  },
  {
    ruler   : 9,
    sections: [
      //'1->1:0',
      //'23->2:0',
      //'345->3:0',
      //'4567->4:0',
      //'56789->5:0',
      //'678901->4:0,2:1',
      //'7890123->3:0,4:1',
      //'89012345->2:0,6:1',
      //'901234567->1:0,8:1',
    ],
  },
];

export function generateRulerData(index: number): IRuler {
  return {
    index,
    sections: range(1, 9).map(
      sectionIndex => range(1, sectionIndex).reduce(
        (section: ISection, i: number): ISection => {
          const num = (sectionIndex * index + i - 1) % 10;
          section.numbers.push(num);
          if (!num && section.numbers.length > 1) {
            section.relations.push({
              count : 0,
              target: section.relations[section.relations.length - 1].target + 1,
            });
          }
          section.relations[section.relations.length - 1].count++;
          return section;
        },
        {
          numbers  : [],
          relations: [{
            count : 0,
            target: Math.floor(sectionIndex * index / 10),
          }],
        },
      ),
    ),
  };
}

export function unpackRulerData(data: IRulerData): IRuler {
  return {
    index   : data.ruler,
    sections: data.sections.map(
      str => {
        let [numbers, rels] = str.split('->');
        let start           = 0;

        return {
          numbers  : numbers.split('').map(i => +i),
          relations: rels.split(',').map(
            rel => {
              const [c, t] = rel.split(':');
              const ret    = {
                count : +c,
                target: +t,
              };
              //start += +c;
              return ret;
            },
          ),
        };
      },
    ),
  };
}

export function range(start: number): number[];
export function range(start: number, end: number): number[];
export function range(start: number, end?: number): number[] {
  if (end === void 0) {
    end   = start;
    start = 0;
  }

  const result = [];
  for (let i = start; i <= end; i++)
    result.push(i);
  return result;
}
