import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TapasyOtrosComponent } from './tapasy-otros.component';

describe('TapasyOtrosComponent', () => {
  let component: TapasyOtrosComponent;
  let fixture: ComponentFixture<TapasyOtrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TapasyOtrosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TapasyOtrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
