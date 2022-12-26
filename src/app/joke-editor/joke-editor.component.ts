import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';

import { editionInput } from '../models/userInput.model';
import * as jokeSelectors from './../store/jokes.selectors';
import * as actions from './../store/jokes.actions';
import { Joke } from '../models/joke.model';
@Component({
  selector: 'app-joke-editor',
  templateUrl: './joke-editor.component.html',
  styleUrls: ['./joke-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JokeEditorComponent implements OnInit {
  constructor(private store$: Store) {}

  pickedJokesList$ = this.store$.select(jokeSelectors.jokeList);

  form: FormGroup<editionInput> = new FormGroup<editionInput>({
    selectedJoke: new FormControl(null, [Validators.required]),
    editedText: new FormControl('', Validators.required),
  });

  get selectedJoke() {
    return this.form.get('selectedJoke');
  }

  get editedText() {
    return this.form.get('editedText');
  }

  ngOnInit(): void {}

  onModify() {
    //store distpach[mod. joke] -> editedJokes(store) ->

    if (this.selectedJoke?.value) {
      const modifiedJoke: Joke = {
        ...this.selectedJoke?.value,
        createdDate: new Date().toLocaleString().replaceAll('.', '-'),
        text: this.editedText?.value ? this.editedText.value : '',
      };

      console.log(modifiedJoke);

      this.store$.dispatch(actions.modifySingleJoke({ joke: modifiedJoke }));
    }
  }
}
