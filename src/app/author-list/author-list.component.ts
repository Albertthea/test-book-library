import { Component } from '@angular/core';
import { BookService } from '../book.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.scss'],
})
export class AuthorListComponent {
  authors: string[] = [];

  constructor(private bookService: BookService, private router: Router) {}

  ngOnInit() {
    this.bookService.getAuthors().subscribe(
      (authors) => {
        this.authors = authors;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  removeAuthor(index: number) {
    this.authors.splice(index, 1);
  }

  addAuthor() {
    this.authors.push('Новый автор');
  }

  navigateToHome() {
    this.router.navigate(['/']);
  }

  saveAuthors(): void {
    this.bookService.getAuthors().subscribe(
      (authors) => {
        this.authors.forEach((author) => {
          if (!authors.includes(author)) {
            this.bookService.addAuthor(author);
          }
        });
        this.router.navigate(['/']);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
