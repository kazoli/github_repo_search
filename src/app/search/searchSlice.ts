import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getSearch } from './searchService';
import { tSearchReduxState } from './searchTypes';
import { initialSearchReduxState } from './searchInitialStates';
import { searchBuildPartUrl, searchValidateAll } from './searchMiddleware';

const searchSlice = createSlice({
  name: 'search',
  initialState: initialSearchReduxState,
  reducers: {
    searchSetParam: (
      state,
      action: PayloadAction<{
        param: keyof tSearchReduxState['formParams'];
        value:
          | string
          | boolean
          | { param: string; value: string | number | boolean };
      }>
    ) => {
      if (typeof action.payload.value === 'object') {
        (state.formParams[action.payload.param] as object) = {
          ...(state.formParams[action.payload.param] as object),
          [action.payload.value.param]: action.payload.value.value
        };
      } else {
        (state.formParams[action.payload.param] as string | boolean) =
          action.payload.value;
      }
    },
    searchSetError: (
      state,
      action: PayloadAction<{
        param: keyof tSearchReduxState['formErrors'];
        value: string;
      }>
    ) => {
      (state.formErrors[action.payload.param] as string) = action.payload.value;
    },
    searchManageTag: (
      state,
      action: PayloadAction<{
        param: 'language' | 'topic';
        createFrom: false | 'languageDraft' | 'topicDraft';
        value: string;
      }>
    ) => {
      if (action.payload.createFrom) {
        (state.formParams[action.payload.param] as string[]) = [
          state.formParams[action.payload.createFrom],
          ...state.formParams[action.payload.param]
        ];
        state.formParams[action.payload.createFrom] = '';
      } else {
        (state.formParams[action.payload.param] as string[]) = state.formParams[
          action.payload.param
        ].filter((tag) => tag !== action.payload.value);
      }
    },
    searchAction: (
      state,
      action: PayloadAction<tSearchReduxState['action']>
    ) => {
      switch (action.payload) {
        case 'validation':
          state.status = 'loading';
          state.formParams.keywordErrorShow = true;
          state.action = 'validation';
          break;
        case 'request':
          // validate all before real request call triggering
          if (searchValidateAll(state.formParams, state.formErrors)) {
            state.status = 'idle';
            state.action = false;
          } else {
            state.queryParams.baseUrl = searchBuildPartUrl(state.formParams);
            state.queryParams.page = '1';
            state.action = 'request';
          }
          break;
        default:
          state.action = false;
      }
    },
    searchReset: (state) => {
      state.countResults = 0;
      state.data = [];
      state.formParams = initialSearchReduxState['formParams'];
      state.formErrors = initialSearchReduxState['formErrors'];
      state.queryParams = initialSearchReduxState['queryParams'];
    },
    searchSetQueryParams: (
      state,
      action: PayloadAction<{
        param: keyof tSearchReduxState['queryParams'];
        value: string;
      }>
    ) => {
      state.status = 'loading';
      state.action = 'request';
      switch (action.payload.param) {
        case 'sort':
        case 'order':
        case 'per_page':
          state.queryParams.page = '1';
          (state.queryParams[action.payload.param] as string) =
            action.payload.value;
          break;
        case 'page':
          state.queryParams.page = action.payload.value;
          break;
      }
    },
    searchSelectHistory: (state, action: PayloadAction<number>) => {
      state.historySelected = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSearch.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getSearch.fulfilled, (state, action) => {
        state.status = 'idle';
        state.data = action.payload.response;
        state.countResults = action.payload.countResults;
        // prettier-ignore
        state.countPages = Math.ceil(
          action.payload.countResults /
          parseInt(state.queryParams.per_page)
        );
        if (state.queryParams.page === '1') {
          // store only if first page query
          state.history = [
            {
              data: action.payload.response,
              query: action.payload.query
            },
            ...state.history
          ];
          // if new request, set history to first element show
          state.historySelected = 0;
        }
      })
      .addCase(getSearch.rejected, (state, action) => {
        state.status = 'failed';
      });
  }
});

export const {
  searchSetParam,
  searchSetError,
  searchManageTag,
  searchAction,
  searchReset,
  searchSetQueryParams,
  searchSelectHistory
} = searchSlice.actions;
export default searchSlice.reducer;
