import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateClassModalComponent } from './create-class-modal.component';

describe('CreateClassModalComponent', () => {
  let component: CreateClassModalComponent;
  let fixture: ComponentFixture<CreateClassModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateClassModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateClassModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
