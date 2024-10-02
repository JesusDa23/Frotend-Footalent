import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckheaderComponent } from './checkheader.component';

describe('CheckheaderComponent', () => {
  let component: CheckheaderComponent;
  let fixture: ComponentFixture<CheckheaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckheaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
