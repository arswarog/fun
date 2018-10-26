import { Component, Input } from '@angular/core';
import { allSettled } from 'q';

class Borders {
  l = false;
  r = false;
  t = false;
  b = false;
}

export interface ICell {
  value: string;
  hard: boolean;
  available: string[];
  zone: string[];
  borders: Borders;
}

export class Cell implements ICell {
  value: string       = null;
  hard: boolean       = false;
  available: string[] = [];
  zone: string[]      = [];
  borders: Borders    = new Borders;
  error: boolean      = false;
  exclude: string[]   = [];

  focus: boolean = false;
  light: boolean = false;

  constructor(public posx, public posy, available: string[] = []) {
    this.available = available;
  }

  load(json: any) {
    this.value   = json.value;
    this.hard    = json.hard;
    this.zone    = json.zone;
    this.exclude = json.exclude;
    return true;
  }

  save() {
    return {
      value  : this.value,
      hard   : this.hard,
      zone   : this.zone,
      exclude: this.exclude,
    };
  }

  reset(full = false) {
    if (!this.hard || full) {
      this.value     = null;
      this.available = [];
      this.exclude   = [];
    }
  }
}

export class Matrix {
  public width: 9;
  public height: 9;
  public diagonal = false;

  public cells: Cell[][];
  public selected: Cell = null;

  constructor(name: string);
  constructor(width: number, height: number);
  constructor(w?: any, h?: any) {
    this.cells = [];
    this.cells.push([]);

    if (typeof w === 'string')
      this.load(w).then(
        result => true,
        error => this.init(9, 9),
      );
    if (typeof w === 'number' && typeof h === 'number')
      this.init(w, h);
  }

  init(w, h) {
    this.width  = w;
    this.height = h;
    this.cells  = [];

    this.cells.length = w;
    for (let x = 0; x < w; x++) {
      if (!this.cells[x]) {
        this.cells[x]        = [];
        this.cells[x].length = h;
      }
      for (let y = 0; y < h; y++) {
        let cell: Cell = new Cell(x, y, this.available());

        this.cells[x][y] = cell;

        cell.zone[0] = '' + (Math.floor(x / 3) + Math.floor(y / 3) * 3);
        cell.zone[1] = '' + x;
        cell.zone[2] = '' + y;
      }
    }
    this.makeZone(0);
    this.checkMatrix();
  }

  available() {
    return ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
  }

  makeZone(zone: number) {
    for (let row of this.cells) {
      for (let item of row) {
        const c: Cell = <Cell>item;
        c.borders     = new Borders;
        if (c.posx === 0 || c.zone[zone] !== this.cells[c.posx - 1][c.posy].zone[zone])
          c.borders.t = true;
        if (c.posx === this.width - 1 || c.zone[zone] !== this.cells[c.posx + 1][c.posy].zone[zone])
          c.borders.b = true;
        if (c.posy === 0 || c.zone[zone] !== this.cells[c.posx][c.posy - 1].zone[zone])
          c.borders.l = true;
        if (c.posy === this.height - 1 || c.zone[zone] !== this.cells[c.posx][c.posy + 1].zone[zone])
          c.borders.r = true;
      }
    }
  }

  load(name = 'default') {
    return new Promise((resolve, reject) => {

      let data: any = window.localStorage.getItem(`sudoku-${name}`);

      data = JSON.parse(data);
      if (!data)
        reject();

      this.init(data.width, data.height);
      this.diagonal = data.diagonal;

      if ('cells' in data) {
        const cells = <any[][]>data.cells;

        for (let x = 0; x in cells; x++) {
          for (let y = 0; y in cells[x]; y++) {
            this.cells[x][y].load(cells[x][y]);
          }
        }
      }

      this.makeZone(0);
      this.checkMatrix();

      resolve();
    });
  }

  save(name = 'default') {
    return new Promise((resolve, reject) => {

      const data = {
        width   : this.width,
        height  : this.height,
        diagonal: this.diagonal,
        cells   : this.cells.map(row => row.map(cell => cell.save())),
      };

      window.localStorage.setItem(`sudoku-${name}`, JSON.stringify(data));
    });
  }

  reset(full = false) {
    for (const row of this.cells) {
      for (const cell of row) {
        cell.reset(full);
      }
    }
    this.checkMatrix();
    this.save();
  }

  findTrivial() {
    console.log('find trivial');
    for (const row of this.cells) {
      for (const cell of row) {
        if (!cell.value) {
          const av = cell.available.map(i => i);

          cell.exclude.forEach(val => {
            const ind = av.indexOf(val);
            if (ind !== -1)
              av.splice(ind, 1);
          });

          if (av.length === 1) {
            cell.value = av[0];

            this.checkMatrix();
            return;
          }
        }
      }
    }
    this.checkMatrix();
  }

  checkMatrix() {
    for (const row of this.cells) {
      for (const cell of row) {
        this.checkCell(cell);
      }
    }
  }

  checkCell(cell: Cell) {
    cell.available = this.available();

    if (!cell.value) cell.hard = false;

    for (const row of this.cells) {
      for (const c of row) {
        if (c === cell) continue;
        if (!c.value) continue;

        for (const zone in c.zone) {
          if (c.zone[zone] === cell.zone[zone]) {
            const ind = cell.available.indexOf(c.value);
            if (ind !== -1)
              cell.available.splice(ind, 1);
          }
        }
      }
    }

    cell.error = cell.value && cell.available.indexOf(cell.value) === -1;
  }

  select(cell: Cell = null) {
    if (!cell) cell = this.cells[0][0];
    this.selected = cell;
    cell.focus    = true;

    for (let row of this.cells) {
      for (let item of row) {
        const c = <Cell>item;
        for (let n in c.zone) {
          if (c.zone[n] === cell.zone[n]) {
            c.light = true;
          }
        }
      }
    }
  }

  unselect(item: ICell = null) {
    this.selected = null;
    for (let row of this.cells) {
      for (let c of row) {
        (<Cell>c).focus = false;
        (<Cell>c).light = false;
      }
    }
  }

  setValue(value: string, cell: Cell = null) {
    if (!cell)
      cell = this.selected;
    if (!cell || cell.hard)
      return;
    if (value && this.available().indexOf(value) === -1) return;

    cell.value = value;

    this.checkMatrix();
    this.save();
  }

  exclude(value: string, cell: Cell = null) {
    if (!cell)
      cell = this.selected;
    if (!cell || cell.hard)
      return;
    if (value && cell.available.indexOf(value) === -1) return;

    const ind = cell.exclude.indexOf(value);
    if (ind === -1)
      cell.exclude.push(value);
    else
      cell.exclude.splice(ind, 1);

    this.checkMatrix();
    this.save();
  }
}
