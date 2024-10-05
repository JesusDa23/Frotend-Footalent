import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListbulletsComponent } from './listbullets.component';

describe('ListbulletsComponent', () => {
  let component: ListbulletsComponent;
  let fixture: ComponentFixture<ListbulletsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListbulletsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListbulletsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
