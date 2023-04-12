import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss'],
})
export class ServiceComponent implements OnInit {
  constructor() {}

  get selectedOption(): AbstractControl {
    return this.form.controls['selection'];
  }

  form: FormGroup = new FormGroup({
    selection: new FormControl('Store'),
  });

  ngOnInit(): void {}
}
