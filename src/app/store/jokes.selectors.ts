import { createFeatureSelector, createSelector } from '@ngrx/store';
import { jokeAdapter, jokeFeatureKey, jokeState } from './jokes.reducer';

export const appState = createFeatureSelector<jokeState>(jokeFeatureKey);

export const jokeListState = createSelector(appState, (state) => state.list);

export const editedJokesState = createSelector(
  appState,
  (state) => state.editedJokes
);

export const jokeListSelectors = jokeAdapter.getSelectors(jokeListState);
export const editedJokesListSelectors =
  jokeAdapter.getSelectors(editedJokesState);

export const entireList = jokeListSelectors.selectAll;
export const entireEditedList = editedJokesListSelectors.selectAll;

export const jokeList = createSelector(entireList, (list) => list);

export const editedJokesList = createSelector(
  entireEditedList,
  (editedJokesList) => editedJokesList
);
