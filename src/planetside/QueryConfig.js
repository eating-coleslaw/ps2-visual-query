const QueryConfig = (
  serviceId = "example",
  defaultCollection = "character"
) => {
  return {
    serviceKey: serviceId,
    namespace: "ps2:v2",
    collection: defaultCollection,
    language: null,
    limit: null,
    conditions: [],
    filterType: "show",
    filterFields: [],
    resolves: [],
    joins: [],
    trees: [],
    start: null,
    sortFields: [],
    sortDirection: -1,
  };
};

export default QueryConfig;
