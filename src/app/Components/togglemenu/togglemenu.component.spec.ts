import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TogglemenuComponent } from './togglemenu.component';

describe('TogglemenuComponent', () => {
  let component: TogglemenuComponent;
  let fixture: ComponentFixture<TogglemenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TogglemenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TogglemenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
