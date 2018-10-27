import { TestBed } from '@angular/core/testing';

import { GenailleLucasService, generateRulerData, IRuler, unpackRulerData } from './genaille-lucas.service';

describe('GenailleLucasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GenailleLucasService = TestBed.get(GenailleLucasService);
    expect(service).toBeTruthy();
  });

  const ruler0: IRuler = {
    index   : 0,
    sections: [
      {
        numbers  : [0],
        relations: [
          {count: 1, target: 0},
        ],
      },
      {
        numbers  : [0, 1],
        relations: [
          {count: 2, target: 0},
        ],
      },
      {
        numbers  : [0, 1, 2],
        relations: [
          {count: 3, target: 0},
        ],
      },
      {
        numbers  : [0, 1, 2, 3],
        relations: [
          {count: 4, target: 0},
        ],
      },
      {
        numbers  : [0, 1, 2, 3, 4],
        relations: [
          {count: 5, target: 0},
        ],
      },
      {
        numbers  : [0, 1, 2, 3, 4, 5],
        relations: [
          {count: 6, target: 0},
        ],
      },
      {
        numbers  : [0, 1, 2, 3, 4, 5, 6],
        relations: [
          {count: 7, target: 0},
        ],
      },
      {
        numbers  : [0, 1, 2, 3, 4, 5, 6, 7],
        relations: [
          {count: 8, target: 0},
        ],
      },
      {
        numbers  : [0, 1, 2, 3, 4, 5, 6, 7, 8],
        relations: [
          {count: 9, target: 0},
        ],
      },
    ],
  };

  const ruler1: IRuler = {
    index   : 1,
    sections: [
      {
        numbers  : [1],
        relations: [
          {count: 1, target: 0},
        ],
      },
      {
        numbers  : [2, 3],
        relations: [
          {count: 2, target: 0},
        ],
      },
      {
        numbers  : [3, 4, 5],
        relations: [
          {count: 3, target: 0},
        ],
      },
      {
        numbers  : [4, 5, 6, 7],
        relations: [
          {count: 4, target: 0},
        ],
      },
      {
        numbers  : [5, 6, 7, 8, 9],
        relations: [
          {count: 5, target: 0},
        ],
      },
      {
        numbers  : [6, 7, 8, 9, 0, 1],
        relations: [
          {count: 4, target: 0},
          {count: 2, target: 1},
        ],
      },
      {
        numbers  : [7, 8, 9, 0, 1, 2, 3],
        relations: [
          {count: 3, target: 0},
          {count: 4, target: 1},
        ],
      },
      {
        numbers  : [8, 9, 0, 1, 2, 3, 4, 5],
        relations: [
          {count: 2, target: 0},
          {count: 6, target: 1},
        ],
      },
      {
        numbers  : [9, 0, 1, 2, 3, 4, 5, 6, 7],
        relations: [
          {count: 1, target: 0},
          {count: 8, target: 1},
        ],
      },
    ],
  };

  const ruler3: IRuler = {
    index   : 3,
    sections: [
      {
        numbers  : [3],
        relations: [
          {count: 1, target: 0},
        ],
      },
      {
        numbers  : [6, 7],
        relations: [
          {count: 2, target: 0},
        ],
      },
      {
        numbers  : [9, 0, 1],
        relations: [
          {count: 1, target: 0},
          {count: 2, target: 1},
        ],
      },
      {
        numbers  : [2, 3, 4, 5],
        relations: [
          {count: 4, target: 1},
        ],
      },
      {
        numbers  : [5, 6, 7, 8, 9],
        relations: [
          {count: 5, target: 1},
        ],
      },
      {
        numbers  : [8, 9, 0, 1, 2, 3],
        relations: [
          {count: 2, target: 1},
          {count: 4, target: 2},
        ],
      },
      {
        numbers  : [1, 2, 3, 4, 5, 6, 7],
        relations: [
          {count: 7, target: 2},
        ],
      },
      {
        numbers  : [4, 5, 6, 7, 8, 9, 0, 1],
        relations: [
          {count: 6, target: 2},
          {count: 2, target: 3},
        ],
      },
      {
        numbers  : [7, 8, 9, 0, 1, 2, 3, 4, 5],
        relations: [
          {count: 3, target: 2},
          {count: 6, target: 3},
        ],
      },
    ],
  };

  const ruler8: IRuler = {
    index   : 8,
    sections: [
      {
        numbers  : [8],
        relations: [
          {count: 1, target: 0},
        ],
      },
      {
        numbers  : [6, 7],
        relations: [
          {count: 2, target: 1},
        ],
      },
      {
        numbers  : [4, 5, 6],
        relations: [
          {count: 3, target: 2},
        ],
      },
      {
        numbers  : [2, 3, 4, 5],
        relations: [
          {count: 4, target: 3},
        ],
      },
      {
        numbers  : [0, 1, 2, 3, 4],
        relations: [
          {count: 5, target: 4},
        ],
      },
      {
        numbers  : [8, 9, 0, 1, 2, 3],
        relations: [
          {count: 2, target: 4},
          {count: 4, target: 5},
        ],
      },
      {
        numbers  : [6, 7, 8, 9, 0, 1, 2],
        relations: [
          {count: 4, target: 5},
          {count: 3, target: 6},
        ],
      },
      {
        numbers  : [4, 5, 6, 7, 8, 9, 0, 1],
        relations: [
          {count: 6, target: 6},
          {count: 2, target: 7},
        ],
      },
      {
        numbers  : [2, 3, 4, 5, 6, 7, 8, 9, 0],
        relations: [
          {count: 8, target: 7},
          {count: 1, target: 8},
        ],
      },
    ],
  };

  it('generateRulerData (ruler 0)', () => {
    const result = generateRulerData(0);
    expect(result).toEqual(ruler0);
  });

  it('generateRulerData (ruler 1)', () => {
    const result = generateRulerData(1);
    expect(result).toEqual(ruler1);
  });

  it('generateRulerData (ruler 3)', () => {
    const result = generateRulerData(3);
    expect(result).toEqual(ruler3);
  });

  it('generateRulerData (ruler 8)', () => {
    const result = generateRulerData(8);
    expect(result).toEqual(ruler8);
  });

  it('unpackRulerData (ruler 1)', () => {
    const data = {
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
    };

    let result = unpackRulerData(data);

    expect(result).toEqual(ruler1);
  });

  it('unpackRulerData (ruler 3)', () => {
    const data = {
      ruler   : 3,
      sections: [
        '3->1:0',
        '67->2:0',
        '901->1:0,2:1',
        '2345->4:1',
        '56789->5:1',
        '890123->2:1,4:2',
        '1234567->7:2',
        '45678901->6:2,2:3',
        '789012345->3:2,6:3',
      ],
    };

    let result = unpackRulerData(data);

    expect(result).toEqual(ruler3);
  });
});
