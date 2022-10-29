import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FactService } from '../fact.service';
import { Joke } from '../models/joke.model';

@Component({
  selector: 'app-joke-editor',
  templateUrl: './joke-editor.component.html',
  styleUrls: ['./joke-editor.component.scss'],
})
export class JokeEditorComponent implements OnInit {
  constructor(private factService: FactService) {}

  randomJoke$: Observable<Joke | null> = this.factService.randomJokeObservable$;

  ngOnInit(): void {}
}
