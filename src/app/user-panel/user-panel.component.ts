import { Component, OnInit } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { FactService } from '../fact.service';
import { userInput } from '../models/userInput.model';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserPanelComponent implements OnInit {
  public navigationSubscription: Subscription = new Subscription();

  constructor(
    private factService: FactService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

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
    this.router.navigateByUrl('').then(() => {
      this.router.navigate(['joke-editor'], {
        queryParams: { category: this.selectedCategory?.value },
        skipLocationChange: true,
      });
    });
  }

  onSearchJoke() {
    console.log(this.searchValue?.value);
    this.router.navigateByUrl('').then(() => {
      this.router.navigate(['table'], {
        queryParams: { searchPhrase: this.searchValue?.value },
        skipLocationChange: true,
      });
    });
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.factService.getCategories(); //poczytać o tym
  }

  ngDoCheck() {}

  ngOnDestroy() {}
}
