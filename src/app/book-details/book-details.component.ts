import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Book } from '../book.model';
import { BookService } from '../book.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
})
export class BookDetailsComponent {
  @Input() book!: Book | undefined;
  @Output() editClick = new EventEmitter<void>();
  editMode = false;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.bookService.getBookById(id).subscribe(
        (book) => {
          this.book = book;
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  edit() {
    this.editMode = true;
  }
}
