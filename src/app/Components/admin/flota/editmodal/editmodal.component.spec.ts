import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditmodalComponent } from './editmodal.component';

describe('EditmodalComponent', () => {
  let component: EditmodalComponent;
  let fixture: ComponentFixture<EditmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditmodalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
