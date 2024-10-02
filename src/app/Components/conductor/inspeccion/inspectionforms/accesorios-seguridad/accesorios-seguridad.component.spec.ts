import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccesoriosSeguridadComponent } from './accesorios-seguridad.component';

describe('AccesoriosSeguridadComponent', () => {
  let component: AccesoriosSeguridadComponent;
  let fixture: ComponentFixture<AccesoriosSeguridadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccesoriosSeguridadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccesoriosSeguridadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
