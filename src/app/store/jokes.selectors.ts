import { createFeatureSelector, createSelector } from '@ngrx/store';
import { jokeAdapter, jokeFeatureKey, jokeState } from './jokes.reducer';

export const appState = createFeatureSelector<jokeState>('Jokes');

export const jokeList = createSelector(appState, (state) => state.list);
//to zwraca jako pelne obiekty ze store, a chcemy porst typ []
