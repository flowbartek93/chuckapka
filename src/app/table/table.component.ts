import { Component, Input, OnInit } from '@angular/core';
import { httpJokeResponse } from '../models/httpJokeResponse.model';
import { httpSearchJokeResponse } from '../models/httpSearchJokeResponse.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  totalHits?: number;
  results?: httpJokeResponse[];

  private _response: any;

  @Input() public get response() {
    return this._response;
  }

  set response(response: httpSearchJokeResponse | null) {
    this.totalHits = response?.total;
    this.results = response?.result;
  }

  constructor() {}

  ngOnInit(): void {}
}
