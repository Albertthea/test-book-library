import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { Book } from '../book.model';
import { Router } from '@angular/router';
import { FilterService } from '../filter.service';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  filteredBooks: Book[] = [];
  minPageCount: number | null = 1;
  maxPageCount: number | null = null;
  searchQuery: string = '';

  constructor(
    private bookService: BookService,
    private router: Router,
    private filterService: FilterService
  ) {}

  ngOnInit() {
    combineLatest([
      this.filterService.selectedAuthors$,
      this.filterService.selectedLanguages$,
      this.filterService.selectedGenres$,
      this.filterService.selectedMinPageCount$,
      this.filterService.selectedMaxPageCount$,
      this.filterService.selectedSearchQueries$,
    ]).subscribe(
      ([
        selectedAuthors,
        selectedLanguages,
        selectedGenres,
        minPageCount,
        maxPageCount,
        searchQueries,
      ]) => {
        this.bookService.getBooks().subscribe((books) => {
          this.books = books;

          this.filteredBooks = this.applyFilters(
            selectedAuthors,
            selectedLanguages,
            selectedGenres,
            searchQueries
          );

          if (minPageCount !== null || maxPageCount !== null) {
            this.filteredBooks = this.filteredBooks.filter((book) => {
              const pageCount = book.pageCount || 0;
              const minValid =
                minPageCount === null || pageCount >= minPageCount;
              const maxValid =
                maxPageCount === null || pageCount <= maxPageCount;

              return minValid && maxValid;
            });
          }
        });
      }
    );
  }

  applyFilters(
    selectedAuthors: any,
    selectedLanguages: any,
    selectedGenres: any,
    searchQueries: string[]
  ): Book[] {
    return this.books.filter((book) => {
      const matchesAuthor =
        selectedAuthors.length === 0 || selectedAuthors.includes(book.author);

      const matchesLanguage =
        selectedLanguages.length === 0 ||
        selectedLanguages.includes(book.language);

      const matchesGenre =
        selectedGenres.length === 0 || selectedGenres.includes(book.genre);

      const matchesSearchQueries =
        searchQueries.length == 0 ||
        searchQueries.some(
          (query) =>
            book.title.toLowerCase().includes(query.toLowerCase()) ||
            book.description?.toLowerCase().includes(query.toLowerCase())
        );
      console.log(matchesSearchQueries);

      return (
        matchesAuthor && matchesLanguage && matchesGenre && matchesSearchQueries
      );
    });
  }

  goToBookDetails(book: Book): void {
    if (book && book.id) {
      this.router.navigate(['/books', book.id]);
    }
  }
}
