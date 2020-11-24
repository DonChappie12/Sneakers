import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListDataComponent } from './user-list-data.component';

describe('UserListDataComponent', () => {
  let component: UserListDataComponent;
  let fixture: ComponentFixture<UserListDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserListDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
