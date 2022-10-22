import { Form, FormControl } from '@angular/forms';

export interface userInput {
  search: FormControl<string>;
  category: FormControl<string>;
}
