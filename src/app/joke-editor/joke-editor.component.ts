import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';

import { editionInput } from '../models/controls.model';
import * as jokeSelectors from './../store/jokes.selectors';
import * as actions from './../store/jokes.actions';
import { Joke } from '../models/joke.model';
import { find, first, map, Subject, take, takeUntil, tap } from 'rxjs';
@Component({
  selector: 'app-joke-editor',
  templateUrl: './joke-editor.component.html',
  styleUrls: ['./joke-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JokeEditorComponent implements OnInit {
  constructor(private store$: Store) {}

  pickedJokesList$ = this.store$.select(jokeSelectors.jokeList);
  editedJokesList$ = this.store$.select(jokeSelectors.editedJokesList);

  form: FormGroup<editionInput> = new FormGroup<editionInput>({
    selectedJoke: new FormControl(null, [Validators.required]),
    editedText: new FormControl('', Validators.required),
    originalText: new FormControl(''),
  });

  _onDestroy$: Subject<boolean> = new Subject();

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
        text: this.editedText ?? '',
      };

      this.store$.dispatch(actions.modifySingleJoke({ joke: modifiedJoke }));
    }
  }

  onSelectChange(selectedJoke: Joke) {
    this.editedJokesList$
      .pipe(
        first(),
        map((jokes) => jokes.find((j) => j.id === selectedJoke.id)),
        tap((v) => {
          this.form
            .get('editedText')
            ?.patchValue(v?.text || selectedJoke.text, { emitEvent: false });
        }),
        takeUntil(this._onDestroy$)
      )
      .subscribe();

    this.form
      .get('originalText')
      ?.patchValue(selectedJoke.text, { emitEvent: false });
  }

  ngOnDestroy() {
    this._onDestroy$.next(true);
    this._onDestroy$.unsubscribe();
  }
}
