import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputErrorsListComponent } from './input-errors-list.component';

describe('InputErrorsListComponent', () => {
  let component: InputErrorsListComponent;
  let fixture: ComponentFixture<InputErrorsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputErrorsListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputErrorsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
