import { Component, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  Validators,
} from '@angular/forms';


@Component({
  selector: 'app-compare-texts',
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

  form: FormGroup = new FormGroup({
    editedText: new FormControl('', Validators.required),
    originalText: new FormControl(''),
  });

  ngOnInit(): void {}

  onChange = () => {};

  writeValue(text: string): void {}

  registerOnChange(onChange: any): void {
    this.onChange = onChange;
  }

  registerOnTouched(fn: any): void {}
}
