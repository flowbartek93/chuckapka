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
import { faPlus, IconDefinition } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnInit {
  constructor(
    private factService: FactService,
    private activatedRoute: ActivatedRoute
  ) {}

  public faPlus: IconDefinition = faPlus;

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
