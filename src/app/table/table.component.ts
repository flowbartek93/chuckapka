import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { FactService } from '../fact.service';
import { httpJokeResponse } from '../models/httpJokeResponse.model';
import { httpSearchJokeResponse } from '../models/httpSearchJokeResponse.model';
import { faPlus, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import * as actions from './../store/jokes.actions';

import * as jokeSelectors from './../store/jokes.selectors';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnInit {
  constructor(
    private store$: Store,
    private factService: FactService,
    private activatedRoute: ActivatedRoute
  ) {}

  public faPlus: IconDefinition = faPlus;

  searchedJoke$: Observable<httpSearchJokeResponse> =
    this.factService.searchedJokeObservable$;

  storeJokes$: Observable<any> = this.store$.select(jokeSelectors.jokeList);

  // backendJokes$: Observable<httpSearchJokeResponse> =
  //   this.factService.searchedJokeObservable$;

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {});
  }

  onAddJokeToStore(jokeData: httpJokeResponse) {
    this.store$.dispatch(actions.addSingleJoke({ joke: jokeData }));
  }

  public ngDoCheck() {}
}
