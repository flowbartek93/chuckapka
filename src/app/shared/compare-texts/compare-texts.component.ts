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
import { Observable, tap } from 'rxjs';
import { editionInput } from 'src/app/models/controls.model';

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
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: CompareTextsComponent,
    },
  ],
})
export class CompareTextsComponent implements OnInit, ControlValueAccessor {
  constructor() {}

  @Input() originalText: string | null = null;

  get originalTextControl(): AbstractControl | null {
    return this.form.get('originalText');
  }

  form: FormGroup = new FormGroup({
    editedText: new FormControl(null, Validators.required),
    originalText: new FormControl(''),
  });

  ngOnInit(): void {}

  ngOnChanges() {
    if (this.originalText) {
      this.originalTextControl?.patchValue(this.originalText, {
        emitEvent: false,
      });
    }
  }

  onChange = (value: any) => {
    console.log(value);
  };

  writeValue(text: string): void {
    console.log(text);
  }

  registerOnChange(onChange: any): void {
    this.onChange = onChange;
  }

  registerOnTouched(fn: any): void {}
}
