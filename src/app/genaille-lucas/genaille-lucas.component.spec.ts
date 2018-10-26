import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenailleLucasComponent } from './genaille-lucas.component';

describe('GenailleLucasComponent', () => {
  let component: GenailleLucasComponent;
  let fixture: ComponentFixture<GenailleLucasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
             declarations: [GenailleLucasComponent],
           })
           .compileComponents();
  }));

  beforeEach(() => {
    fixture   = TestBed.createComponent(GenailleLucasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  for (let i = 0; i < 1000; i++)
    it('should create ' + i, () => {
      expect(component).toBeTruthy();
    });
});
