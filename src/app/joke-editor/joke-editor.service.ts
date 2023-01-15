import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { first, map, tap } from 'rxjs';
import { Joke } from '../models/joke.model';
import * as jokeSelectors from './../store/jokes.selectors';

@Injectable()
export class JokeEditorService {
  public editedJokes: Joke[] = [];

  constructor(private store$: Store) {}

  private editedJokesList$ = this.store$.select(jokeSelectors.editedJokesList);

  public getEditedJokesList() {
    this.editedJokesList$
      .pipe(
        first(),
        map((jokes) => jokes),
        tap((jokes) => {
          this.editedJokes = jokes;
        })
      )
      .subscribe();
  }

  ngOnDestroy() {}
}
