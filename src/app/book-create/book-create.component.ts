import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Book } from '../book.model';
import { BookService } from '../book.service';
import { Router } from '@angular/router';
import { IdService } from '../id.service';

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
    private bookService: BookService,
    private router: Router,
    private idService: IdService
  ) {}

  ngOnInit() {
    if (this.book) {
      console.log('aaa');
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
        id: this.idService.getNextId() ?? '',
      };

      if (this.book && this.book.id) {
        console.log('ddd');
        this.bookService.updateBook(this.book.id, newBook);
      } else {
        console.log(newBook);
        this.bookService.addBook(newBook);
      }

      this.form.reset();
      this.router.navigate(['/books']);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
