import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialConductoresComponent } from './historial-conductores.component';

describe('HistorialConductoresComponent', () => {
  let component: HistorialConductoresComponent;
  let fixture: ComponentFixture<HistorialConductoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistorialConductoresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorialConductoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
