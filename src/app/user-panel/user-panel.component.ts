import { Component, OnInit } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { FactService } from '../fact.service';
import { userInput } from '../models/userInput.model';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserPanelComponent implements OnInit {
  constructor(private factService: FactService, private router: Router) {}

  categories$: Observable<string[] | null> =
    this.factService.getCategoriesObservable$;

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
    this.router.navigateByUrl('joke-editor').then(() => {
      if (this.selectedCategory) {
        this.factService.getRandomJoke(this.selectedCategory.value);
      } else {
        this.factService.getRandomJoke();
      }
    });
  }

  onSearchJoke() {
    this.router.navigateByUrl('table').then(() => {
      this.factService.getJokeBySearchPhrase(this.searchValue?.value ?? '');
    });
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.factService.getCategories(); //poczytać o tym
  }

  ngDoCheck() {
    console.log('change detection');
  }

  ngOnDestroy() {}
}
