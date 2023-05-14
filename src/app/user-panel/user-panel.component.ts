import { Component, OnInit } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { JokeApiService } from '../services/joke-api.service';
import { userInput } from '../models/controls.model';
import { SelectionEnum } from '../shared/enums/radioSelection.enum';
import { Joke } from '../models/joke.model';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserPanelComponent implements OnInit {
  public navigationSubscription: Subscription = new Subscription();

  constructor(private jokeApiService: JokeApiService, private router: Router) {}

  categories$: Observable<string[] | null> =
    this.jokeApiService.getCategoriesObservable$;

  get searchValue() {
    return this.form.get('search');
  }

  get selectedCategory() {
    return this.form.get('category');
  }

  form: FormGroup<userInput> = new FormGroup<userInput>({
    search: new FormControl(null, [Validators.required]),
    category: new FormControl('', {
      nonNullable: true,
    }),
  });

  public downloadRandomJoke(): void {
    this.router.navigate(['joke-editor'], {
      queryParams: { category: this.selectedCategory?.value },
      skipLocationChange: true,
    });

    //czyli randomowy wchodzi do compare-text
  }

  onSearchJoke() {
    if (this.searchValue?.value) {
      this.router.navigate(['table'], {
        queryParams: {
          service: false,
          type: SelectionEnum.Api,
          searchPhrase: this.searchValue.value,
        },
        skipLocationChange: true,
      });
    }
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.jokeApiService.getCategories(); //poczytać o tym
  }
}
