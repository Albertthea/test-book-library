import { Component, Output } from '@angular/core';
import { BookService } from '../book.service';
import { Router } from '@angular/router';
import { EventEmitter } from '@angular/core';
import { FilterService } from '../filter.service';

@Component({
  selector: 'app-filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.scss'],
})
export class FilterPanelComponent {
  @Output() filterChange = new EventEmitter<any>();
  selectedAuthors: string[] = [];
  selectedLanguages: string[] = [];
  selectedGenres: string[] = [];
  minPageCount: number | null = null;
  maxPageCount: number | null = null;
  selectedGenre: string = '';
  searchQuery: string = '';
  searchQueries: string[] = [];

  constructor(
    private bookService: BookService,
    private router: Router,
    private filterService: FilterService
  ) {}

  showAuthorsOptions: boolean = false;
  showLanguagesOptions: boolean = false;

  navigateToCreateBook() {
    this.router.navigate(['/create-book']);
  }

  navigateToAuthors() {
    this.router.navigate(['/authors']);
  }

  toggleAuthorsOptions() {
    this.showAuthorsOptions = !this.showAuthorsOptions;
  }

  toggleLanguagesOptions() {
    this.showLanguagesOptions = !this.showLanguagesOptions;
  }

  toggleAuthor(author: string) {
    if (this.selectedAuthors.includes(author)) {
      this.selectedAuthors = this.selectedAuthors.filter((a) => a !== author);
    } else {
      this.selectedAuthors.push(author);
    }

    const selectedFilters = {
      selectedAuthors: this.selectedAuthors,
    };

    this.filterChange.emit(selectedFilters);
    console.log('selectedAuthors:', this.selectedAuthors);
    this.filterService.updateSelectedAuthors(this.selectedAuthors);
  }

  toggleLanguage(language: string) {
    if (this.selectedLanguages.includes(language)) {
      this.selectedLanguages = this.selectedLanguages.filter(
        (l) => l !== language
      );
    } else {
      this.selectedLanguages.push(language);
    }

    const selectedFilters = {
      selectedLanguages: this.selectedLanguages,
    };

    this.filterChange.emit(selectedFilters);
    console.log('selectedLanguages:', this.selectedLanguages);
    this.filterService.updateSelectedLanguages(this.selectedLanguages);
  }

  toggleGenre(genre: string) {
    if (this.selectedGenres.includes(genre)) {
      this.selectedGenres = this.selectedGenres.filter((g) => g !== genre);
    } else {
      this.selectedGenres = [genre];
    }

    const selectedFilters = {
      selectedGenres: this.selectedGenres,
    };

    this.filterChange.emit(selectedFilters);
    console.log('selectedGenres:', this.selectedGenres);
    this.filterService.updateSelectedGenres(this.selectedGenres);
  }

  togglePageCountFilter(minVal: number | null, maxVal: number | null): void {
    console.log(minVal);
    this.filterService.updatePageCountFilters(minVal, maxVal);
  }

  toggleSearch(searchQuery: string) {
    const selectedFilters = {
      searchQueries: [searchQuery],
    };
    console.log('searchQueries:', selectedFilters.searchQueries);
    this.filterService.updateSearchFilters(selectedFilters.searchQueries);
  }

  getAuthors(): void {
    this.bookService.getAuthors().subscribe((authors) => {
      this.selectedAuthors = authors;
    });
  }

  getLanguages(): void {
    this.bookService.getLanguages().subscribe((languages) => {
      this.selectedLanguages = languages;
    });
  }

  getGenres(): void {
    this.bookService.getGenres().subscribe((genres) => {
      this.selectedGenres = genres;
    });
  }
}
