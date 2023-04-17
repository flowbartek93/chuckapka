import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { SelectionEnum } from '../shared/enums/radioSelection.enum';
import { map } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss'],
})
export class ServiceComponent implements OnInit {
  constructor(private router: Router) {
    this.form.valueChanges
      .pipe(map((v: { selection: SelectionEnum }) => v.selection))
      .subscribe((v: SelectionEnum): void => {
        if (SelectionEnum.Store) {
          // this.router.navigate(['table'], {
          //   skipLocationChange: true,
          //   queryParams: { service: true, type: SelectionEnum.Store },
          // });
        }
        if (SelectionEnum.Server) {
          // this.router.navigate(['table'], {
          //   skipLocationChange: true,
          //   queryParams: { service: true, type: SelectionEnum.Server },
          // });
        }
      });
  }

  get selectedOption(): AbstractControl {
    return this.form.controls['selection'];
  }

  form: FormGroup = new FormGroup({
    selection: new FormControl('Store'),
  });

  ngOnInit(): void {
    this.selectedOption.patchValue('Store');
  }
}
