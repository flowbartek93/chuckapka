import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  Validators,
} from '@angular/forms';
import { distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'compare-texts',
  templateUrl: './compare-texts.component.html',
  styleUrls: ['./compare-texts.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: CompareTextsComponent,
    },
  ],
})
export class CompareTextsComponent implements OnInit, ControlValueAccessor {
  constructor() {
    this.editedTextControl?.valueChanges
      .pipe(distinctUntilChanged())
      .subscribe((text) => console.log(text));
  }

  @Input() originalText: string | null = null;

  get originalTextControl(): AbstractControl | null {
    return this.form.get('originalText');
  }

  get editedTextControl(): AbstractControl | null {
    return this.form.get('editedText');
  }

  form: FormGroup = new FormGroup({
    editedText: new FormControl(''),
    originalText: new FormControl(''),
  });

  ngOnInit(): void {}

  onChange = (value: any) => {
    console.log(value);
  };

  writeValue(text: string): void {
    this.originalTextControl?.patchValue(text, {
      emitEvent: false,
    });

    this.editedTextControl?.patchValue(text, {
      emitEvent: false,
    });
  }

  registerOnChange(onChange: any): void {
    console.log(onChange);
    this.onChange = onChange;
  }

  registerOnTouched(fn: any): void {}
}
