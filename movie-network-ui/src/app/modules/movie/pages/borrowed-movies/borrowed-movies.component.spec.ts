import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowedMoviesComponent } from './borrowed-movies.component';

describe('BorrowedMoviesComponent', () => {
  let component: BorrowedMoviesComponent;
  let fixture: ComponentFixture<BorrowedMoviesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BorrowedMoviesComponent]
    });
    fixture = TestBed.createComponent(BorrowedMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
