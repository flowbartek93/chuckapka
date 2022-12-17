import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FactService } from '../fact.service';
import { Joke } from '../models/joke.model';
import * as jokeSelectors from './../store/jokes.selectors';
@Component({
  selector: 'app-joke-editor',
  templateUrl: './joke-editor.component.html',
  styleUrls: ['./joke-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JokeEditorComponent implements OnInit {
  constructor(
    private store$: Store,
    private factService: FactService,
    private activatedRoute: ActivatedRoute
  ) {}

  pickedJokesList$ = this.store$.select(jokeSelectors.jokeList);
  // randomJoke$: Observable<Joke | null> = this.factService.randomJokeObservable$;

  // ngAfterViewInit() {
  //   this.activatedRoute.queryParams.subscribe(({ category }) => {
  //     if (category) {
  //       this.factService.getRandomJoke(category);
  //     } else {
  //       console.log(category);
  //       this.factService.getRandomJoke();
  //     }
  //   });
  // }

  ngOnInit(): void {
    this.pickedJokesList$.subscribe((v) => console.log(v));
  }
}
