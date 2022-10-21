import { ChangeDetectionStrategy } from '@angular/core';
import { Component, OnInit, Input, Output } from '@angular/core';
import {} from '@angular/core';
import { FactService } from '../fact.service';
import { Joke } from '../models/joke.model';
import { Observable, Subscription } from 'rxjs';
import { httpJokeResponse } from '../models/httpJokeResponse.model';
import { httpSearchJokeResponse } from '../models/httpSearchJokeResponse.model';

@Component({
  selector: 'app-chuck-fact',
  templateUrl: './chuck-fact.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChuckFactComponent implements OnInit {
  constructor(private factService: FactService) {}

  randomJoke$: Observable<Joke | null> = this.factService.randomJokeObservable$;
  searchedJoke$: Observable<httpSearchJokeResponse> =
    this.factService.searchedJokeObservable$;

  ngOnInit(): void {}
}
