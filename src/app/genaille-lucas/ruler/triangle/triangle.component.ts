import { Component, ElementRef, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector : 'app-triangle',
  template : '',
  styleUrls: ['./triangle.component.scss'],
})
export class TriangleComponent implements OnChanges {

  @Input() public height = 0;
  @Input() public target = 0;

  constructor(private el: ElementRef<HTMLDivElement>) {
  }

  ngOnChanges() {
    console.log(this.height, this.target);
    const style = this.el.nativeElement.style;

    if (this.target < 0) {
      style.borderTopWidth    = 0.5 + 'em';
      style.borderBottomWidth = (this.height - 0.5) + 'em';
      style.transform         = `skewY(${prepared[this.target]})`;
    } else if (this.target < this.height) {
      style.borderTopWidth    = (this.target + 0.5) + 'em';
      style.borderBottomWidth = (this.height - this.target - 0.5) + 'em';
      style.transform         = 'none';
    } else {
      style.borderTopWidth    = (this.height - 0.5) + 'em';
      style.borderBottomWidth = 0.5 + 'em';
      style.transform         = `skewY(${prepared[this.target - this.height + 1]})`;
    }
  }

}

const prepared = {};

for (let i = -9; i <= 9; i++)
  prepared[i] = (-Math.atan(i / 3) * 180 / Math.PI) + 'deg';

