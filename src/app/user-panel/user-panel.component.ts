import { Component, OnInit } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { FactService } from '../fact.service';
import { httpJokeResponse } from '../models/httpJokeResponse.model';
import { Joke } from '../models/joke.model';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserPanelComponent implements OnInit {
  constructor(private factService: FactService) {}

  public downloadRandomJoke(): void {
    this.factService.getRandomJoke();
  }

  ngOnInit(): void {}

  private generateRandomJoke(res: httpJokeResponse): Joke {
    const randomJoke: Joke = {
      text: res.value,
      id: res.id,
      createdDate: res.created_at,
    };

    return randomJoke;
  }

  ngOnDestroy() {}
}
