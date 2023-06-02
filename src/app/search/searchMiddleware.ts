import { gitRepoSearchUrl, searchSettings } from './searchInitialStates';
import { tSearchReduxState } from './searchTypes';
import { scrollToElement } from '../general/useful';
import validation from '../general/validation';

// input validation
export const searchValidateInput = async (required: boolean, value: string) => {
  if (required || value.length) {
    let error: any = await validation.minLength(
      value,
      searchSettings.minLength
    );
    if (error) {
      return `Minimum ${searchSettings.minLength} characters need to enter`;
    } else {
      error = await validation.allowedCharacters(value, '^[A-Za-z0-9\\-]*$');
      return error ? 'Only letters, numbers and a "-" allowed' : '';
    }
  } else {
    return '';
  }
};

// number range validation
export const searchValidateNumberRange = async (
  range: string,
  errorMin: keyof tSearchReduxState['formErrors'],
  errorMax: keyof tSearchReduxState['formErrors'],
  valueMin: string,
  valueMax: string
) => {
  let error: any;
  if (range === '..' && (valueMin.length || valueMax.length)) {
    error = await validation.setTogether(
      errorMin,
      errorMax,
      valueMin,
      valueMax
    );
    if (error[errorMin]) {
      return {
        [errorMin]: 'Minimum value needs to be set',
        [errorMax]: ''
      };
    }
    if (error[errorMax]) {
      return {
        [errorMin]: '',
        [errorMax]: 'Maximum value needs to be set'
      };
    }
    error = await Promise.all([
      validation.isPositiveInteger(valueMin),
      validation.isPositiveInteger(valueMax)
    ]);
    if (error.indexOf(true) !== -1) {
      // prettier-ignore
      return {
        [errorMin]: error[0] ? 'Only positive integer can be entered' : '',
        [errorMax]: error[1] ? 'Only positive integer can be entered' : ''
      };
    } else {
      error = await validation.minBiggerEqualMax(
        parseInt(valueMin),
        parseInt(valueMax),
        true
      );
      if (error) {
        return {
          [errorMin]: 'Minimum needs to be smaller than maximum',
          [errorMax]: 'Maximum needs to be bigger than minimum'
        };
      } else {
        return {
          [errorMin]: '',
          [errorMax]: ''
        };
      }
    }
  } else if (valueMin.length) {
    error = await validation.isPositiveInteger(valueMin);
    return {
      [errorMin]: error ? 'Only positive integer can be entered' : '',
      [errorMax]: ''
    };
  } else {
    return {
      [errorMin]: '',
      [errorMax]: ''
    };
  }
};

// date range validation
export const searchValidateDateRange = async (
  range: string,
  errorMin: keyof tSearchReduxState['formErrors'],
  errorMax: keyof tSearchReduxState['formErrors'],
  valueMin: string,
  valueMax: string
) => {
  if (range === '..' && (!!valueMin || !!valueMax)) {
    let error: any = await validation.setTogether(
      errorMin,
      errorMax,
      valueMin,
      valueMax
    );
    if (error[errorMin]) {
      return {
        [errorMin]: 'From needs to be set',
        [errorMax]: ''
      };
    }
    if (error[errorMax]) {
      return {
        [errorMin]: '',
        [errorMax]: 'To needs to be set'
      };
    }
    error = await validation.minBiggerEqualMax(
      new Date(valueMin).getTime(),
      new Date(valueMax).getTime(),
      false
    );
    if (error) {
      return {
        [errorMin]: 'From can be equal or bigger than to',
        [errorMax]: 'To can be equal or smaller than from'
      };
    } else {
      return {
        [errorMin]: '',
        [errorMax]: ''
      };
    }
  } else {
    return {
      [errorMin]: '',
      [errorMax]: ''
    };
  }
};

// check out validation errors and scroll to first if one exists
export const searchValidateAll = (
  formData: tSearchReduxState['formParams'],
  formErrors: tSearchReduxState['formErrors']
) => {
  if (
    formErrors.keyword ||
    formErrors.searchIn ||
    (formData.advanced &&
      (formErrors.user ||
        formErrors.org ||
        formErrors.languageDraft ||
        formErrors.topicDraft ||
        formErrors.starsMin ||
        formErrors.starsMax ||
        formErrors.sizeMin ||
        formErrors.sizeMax ||
        formErrors.createdMin ||
        formErrors.createdMax))
  ) {
    scrollToElement('smooth', 'center', '.error-message:first-of-type');
    return true;
  } else {
    return false;
  }
};

// create base query URL without sort, order, per_page and page number
export const searchBuildPartUrl = (data: tSearchReduxState['formParams']) => {
  // add keyword with in elements to string
  let baseUrl = data.keyword;
  let inElements = [];
  baseUrl += '+in:';
  if (data.inName) inElements.push('name');
  if (data.inDescription) inElements.push('description');
  if (data.inReadme) inElements.push('readme');
  baseUrl += inElements.join(',');

  if (data.advanced) {
    // add user to string
    if (data.user.length) baseUrl += `+user:${data.user}`;

    // add org to string
    if (data.org.length) baseUrl += `+org:${data.org}`;

    // add languages to string
    if (data.language.length)
      baseUrl += '+language:' + data.language.join('+language:');

    // add topics to string
    if (data.topic.length) baseUrl += `+topic:` + data.topic.join('+topic:');

    // add stars to string
    if (data.stars.rangeMin.length) {
      baseUrl += '+stars:';
      switch (data.stars.range) {
        case '..':
          baseUrl +=
            `${data.stars.min}` + data.stars.range + `${data.stars.max}`;
          break;
        case '<':
        case '>':
          baseUrl += data.stars.range + data.stars.rangeMin;
          break;
        default:
          baseUrl += data.stars.rangeMin;
      }
    }

    // add size to string
    if (data.size.rangeMin.length) {
      baseUrl += '+size:';
      switch (data.size.range) {
        case '..':
          baseUrl += `${data.size.min}` + data.size.range + `${data.size.max}`;
          break;
        case '<':
        case '>':
          baseUrl += data.size.range + data.size.rangeMin;
          break;
        default:
          baseUrl += data.size.rangeMin;
      }
    }

    // add created to string
    if (data.created.min) {
      baseUrl += '+created:';
      switch (data.created.range) {
        case '..':
          baseUrl += data.created.min + data.created.range + data.created.max;
          break;
        default:
          baseUrl += data.created.range + data.created.min;
      }
    }
  }

  return gitRepoSearchUrl + baseUrl;
};

// create full URL for query
export const searchBuildFullUrl = (
  queryParams: tSearchReduxState['queryParams']
) => {
  let fullUrl = queryParams.baseUrl;

  // add sort to full url
  fullUrl += `&sort=${queryParams.sort}`;

  // add order to full url
  fullUrl += `&order=${queryParams.order}`;

  // add per_page to full url
  fullUrl += `&per_page=${queryParams.per_page}`;

  // add page to full url
  fullUrl += `&page=${queryParams.page}`;

  return fullUrl;
};
