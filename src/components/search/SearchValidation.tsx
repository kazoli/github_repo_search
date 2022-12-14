import { useEffect } from 'react';
import { useAppDispatch } from '../../app/general/hooks';
import {
  searchManageTag,
  searchSetError,
  searchSetParam
} from '../../app/search/searchSlice';
import { tSearchReduxState } from '../../app/search/searchTypes';
import {
  searchValidateDateRange,
  searchValidateNumberRange,
  searchValidateInput
} from '../../app/search/searchMiddleware';
import validation from '../../app/general/validation';
import { searchSettings } from '../../app/search/searchInitialStates';

type tProps = {
  formParams: tSearchReduxState['formParams'];
};

function SearchValidation(props: tProps) {
  const dispatch = useAppDispatch();

  // validate keyword
  useEffect(() => {
    const timeOutId = setTimeout(() => {
      if (!props.formParams.keywordErrorShow && props.formParams.keyword) {
        dispatch(searchSetParam({ param: 'keywordErrorShow', value: true }));
      }
      searchValidateInput(true, props.formParams.keyword).then((errorMessage) =>
        dispatch(
          searchSetError({
            param: 'keyword',
            value: errorMessage
          })
        )
      );
    }, searchSettings['validationDelayMs']);
    return () => clearTimeout(timeOutId);
  }, [dispatch, props.formParams.keyword, props.formParams.keywordErrorShow]);

  // validate inName, inDescription and inReadme
  useEffect(() => {
    validation
      .requireCheckedIn([
        props.formParams.inName,
        props.formParams.inDescription,
        props.formParams.inReadme
      ])
      .then((error) =>
        dispatch(
          searchSetError({
            param: 'searchIn',
            value: error ? 'One needs to be checked' : ''
          })
        )
      );
  }, [
    dispatch,
    props.formParams.inName,
    props.formParams.inDescription,
    props.formParams.inReadme
  ]);

  // validate user
  useEffect(() => {
    const timeOutId = setTimeout(() => {
      searchValidateInput(false, props.formParams.user).then((errorMessage) =>
        dispatch(
          searchSetError({
            param: 'user',
            value: errorMessage
          })
        )
      );
    }, searchSettings['validationDelayMs']);
    return () => clearTimeout(timeOutId);
  }, [dispatch, props.formParams.user]);

  // validate org
  useEffect(() => {
    const timeOutId = setTimeout(() => {
      searchValidateInput(false, props.formParams.org).then((errorMessage) =>
        dispatch(
          searchSetError({
            param: 'org',
            value: errorMessage
          })
        )
      );
    }, searchSettings['validationDelayMs']);
    return () => clearTimeout(timeOutId);
  }, [dispatch, props.formParams.org]);

  // validate languageDraft and create language tag
  useEffect(() => {
    const timeOutId = setTimeout(() => {
      searchValidateInput(false, props.formParams.languageDraft).then(
        (errorMessage) => {
          dispatch(
            searchSetError({
              param: 'languageDraft',
              value: errorMessage
            })
          );
          if (!errorMessage && props.formParams.languageDraft.length) {
            dispatch(
              searchManageTag({
                param: 'language',
                createFrom: 'languageDraft',
                value: props.formParams.languageDraft
              })
            );
          }
        }
      );
    }, searchSettings['validationDelayMs']);
    return () => clearTimeout(timeOutId);
  }, [dispatch, props.formParams.languageDraft]);

  // validate topicDraft and create topic tag
  useEffect(() => {
    const timeOutId = setTimeout(() => {
      searchValidateInput(false, props.formParams.topicDraft).then(
        (errorMessage) => {
          dispatch(
            searchSetError({
              param: 'topicDraft',
              value: errorMessage
            })
          );
          if (!errorMessage && props.formParams.topicDraft.length) {
            dispatch(
              searchManageTag({
                param: 'topic',
                createFrom: 'topicDraft',
                value: props.formParams.topicDraft
              })
            );
          }
        }
      );
    }, searchSettings['validationDelayMs']);
    return () => clearTimeout(timeOutId);
  }, [dispatch, props.formParams.topicDraft]);

  // validate stars
  useEffect(() => {
    dispatch(
      searchSetParam({
        param: 'stars',
        value: { param: 'showSlider', value: false }
      })
    );
    const timeOutId = setTimeout(() => {
      searchValidateNumberRange(
        props.formParams.stars.range,
        'starsMin',
        'starsMax',
        props.formParams.stars.rangeMin,
        props.formParams.stars.rangeMax
      ).then((errorMessages) => {
        dispatch(
          searchSetError({
            param: 'starsMin',
            value: errorMessages['starsMin']
          })
        );
        dispatch(
          searchSetError({
            param: 'starsMax',
            value: errorMessages['starsMax']
          })
        );
        if (
          props.formParams.stars.rangeMin.length &&
          props.formParams.stars.rangeMax.length &&
          !errorMessages['starsMin'] &&
          !errorMessages['starsMax']
        ) {
          const min = parseInt(props.formParams.stars.rangeMin);
          const max = parseInt(props.formParams.stars.rangeMax);
          dispatch(
            searchSetParam({
              param: 'stars',
              value: { param: 'min', value: min }
            })
          );
          dispatch(
            searchSetParam({
              param: 'stars',
              value: { param: 'max', value: max }
            })
          );
          dispatch(
            searchSetParam({
              param: 'stars',
              value: { param: 'showSlider', value: true }
            })
          );
        }
      });
    }, searchSettings['validationDelayMs']);
    return () => clearTimeout(timeOutId);
  }, [
    dispatch,
    props.formParams.stars.range,
    props.formParams.stars.rangeMin,
    props.formParams.stars.rangeMax
  ]);

  // validate size
  useEffect(() => {
    dispatch(
      searchSetParam({
        param: 'size',
        value: { param: 'showSlider', value: false }
      })
    );
    const timeOutId = setTimeout(() => {
      searchValidateNumberRange(
        props.formParams.size.range,
        'sizeMin',
        'sizeMax',
        props.formParams.size.rangeMin,
        props.formParams.size.rangeMax
      ).then((errorMessages) => {
        dispatch(
          searchSetError({
            param: 'sizeMin',
            value: errorMessages['sizeMin']
          })
        );
        dispatch(
          searchSetError({
            param: 'sizeMax',
            value: errorMessages['sizeMax']
          })
        );
        if (
          props.formParams.size.rangeMin.length &&
          props.formParams.size.rangeMax.length &&
          !errorMessages['sizeMin'] &&
          !errorMessages['sizeMax']
        ) {
          const min = parseInt(props.formParams.size.rangeMin);
          const max = parseInt(props.formParams.size.rangeMax);
          dispatch(
            searchSetParam({
              param: 'size',
              value: { param: 'min', value: min }
            })
          );
          dispatch(
            searchSetParam({
              param: 'size',
              value: { param: 'max', value: max }
            })
          );
          dispatch(
            searchSetParam({
              param: 'size',
              value: { param: 'showSlider', value: true }
            })
          );
        }
      });
    }, searchSettings['validationDelayMs']);
    return () => clearTimeout(timeOutId);
  }, [
    dispatch,
    props.formParams.size.range,
    props.formParams.size.rangeMin,
    props.formParams.size.rangeMax
  ]);

  useEffect(() => {
    searchValidateDateRange(
      props.formParams.created.range,
      'createdMin',
      'createdMax',
      props.formParams.created.min,
      props.formParams.created.max
    ).then((errorMessages) => {
      dispatch(
        searchSetError({
          param: 'createdMin',
          value: errorMessages['createdMin']
        })
      );
      dispatch(
        searchSetError({
          param: 'createdMax',
          value: errorMessages['createdMax']
        })
      );
    });
  }, [
    dispatch,
    props.formParams.created.range,
    props.formParams.created.min,
    props.formParams.created.max
  ]);
}

export default SearchValidation;
