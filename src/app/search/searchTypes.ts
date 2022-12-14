export type tSearchSettings = {
  minLength: number;
  validationDelayMs: number;
  tagMaxVisible: number;
};

export type tSearchResultData = {
  name: string;
  full_name: string;
  html_url: string;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  open_issues_count: number;
  description: string;
  language: string;
  topics: string[];
  created_at: string;
  updated_at: string;
  owner: { login: string; avatar_url: string; html_url: string };
};

export type tSearchAdvancedState = {
  user: string;
  org: string;
  languageDraft: string;
  language: string[];
  topicDraft: string;
  topic: string[];
  stars: {
    range: '=' | '>' | '<' | '..';
    min: number;
    max: number;
    rangeMin: string;
    rangeMax: string;
    showSlider: boolean;
  };
  size: {
    range: '=' | '>' | '<' | '..';
    min: number;
    max: number;
    rangeMin: string;
    rangeMax: string;
    showSlider: boolean;
  };
  created: {
    range: '>' | '>=' | '<' | '<=' | '..';
    min: string;
    max: string;
  };
};

export type tSearchReduxState = {
  status: 'idle' | 'loading' | 'failed';
  message: string;
  action: false | 'validation' | 'request';
  countResults: number;
  countPages: number;
  data: tSearchResultData[];
  formParams: tSearchAdvancedState & {
    advanced: boolean;
    keyword: string;
    keywordErrorShow: boolean;
    inName: boolean;
    inDescription: boolean;
    inReadme: boolean;
  };
  formErrors: {
    keyword: string;
    searchIn: string;
    user: string;
    org: string;
    languageDraft: string;
    topicDraft: string;
    starsMin: string;
    starsMax: string;
    sizeMin: string;
    sizeMax: string;
    createdMin: string;
    createdMax: string;
  };
  queryParams: {
    baseUrl: string;
    sort: string | 'stars' | 'forks';
    order: 'desc' | 'asc';
    per_page: string;
    page: string;
  };
  historySelected: number;
  history: {
    data: tSearchResultData[];
    query: string;
  }[];
};
