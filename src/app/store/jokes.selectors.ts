import { createFeatureSelector, createSelector } from '@ngrx/store';
import { jokeAdapter, jokeFeatureKey, jokeState } from './jokes.reducer';

export const appState = createFeatureSelector<jokeState>('Jokes');

export const jokeListState = createSelector(appState, (state) => state.list);
//to zwraca jako pelne obiekty ze store, a chcemy porst typ []

export const jokeListSelectors = jokeAdapter.getSelectors(jokeListState);
export const entireList = jokeListSelectors.selectAll;

export const jokeList = createSelector(entireList, (list) => list);
