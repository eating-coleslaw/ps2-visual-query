const CensusQuery = require("dbgcensus").Query;

export default function convertToCensusQuery(query) {
  let censusQuery = new CensusQuery(query.collection, query.namespace);

  if (!!query.language && query.language !== "All") {
    censusQuery.setLanguage(query.language.toLowerCase());
  }

  if (query.limit !== null && query.limit !== 0) {
    censusQuery.setLimit(query.limit);
  }

  if (query.start !== null) {
    censusQuery.setStart(query.start);
  }

  if (query.filterFields.length > 0) {
    censusQuery[`${query.filterType}Fields`](query.filterFields);
  }

  if (query.resolves.length > 0) {
    censusQuery.resolve(query.resolves);
  }

  if (query.sortFields.length > 0) {
    censusQuery.sort(query.sortFields);
  }

  if (query.conditions.length > 0) {
    query.conditions.forEach((condition) => {
      const field = condition.field;
      const operator = condition.operator;
      const value = condition.value;

      if (!!field && !!operator && !!value) {
        censusQuery.where(field)[operator.name](value);
      }
    });
  }

  return censusQuery;
}
