import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadoCubiertasComponent } from './estado-cubiertas.component';

describe('EstadoCubiertasComponent', () => {
  let component: EstadoCubiertasComponent;
  let fixture: ComponentFixture<EstadoCubiertasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstadoCubiertasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstadoCubiertasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
