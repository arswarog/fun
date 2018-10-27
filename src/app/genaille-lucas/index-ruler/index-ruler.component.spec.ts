import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexRulerComponent } from './index-ruler.component';

describe('IndexRulerComponent', () => {
  let component: IndexRulerComponent;
  let fixture: ComponentFixture<IndexRulerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexRulerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexRulerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
