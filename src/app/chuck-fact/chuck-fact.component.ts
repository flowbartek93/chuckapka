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
    this.joke$ = this.factService.randomJokeObservable$;
  }

  joke$: Observable<Joke | null> = new Observable();

  ngOnInit(): void {}
}
