import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as jokeSelectors from './../store/jokes.selectors';
import { Joke } from '../models/joke.model';
import { JokeEditorService } from './joke-editor.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-joke-editor',
  templateUrl: './joke-editor.component.html',
  styleUrls: ['./joke-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [JokeEditorService],
})
export class JokeEditorComponent implements OnInit {
  constructor(
    private store$: Store,
    private jokeEditorService: JokeEditorService
  ) {}

  pickedJokesList$ = this.store$.select(jokeSelectors.jokeList);

  public compareTextControl: FormControl = new FormControl('');

  // form: FormGroup = new FormGroup({
  //   selectedJoke: new FormControl(null, [Validators.required]),
  // });

  // _onDestroy$: Subject<boolean> = new Subject();

  public selectedJokeText: string | null = null;

  // get editedText() {
  //   return this.form.get('editedText')?.value;
  // }

  get editedJokes() {
    return this.jokeEditorService.editedJokes;
  }

  ngOnInit(): void {}

  onModify() {
    // if (this.selectedJoke) {
    //   const modifiedJoke: Joke = {
    //     ...this.selectedJoke,
    //     createdDate: new Date().toLocaleString().replaceAll('.', '-'),
    //     text: this.editedText ?? '',
    //   };
    //   this.store$.dispatch(actions.modifySingleJoke({ joke: modifiedJoke }));
    //   this.jokeEditorService.getEditedJokesList();
    // }
  }

  onSelectChange(selectedJoke: Joke) {
    if (selectedJoke.text) {
      this.selectedJokeText = selectedJoke.text;
    }

    this.compareTextControl.patchValue(this.selectedJokeText);

    // const editedJoke = this.editedJokes.find((j) => j.id === selectedJoke.id);

    // this.form
    //   .get('originalText')
    //   ?.patchValue(selectedJoke.text, { emitEvent: false });

    // this.form
    //   .get('editedText')
    //   ?.patchValue(editedJoke?.text ?? selectedJoke.text, { emitEvent: false });
  }

  // ngOnDestroy() {
  //   this._onDestroy$.next(true);
  //   this._onDestroy$.unsubscribe();
  // }
}
