import {
  tSearchAdvancedState,
  tSearchReduxState,
  tSearchSettings
} from './searchTypes';

// Base url for GitHub searching
export const gitRepoSearchUrl = 'https://api.github.com/search/repositories?q=';

// Advanced search params
export const initialAdvancedSearchState: tSearchAdvancedState = {
  user: '',
  org: '',
  languageDraft: '',
  language: [],
  topicDraft: '',
  topic: [],
  stars: {
    range: '>',
    min: 0,
    max: 0,
    rangeMin: '',
    rangeMax: '',
    showSlider: false
  },
  size: {
    range: '>',
    min: 0,
    max: 0,
    rangeMin: '',
    rangeMax: '',
    showSlider: false
  },
  created: { range: '<=', min: '', max: '' }
};

// Search redux
export const initialSearchReduxState: tSearchReduxState = {
  status: 'idle',
  message: '',
  action: false,
  countResults: 0,
  countPages: 0,
  data: [],
  formParams: {
    advanced: false,
    keyword: '',
    keywordErrorShow: false,
    inName: true,
    inDescription: false,
    inReadme: false,
    ...initialAdvancedSearchState
  },
  formErrors: {
    keyword: '',
    searchIn: '',
    user: '',
    org: '',
    languageDraft: '',
    topicDraft: '',
    starsMin: '',
    starsMax: '',
    sizeMin: '',
    sizeMax: '',
    createdMin: '',
    createdMax: ''
  },
  queryParams: {
    baseUrl: '',
    sort: '',
    order: 'desc',
    per_page: '10',
    page: '1'
  },
  historySelected: 0,
  history: []
};

// Search page basic settings
export const searchSettings: tSearchSettings = {
  minLength: 3,
  validationDelayMs: 1000,
  tagMaxVisible: 5
};
