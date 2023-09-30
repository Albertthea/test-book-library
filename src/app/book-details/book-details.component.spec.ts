import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookDetailsComponent } from './book-details.component';

describe('BookDetailsComponent', () => {
  let component: BookDetailsComponent;
  let fixture: ComponentFixture<BookDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookDetailsComponent],
    });
    fixture = TestBed.createComponent(BookDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render details view correctly', () => {
    component.book = {
      title: 'Book Title',
      author: 'Author Name',
      description: 'Book Description',
      genre: 'Fiction',
      language: 'English',
      pageCount: 200,
    };
    component.editMode = false;
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.book-title').textContent).toContain(
      'Book Title'
    );
    expect(compiled.querySelector('.book-info').textContent).toContain(
      'Author Name'
    );
    expect(compiled.querySelector('.book-info').textContent).toContain(
      'Book Description'
    );
    expect(compiled.querySelector('.book-info').textContent).toContain(
      'Fiction'
    );
    expect(compiled.querySelector('.book-info').textContent).toContain(
      'English'
    );
    expect(compiled.querySelector('.book-info').textContent).toContain('200');
    expect(compiled.querySelector('.edit-button')).toBeTruthy();
    expect(compiled.querySelector('.book-create')).toBeFalsy();
  });

  it('should render edit view when in editMode', () => {
    component.book = {
      title: 'Book Title',
      author: 'Author Name',
      description: 'Book Description',
      genre: 'Fiction',
      language: 'English',
      pageCount: 200,
    };
    component.editMode = true;
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('app-book-create')).toBeTruthy();
    expect(compiled.querySelector('.book-details')).toBeFalsy();
  });
});
