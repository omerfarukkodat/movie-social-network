import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnedMoviesComponent } from './returned-movies.component';

describe('ReturnedMoviesComponent', () => {
  let component: ReturnedMoviesComponent;
  let fixture: ComponentFixture<ReturnedMoviesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReturnedMoviesComponent]
    });
    fixture = TestBed.createComponent(ReturnedMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
