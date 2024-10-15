import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialVehiculosComponent } from './historial-vehiculos.component';

describe('HistorialVehiculosComponent', () => {
  let component: HistorialVehiculosComponent;
  let fixture: ComponentFixture<HistorialVehiculosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistorialVehiculosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorialVehiculosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
