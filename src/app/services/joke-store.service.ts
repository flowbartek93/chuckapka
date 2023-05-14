import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  BehaviorSubject,
  Observable,
  Subject,
  first,
  map,
  takeUntil,
  tap,
} from 'rxjs';
import { Joke } from '../models/joke.model';
import * as jokeSelectors from '../store/jokes.selectors';

@Injectable({ providedIn: 'root' })
export class JokeStoreService {
  constructor(private store$: Store) {}

  private editedJokesList$ = this.store$.select(jokeSelectors.editedJokesList);
  public jokesList$ = this.store$.select(jokeSelectors.jokeList);
}
