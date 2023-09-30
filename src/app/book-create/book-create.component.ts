import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Book } from '../book.model';
import { BookService } from '../book.service';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.scss'],
})
export class BookCreateComponent implements OnInit {
  @Input() bookId!: string;
  @Output() add = new EventEmitter<Book>();
  @Input() book: Book | undefined;
  @Input() titleInitial: string | null = null;
  isEditMode: boolean = false;

  form = new FormGroup({
    titleInput: new FormControl('', Validators.required),
    descriptionInput: new FormControl(''),
    authorInput: new FormControl('', Validators.required),
    genreInput: new FormControl('', Validators.required),
    languageInput: new FormControl('', Validators.required),
    pageCountInput: new FormControl(0, [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
    ]),
  });

  constructor(
    public bookService: BookService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    if (this.book) {
      this.isEditMode = true;
      this.form.patchValue({
        titleInput: this.book.title,
        descriptionInput: this.book.description,
        authorInput: this.book.author,
        genreInput: this.book.genre,
        languageInput: this.book.language,
        pageCountInput: this.book.pageCount,
      });
    }
  }

  submit(): void {
    const titleValue = this.form.get('titleInput')?.value;
    const descriptionValue = this.form.get('descriptionInput')?.value;
    const authorValue = this.form.get('authorInput')?.value;
    const genreValue = this.form.get('genreInput')?.value;
    const languageValue = this.form.get('languageInput')?.value;
    const pageCountValue = Number(this.form.get('pageCountInput')?.value);

    if (this.form.valid) {
      const newBook: Book = {
        title: titleValue ?? '',
        description: descriptionValue ?? '',
        author: authorValue ?? '',
        genre: genreValue ?? '',
        language: languageValue ?? '',
        pageCount: pageCountValue || 0,
      };

      if (this.book && this.book.id) {
        this.bookService.updateBook(this.book.id, newBook).subscribe({
          next: (updatedBook) => {
            console.log('Книга успешно обновлена', updatedBook);

            if (updatedBook) {
              this.book = updatedBook;
              this.isEditMode = false;
            }

            this.router.navigate(['/books', this.book?.id]);
          },
          error: (error) => {
            console.error('Ошибка при обновлении книги', error);
          },
        });
      } else {
        this.bookService.addBook(newBook).subscribe(
          (addedBook) => {
            console.log('Книга успешно добавлена', addedBook);
          },
          (error) => {
            console.error('Ошибка при добавлении книги', error);
          }
        );
      }

      this.form.reset();
      this.router.navigate(['/books']);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
