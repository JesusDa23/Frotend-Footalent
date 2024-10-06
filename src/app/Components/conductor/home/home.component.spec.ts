import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomecComponent } from './homec.component';

describe('HomeComponent', () => {
  let component: HomecComponent;
  let fixture: ComponentFixture<HomecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomecComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
