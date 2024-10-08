import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormresponsesComponent } from './formresponses.component';

describe('FormresponsesComponent', () => {
  let component: FormresponsesComponent;
  let fixture: ComponentFixture<FormresponsesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormresponsesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormresponsesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
