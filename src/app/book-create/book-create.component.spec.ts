import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { BookCreateComponent } from './book-create.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('BookCreateComponent', () => {
  let component: BookCreateComponent;
  let fixture: ComponentFixture<BookCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookCreateComponent],
      imports: [HttpClientModule, ReactiveFormsModule],
    });
    fixture = TestBed.createComponent(BookCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
