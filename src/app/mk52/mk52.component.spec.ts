import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Mk52Component } from './mk52.component';

describe('Mk52Component', () => {
  let component: Mk52Component;
  let fixture: ComponentFixture<Mk52Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Mk52Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Mk52Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
