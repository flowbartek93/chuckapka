import { Form, FormControl } from '@angular/forms';
import { Joke } from './joke.model';

export interface userInput {
  search: FormControl<string | null>;
  category: FormControl<string | undefined>;
}

export interface editionInput {
  selectedJoke: FormControl<Joke | null>;
  editedText: FormControl<string | null>;
  originalText: FormControl<string | null>;
}
