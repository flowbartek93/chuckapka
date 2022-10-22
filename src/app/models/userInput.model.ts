import { Form, FormControl } from '@angular/forms';

export interface userInput {
  search: FormControl<string | null>;
  category: FormControl<string | undefined>;
}
