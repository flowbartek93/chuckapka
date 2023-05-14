import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { JokeApiService } from '../services/joke-api.service';
import { httpJokeResponse } from '../models/httpJokeResponse.model';
import { httpSearchJokeResponse } from '../models/httpSearchJokeResponse.model';
import { faPlus, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import * as actions from './../store/jokes.actions';

import { SelectionEnum } from '../shared/enums/radioSelection.enum';
import { Joke } from '../models/joke.model';
import { JokeStoreService } from '../services/joke-store.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  constructor(
    private store$: Store,
    private activatedRoute: ActivatedRoute,
    private jokeStoreService: JokeStoreService,
    private jokeApiService: JokeApiService
  ) {}

  public faPlus: IconDefinition = faPlus;

  @ViewChild('jokesApi', { static: true })
  jokesApiTemplate!: TemplateRef<HTMLElement>;

  @ViewChild('jokesStore', { static: true })
  jokesStoreTemplate!: TemplateRef<HTMLElement>;

  @ViewChild('jokesBackend') jokesBackendTemplate!: TemplateRef<HTMLElement>;

  apiJokes$: Observable<httpSearchJokeResponse> =
    this.jokeApiService.searchedJokeObservable$;

  storeJokes$: Observable<Joke[] | null> = this.jokeStoreService.jokesList$;

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
      this.jokeApiService.getJokeBySearchPhrase(this.searchPhrase);
    }
  }

  onAddJokeToStore(jokeData: httpJokeResponse) {
    this.store$.dispatch(actions.addSingleJoke({ joke: jokeData }));
  }

  onDeleteFromServer() {}

  onSendToBackend(joke: Joke) {}
}
