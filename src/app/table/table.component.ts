import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FactService } from '../fact.service';
import { httpJokeResponse } from '../models/httpJokeResponse.model';
import { httpSearchJokeResponse } from '../models/httpSearchJokeResponse.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnInit {
  // @Input() public get response(): httpSearchJokeResponse | null {
  //   return this._response;
  // }

  // set response(response: httpSearchJokeResponse | null) {
  //   if (response) {
  //     this.totalHits = response?.total;
  //     this.results = response?.result;
  //   }
  // }

  constructor(
    private factService: FactService,
    private activatedRoute: ActivatedRoute
  ) {}

  searchedJoke$: Observable<httpSearchJokeResponse> =
    this.factService.searchedJokeObservable$;

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.activatedRoute.queryParams.subscribe(({ searchPhrase }) => {
      if (searchPhrase) {
        this.factService.getJokeBySearchPhrase(searchPhrase);
      }
    });
  }
}
