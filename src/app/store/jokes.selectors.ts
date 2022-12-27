import { createFeatureSelector, createSelector } from '@ngrx/store';
import { jokeAdapter, jokeFeatureKey, jokeState } from './jokes.reducer';

export const appState = createFeatureSelector<jokeState>(jokeFeatureKey);

export const jokeListState = createSelector(appState, (state) => state.list);

export const jokeListSelectors = jokeAdapter.getSelectors(jokeListState);
export const entireList = jokeListSelectors.selectAll;

export const jokeList = createSelector(entireList, (list) => list);
