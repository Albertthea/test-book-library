import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { FilterPanelComponent } from './filter-panel.component';
import { FormsModule } from '@angular/forms';

describe('FilterPanelComponent', () => {
  let component: FilterPanelComponent;
  let fixture: ComponentFixture<FilterPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilterPanelComponent],
      imports: [HttpClientModule, FormsModule],
    });
    fixture = TestBed.createComponent(FilterPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
