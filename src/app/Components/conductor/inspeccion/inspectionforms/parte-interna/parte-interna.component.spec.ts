import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParteInternaComponent } from './parte-interna.component';

describe('ParteInternaComponent', () => {
  let component: ParteInternaComponent;
  let fixture: ComponentFixture<ParteInternaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParteInternaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParteInternaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
