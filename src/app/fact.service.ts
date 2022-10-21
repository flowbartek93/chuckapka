import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject, pluck } from 'rxjs';
import { Joke } from './models/joke.model';
import { exhaustMap, map, takeUntil } from 'rxjs/operators';
import { httpJokeResponse } from './models/httpJokeResponse.model';
import { environment } from 'src/environments/environment';
import { httpSearchJokeResponse } from './models/httpSearchJokeResponse.model';

@Injectable({
  providedIn: 'root',
})
export class FactService {
  constructor(private httpService: HttpClient) {}

  private randomJokeUrl =
    'https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com/jokes/random';

  private categoriesUrl =
    'https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com/jokes/categories';

  private searchUrl = 'https://api.chucknorris.io/jokes/search';

  public categories: string[] = [];
  private randomJoke$ = new Subject<null | string>();
  private getCategories$ = new Subject();
  private getJokeByPhrase$ = new Subject<string>();

  public randomJokeObservable$: Observable<Joke | null> = this.randomJoke$.pipe(
    exhaustMap((category: string | null) => {
      let categoryQuery;
      if (category) {
        const httpParams = new HttpParams();
        categoryQuery = httpParams.append('category', category);
      }

      return this.httpService
        .get<httpJokeResponse>(this.randomJokeUrl, {
          params: categoryQuery,
          headers: {
            accept: 'application/json',
            'X-RapidAPI-Key': environment.api_key,

            'X-RapidAPI-Host': environment.host,
          },
        })
        .pipe(map(this.mapToJoke));
    })
  );

  public getCategoriesObservable$: Observable<string[] | null> =
    this.getCategories$.pipe(
      exhaustMap(() => {
        return this.httpService.get<string[]>(this.categoriesUrl, {
          headers: {
            accept: 'application/json',
            'X-RapidAPI-Key': environment.api_key,
            'X-RapidAPI-Host': environment.host,
          },
        });
      })
    );

  public searchedJokeObservable$: Observable<httpSearchJokeResponse> =
    this.getJokeByPhrase$.pipe(
      exhaustMap((searchPhrase: string) => {
        let searchQuery;

        const httpParams = new HttpParams();
        searchQuery = httpParams.append('query', searchPhrase);

        return this.httpService.get<httpSearchJokeResponse>(this.searchUrl, {
          params: searchQuery,
          headers: {
            accept: 'application/json',
            'X-RapidAPI-Key': environment.api_key,
            'X-RapidAPI-Host': environment.host,
          },
        });
      })
    );

  public getRandomJoke(category?: string) {
    if (!category) {
      this.randomJoke$.next(null);
    }

    if (category) {
      this.randomJoke$.next(category);
    }
  }

  public getCategories() {
    this.getCategories$.next(null);
  }

  public getJokeBySearchPhrase(searchPhrase: string) {
    this.getJokeByPhrase$.next(searchPhrase);
  }

  private mapToJoke(res: httpJokeResponse): Joke {
    const randomJoke: Joke = {
      text: res.value,
      id: res.id,
      createdDate: res.created_at,
    };

    return randomJoke;
  }

  ngOnDestroy() {}
}
