import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConductoresComponent } from './conductores.component';

describe('ConductoresComponent', () => {
  let component: ConductoresComponent;
  let fixture: ComponentFixture<ConductoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConductoresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConductoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
