import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SistemadelucesComponent } from './sistemadeluces.component';

describe('SistemadelucesComponent', () => {
  let component: SistemadelucesComponent;
  let fixture: ComponentFixture<SistemadelucesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SistemadelucesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SistemadelucesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
