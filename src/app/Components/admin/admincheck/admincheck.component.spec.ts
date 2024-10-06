import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmincheckComponent } from './admincheck.component';

describe('AdmincheckComponent', () => {
  let component: AdmincheckComponent;
  let fixture: ComponentFixture<AdmincheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdmincheckComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmincheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
