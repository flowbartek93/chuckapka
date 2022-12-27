import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';

import { editionInput } from '../models/controls.model';
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
    originalText: new FormControl(''),
  });

  get selectedJoke() {
    return this.form.get('selectedJoke')?.value;
  }

  get editedText() {
    return this.form.get('editedText')?.value;
  }

  ngOnInit(): void {}

  onModify() {
    if (this.selectedJoke) {
      const modifiedJoke: Joke = {
        ...this.selectedJoke,
        createdDate: new Date().toLocaleString().replaceAll('.', '-'),
        text: this.editedText ? this.editedText : '',
      };

      this.store$.dispatch(actions.modifySingleJoke({ joke: modifiedJoke }));
    }
  }

  onSelectChange(selectedJoke: Joke) {
    this.form
      .get('editedText')
      ?.patchValue(selectedJoke.text, { emitEvent: false });

    this.form
      .get('originalText')
      ?.patchValue(selectedJoke.text, { emitEvent: false });
  }

  public ngDoCheck() {
    console.log('doCheck');
  }
}
