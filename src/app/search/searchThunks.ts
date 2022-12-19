import { tSearchResultData } from './searchTypes';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { errorHandler } from '../general/error';
import axios from 'axios';

// get search data from github
export const getSearch = createAsyncThunk<
  {
    countResults: number;
    response: tSearchResultData[];
    query: string;
  },
  string,
  { rejectValue: string }
>('search/getSearch', async (query, thunkAPI) => {
  try {
    const response = await axios.get(encodeURI(query));
    return {
      countResults: response.data.total_count,
      response: response.data.items,
      query: query
    };
  } catch (error) {
    return thunkAPI.rejectWithValue(errorHandler(error));
  }
});
