import { httpJokeResponse } from './httpJokeResponse.model';

export interface httpSearchJokeResponse {
  result: httpJokeResponse[];
  total: number;
}
