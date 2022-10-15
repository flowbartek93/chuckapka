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

  categories$: Observable<string[] | null> = new Observable();

  public downloadRandomJoke(): void {
    this.factService.getRandomJoke();
  }

  ngOnInit(): void {
    this.categories$ = this.factService.getCategoriesObservable$;
  }

  ngAfterViewInit() {
    this.factService.getCategories(); //poczytać o tym
  }

  ngOnDestroy() {}
}
