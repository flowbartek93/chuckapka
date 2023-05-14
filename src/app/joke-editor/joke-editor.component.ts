import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as jokeSelectors from './../store/jokes.selectors';
import { Joke } from '../models/joke.model';
import { JokeStoreService } from '../services/joke-store.service';
import { FormControl } from '@angular/forms';
import * as actions from './../store/jokes.actions';

@Component({
  selector: 'app-joke-editor',
  templateUrl: './joke-editor.component.html',
  styleUrls: ['./joke-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [JokeStoreService],
})
export class JokeEditorComponent implements OnInit {
  constructor(
    private store$: Store,
    private jokeStoreService: JokeStoreService
  ) {
    this.compareTextControl.valueChanges.subscribe((v) => {
      this.editedJokeText = v;
      this.modifyEnabled = true;
    });
  }

  pickedJokesList$ = this.jokeStoreService.jokesList$;

  public compareTextControl: FormControl = new FormControl('');

  public selectedJokeText: string | null = null;

  private selectedJoke: Joke | null = null;

  private editedJokeText: string | null = null;

  public modifyEnabled = false;

  ngOnInit(): void {}

  onModify() {
    if (this.editedJokeText && this.selectedJoke) {
      const modifiedJoke: Joke = {
        ...this.selectedJoke,
        createdDate: new Date().toLocaleString().replaceAll('.', '-'),
        text: this.editedJokeText,
      };

      this.store$.dispatch(actions.modifySingleJoke({ joke: modifiedJoke }));
    }
  }

  onSelectChange(selectedJoke: Joke) {
    this.selectedJoke = selectedJoke;

    if (selectedJoke.text) {
      this.selectedJokeText = selectedJoke.text;
    }

    this.compareTextControl.patchValue(this.selectedJokeText, {
      emitEvent: false,
    });
  }
}
