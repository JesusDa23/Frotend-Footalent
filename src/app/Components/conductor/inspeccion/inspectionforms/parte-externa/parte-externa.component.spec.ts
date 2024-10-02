import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParteExternaComponent } from './parte-externa.component';

describe('ParteExternaComponent', () => {
  let component: ParteExternaComponent;
  let fixture: ComponentFixture<ParteExternaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParteExternaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParteExternaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
