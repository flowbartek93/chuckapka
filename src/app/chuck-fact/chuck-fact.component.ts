import { ChangeDetectionStrategy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import {} from '@angular/core';
import { FactService } from '../fact.service';

@Component({
  selector: 'app-chuck-fact',
  templateUrl: './chuck-fact.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChuckFactComponent implements OnInit {
  constructor(private factService: FactService) {}

  ngOnInit(): void {}
}
