import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RulerComponent} from './ruler.component';
import {TriangleComponent} from './triangle/triangle.component';

describe('RulerComponent', () => {
  let component: RulerComponent;
  let fixture: ComponentFixture<RulerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RulerComponent, TriangleComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RulerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('digit 4', () => {
    component.digit = 4;
    component.ngOnChanges({digit: true} as any);
    expect(component).toBeTruthy();
    expect(component.sections[0][0]).toEqual({
      numbers: [4],
      count: 1,
      target: 0,
      active: false,
    });
  });

  it('rIndex 3 x 3 + 0', () => {
    component.digit = 3;
    component.factor = 3;
    component.rIndex = 0;
    component.ngOnChanges({digit: true, factor: true} as any);
    expect(component).toBeTruthy();
    expect(component.numInIndex).toEqual(9);
  });

  it('rIndex 3 x 3 + 1', () => {
    component.digit = 3;
    component.factor = 3;
    component.rIndex = 1;
    component.ngOnChanges({digit: true, factor: true} as any);
    expect(component).toBeTruthy();
    expect(component.numInIndex).toEqual(0);
  });

  it('rIndex 3 x 6 + 3', () => {
    component.digit = 3;
    component.factor = 6;
    component.rIndex = 3;
    component.ngOnChanges({digit: true, factor: true} as any);
    expect(component).toBeTruthy();
    expect(component.numInIndex).toEqual(1);
  });
});
