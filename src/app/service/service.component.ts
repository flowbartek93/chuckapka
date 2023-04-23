import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { SelectionEnum } from '../shared/enums/radioSelection.enum';
import { map } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss'],
})
export class ServiceComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute) {
    this.form.valueChanges
      .pipe(map((v: { selection: SelectionEnum }) => v.selection))
      .subscribe((v: SelectionEnum): void => {
        if (v === SelectionEnum.Store) {
          console.log(v);
          this.router.navigate(['/service/table'], {
            skipLocationChange: true,
            queryParams: { service: true, type: SelectionEnum.Store },
          });
        }
        if (v === SelectionEnum.Server) {
          console.log(v);
          this.router.navigate(['/service/table'], {
            skipLocationChange: true,
            queryParams: { service: true, type: SelectionEnum.Server },
          });
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
