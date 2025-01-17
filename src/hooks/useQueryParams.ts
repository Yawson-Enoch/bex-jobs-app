import {
  parseAsInteger,
  parseAsString,
  parseAsStringLiteral,
  useQueryState,
  useQueryStates,
  type Options,
} from 'nuqs';

import {
  SORT_OPTIONS,
  STATUS_OPTIONS,
  TYPE_OPTIONS,
  VIEW_OPTIONS,
} from '~/lib/utils';

const queryOptions: Options = {
  history: 'replace', // keep url history clean __ pushing to the history stack is not needed for this feature
  shallow: true, // page is not re-rendered __ no network request trigger
  scroll: false, // do not scroll to the top on query string change
  clearOnDefault: true, // remove default value from the url when new value === default value __ makes sense as it does not initially show
};

export function useView() {
  return useQueryState(
    'view',
    parseAsStringLiteral(VIEW_OPTIONS)
      .withDefault('list')
      .withOptions(queryOptions),
  );
}

export function useFilter() {
  return useQueryStates(
    {
      limit: parseAsInteger.withDefault(10),
      page: parseAsInteger.withDefault(1),
      search: parseAsString.withDefault(''),
      status: parseAsStringLiteral(STATUS_OPTIONS)
        .withDefault('all')
        .withOptions(queryOptions),
      type: parseAsStringLiteral(TYPE_OPTIONS)
        .withDefault('all')
        .withOptions(queryOptions),
      sort: parseAsStringLiteral(SORT_OPTIONS)
        .withDefault('latest')
        .withOptions(queryOptions),
    },
    queryOptions,
  );
}
