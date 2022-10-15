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
      exhaustMap(() => {
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

    this.getCategoriesObservable$ = this.getCategories$.pipe(
      exhaustMap(() => {
        console.log('call');
        return this.httpService
          .get<string[]>(this.categoriesUrl, {
            headers: {
              accept: 'application/json',
              'X-RapidAPI-Key': environment.api_key,
              'X-RapidAPI-Host': environment.host,
            },
          })
          .pipe(takeUntil(this.onDestroy$));
      })
    );
  }

  public categories: string[] = [];

  public randomJokeObservable$: Observable<Joke | null> = new Observable();
  private randomJoke$ = new Subject();

  public getCategoriesObservable$: Observable<string[] | null> =
    new Observable();
  private getCategories$ = new Subject();

  private onDestroy$ = new Subject<boolean>();

  private randomJokeUrl =
    'https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com/jokes/random';

  private categoriesUrl =
    'https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com/jokes/categories';

  getRandomJoke() {
    this.randomJoke$.next(null);
  }

  getCategories() {
    this.getCategories$.next(null);
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
}
