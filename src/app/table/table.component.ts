import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChange,
  SimpleChanges,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, Subject, delay, tap } from 'rxjs';
import { FactService } from '../fact.service';
import { httpJokeResponse } from '../models/httpJokeResponse.model';
import { httpSearchJokeResponse } from '../models/httpSearchJokeResponse.model';
import { faPlus, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import * as actions from './../store/jokes.actions';

import * as jokeSelectors from './../store/jokes.selectors';
import { SelectionEnum } from '../shared/enums/radioSelection.enum';
import { Joke } from '../models/joke.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnInit {
  constructor(
    private store$: Store,
    private factService: FactService,
    private activatedRoute: ActivatedRoute
  ) {}

  public faPlus: IconDefinition = faPlus;

  @ViewChild('jokesApi', { static: true })
  jokesApiTemplate!: TemplateRef<HTMLElement>;

  @ViewChild('jokesStore', { static: true })
  jokesStoreTemplate!: TemplateRef<HTMLElement>;

  @ViewChild('jokesBackend') jokesBackendTemplate!: TemplateRef<HTMLElement>;

  apiJokes$: Observable<httpSearchJokeResponse> =
    this.factService.searchedJokeObservable$;

  storeJokes$: Observable<Joke[]> = this.store$.select(jokeSelectors.jokeList);

  backendJokes$: Observable<httpSearchJokeResponse> =
    this.factService.searchedJokeObservable$;

  private tableType: SelectionEnum | null = SelectionEnum.Api;

  public tableTemplate: TemplateRef<HTMLElement> | null = null;

  private searchPhrase: string = '';

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      if (params['type'] === SelectionEnum.Api) {
        this.tableType = SelectionEnum.Api;
        this.tableTemplate = this.jokesApiTemplate;
        this.searchPhrase = params['searchPhrase'];
      }
      if (params['type'] === SelectionEnum.Server) {
        this.tableType = SelectionEnum.Server;
        this.tableTemplate = this.jokesBackendTemplate;
      }
      if (params['type'] === SelectionEnum.Store) {
        this.tableType = SelectionEnum.Store;
        this.tableTemplate = this.jokesStoreTemplate;
      }
    });
  }

  ngAfterViewInit() {
    if (this.tableType === SelectionEnum.Api) {
      this.factService.getJokeBySearchPhrase(this.searchPhrase);
    }
  }

  onAddJokeToStore(jokeData: httpJokeResponse) {
    this.store$.dispatch(actions.addSingleJoke({ joke: jokeData }));
  }

  onDeleteFromServer() {}

  onSendToBackend(joke: Joke) {}
}
