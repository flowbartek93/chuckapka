import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
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
import { SelectionEnum } from '../shared/enums/radioSelection.enum';
import { Joke } from '../models/joke.model';
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
    private activatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  public faPlus: IconDefinition = faPlus;

  @ViewChild('jokesApi', { static: true })
  jokesApiTemplate!: TemplateRef<HTMLElement>;

  @ViewChild('jokesStore', { static: true })
  jokesStoreTemplate!: TemplateRef<HTMLElement>;
  // @ViewChild('jokesBackend') jokesBackendTemplate?: TemplateRef<HTMLElement>;

  searchedJoke$: Observable<httpSearchJokeResponse> =
    this.factService.searchedJokeObservable$;

  storeJokes$: Observable<any> = this.store$.select(jokeSelectors.jokeList);

  // !logika dla innego rodzaju tabelek

  // backendJokes$: Observable<httpSearchJokeResponse> =
  //   this.factService.searchedJokeObservable$;

  public tableType: SelectionEnum | null = null;

  public tableTemplate: any;

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      console.log(params);
      if (params['service']) {
        if (params['type']) {
          this.tableType = params['type'];
        }
      }

      if (params['searchPhrase']) {
        this.tableType = SelectionEnum.Api;

        this.factService.getJokeBySearchPhrase(params['searchPhrase']);
      }

      this.tableTemplate = this.setTable();
    });
  }

  onAddJokeToStore(jokeData: httpJokeResponse) {
    this.store$.dispatch(actions.addSingleJoke({ joke: jokeData }));
  }

  onDeleteFromServer() {}

  onSendToBackend(joke: Joke) {}

  setTable() {
    if (this.tableType === SelectionEnum.Api) {
      console.log(this.jokesApiTemplate);
      console.log(this.jokesStoreTemplate);
      return this.jokesApiTemplate;
    }

    if (this.tableType === SelectionEnum.Store) {
      return this.jokesStoreTemplate;
    }

    return;
  }

  public ngDoCheck() {}
}
