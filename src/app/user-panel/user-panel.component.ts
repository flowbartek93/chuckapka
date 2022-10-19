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
    console.log(this.searchValue);
  }

  selectCategory(category: string) {
    if (category) {
      console.log(category);
      this.selectedCategory = category;
    }

    if (category === '') {
      console.log(category);
      this.selectedCategory = undefined;
    }
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.factService.getCategories(); //poczytać o tym
  }

  ngOnDestroy() {}
}
