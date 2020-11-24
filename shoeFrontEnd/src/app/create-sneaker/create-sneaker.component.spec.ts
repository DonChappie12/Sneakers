import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSneakerComponent } from './create-sneaker.component';

describe('CreateSneakerComponent', () => {
  let component: CreateSneakerComponent;
  let fixture: ComponentFixture<CreateSneakerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateSneakerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSneakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
