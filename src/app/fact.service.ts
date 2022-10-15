import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Joke } from './models/joke.model';
import { exhaustMap, map, takeUntil } from 'rxjs/operators';
import { httpJokeResponse } from './models/httpJokeResponse.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FactService {
  constructor(private httpService: HttpClient) {
    this.randomJokeObservable$ = this.randomJoke$.pipe(
      exhaustMap((joke) => {
        console.log(joke);

        return this.httpService
          .get<httpJokeResponse>(this.randomJokeUrl, {
            headers: {
              accept: 'application/json',
              'X-RapidAPI-Key': environment.api_key,
              'X-RapidAPI-Host': environment.host,
            },
          })
          .pipe(map(this.generateRandomJoke), takeUntil(this.onDestroy$));
      })
    );
  }

  public randomJokeObservable$: Observable<Joke | null> = new Observable();
  private randomJoke$ = new Subject<null>();
  private onDestroy$ = new Subject<boolean>();

  private randomJokeUrl =
    'https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com/jokes/random';

  getRandomJoke() {
    this.randomJoke$.next(null);
  }

  private generateRandomJoke(res: httpJokeResponse): Joke {
    const randomJoke: Joke = {
      text: res.value,
      id: res.id,
      createdDate: res.created_at,
    };

    return randomJoke;
  }

  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }

  // displayRandomJoke(randomJoke: Observable<Joke>): void {
  //   this.randomJoke = randomJoke;
  // }
}
