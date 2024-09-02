import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyMoviesComponent } from './my-movies.component';

describe('MyMoviesComponent', () => {
  let component: MyMoviesComponent;
  let fixture: ComponentFixture<MyMoviesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyMoviesComponent]
    });
    fixture = TestBed.createComponent(MyMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});