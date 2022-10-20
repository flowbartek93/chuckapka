import { ChangeDetectionStrategy } from '@angular/core';
import { Component, OnInit, Input, Output } from '@angular/core';
import {} from '@angular/core';
import { FactService } from '../fact.service';
import { Joke } from '../models/joke.model';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-chuck-fact',
  templateUrl: './chuck-fact.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChuckFactComponent implements OnInit {
  constructor(private factService: FactService) {
    this.randomJoke$ = this.factService.randomJokeObservable$;
    this.searchedJoke$ = this.factService.searchedJokeObservable$;
  }

  randomJoke$: Observable<Joke | null> = new Observable();
  searchedJoke$: Observable<Joke | null> = new Observable();

  //searchedJoke nie zwaraca wcale Joke a tablice result[] znalezionych i total hits...

  ngOnInit(): void {}
}
