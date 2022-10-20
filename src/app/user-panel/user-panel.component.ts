import { Component, OnInit } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';

import { FactService } from '../fact.service';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserPanelComponent implements OnInit {
  constructor(private factService: FactService) {}

  categories$: Observable<string[] | null> =
    this.factService.getCategoriesObservable$;

  searchValue?: string;
  selectedCategory?: string;

  public downloadRandomJoke(): void {
    if (this.selectedCategory) {
      this.factService.getRandomJoke(this.selectedCategory);
    } else {
      this.factService.getRandomJoke();
    }
  }

  onSearchJoke() {
    if (this.searchValue) {
      this.factService.getJokeBySearchPhrase(this.searchValue);
    }
  }

  selectCategory(category: string) {
    if (category !== 'empty') {
      this.selectedCategory = category;
    }

    if (category === 'empty') {
      this.selectedCategory = undefined;
    }
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.factService.getCategories(); //poczytać o tym
  }

  ngOnDestroy() {}
}
