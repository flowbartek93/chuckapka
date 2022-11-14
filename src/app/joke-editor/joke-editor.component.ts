import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FactService } from '../fact.service';
import { Joke } from '../models/joke.model';

@Component({
  selector: 'app-joke-editor',
  templateUrl: './joke-editor.component.html',
  styleUrls: ['./joke-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JokeEditorComponent implements OnInit {
  constructor(
    private factService: FactService,
    private activatedRoute: ActivatedRoute
  ) {}

  randomJoke$: Observable<Joke | null> = this.factService.randomJokeObservable$;

  ngAfterViewInit() {
    this.activatedRoute.queryParams.subscribe(({ category }) => {
      if (category) {
        this.factService.getRandomJoke(category);
      } else {
        this.factService.getRandomJoke();
      }
    });
  }

  ngOnInit(): void {}
}
