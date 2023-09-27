import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private selectedAuthorsSubject = new BehaviorSubject<string[]>([]);
  private selectedLanguagesSubject = new BehaviorSubject<string[]>([]);
  private selectedGenresSubject = new BehaviorSubject<string[]>([]);
  private selectedMinPageCountSubject = new BehaviorSubject<number | null>(
    null
  );
  private selectedMaxPageCountSubject = new BehaviorSubject<number | null>(
    null
  );
  private selectedSearchQueriesSubject = new BehaviorSubject<string[]>([]);

  selectedSearchQueries$ = this.selectedSearchQueriesSubject.asObservable();
  selectedAuthors$ = this.selectedAuthorsSubject.asObservable();
  selectedLanguages$ = this.selectedLanguagesSubject.asObservable();
  selectedGenres$ = this.selectedGenresSubject.asObservable();
  selectedMinPageCount$ = this.selectedMinPageCountSubject.asObservable();
  selectedMaxPageCount$ = this.selectedMaxPageCountSubject.asObservable();

  updateSelectedAuthors(authors: string[]) {
    this.selectedAuthorsSubject.next(authors);
    console.log(this.selectedAuthors$);
  }

  updateSelectedLanguages(languages: string[]) {
    this.selectedLanguagesSubject.next(languages);
    console.log(this.selectedLanguages$);
  }

  updateSelectedGenres(genres: string[]) {
    this.selectedGenresSubject.next(genres);
    console.log(this.selectedGenres$);
  }

  updatePageCountFilters(
    minPageCount: number | null,
    maxPageCount: number | null
  ) {
    console.log(minPageCount);
    this.selectedMinPageCountSubject.next(minPageCount);
    this.selectedMaxPageCountSubject.next(maxPageCount);
  }

  updateSearchFilters(searchQueries: string[]) {
    this.selectedSearchQueriesSubject.next(searchQueries);
    console.log(this.selectedSearchQueries$);
  }
}
