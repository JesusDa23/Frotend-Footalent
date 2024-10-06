import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionsByCatComponent } from './sections-by-cat.component';

describe('SectionsByCatComponent', () => {
  let component: SectionsByCatComponent;
  let fixture: ComponentFixture<SectionsByCatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionsByCatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionsByCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
