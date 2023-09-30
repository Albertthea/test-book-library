import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorListComponent } from './author-list.component';

describe('AuthorListComponent', () => {
  let component: AuthorListComponent;
  let fixture: ComponentFixture<AuthorListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthorListComponent],
    });
    fixture = TestBed.createComponent(AuthorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a title', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('Авторы');
  });
});
