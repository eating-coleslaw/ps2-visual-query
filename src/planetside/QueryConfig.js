import QueryTree from "./QueryTree";

const QueryConfig = (
  // serviceId = "example",
  defaultCollection = "character",
  defaultNamespace = "ps2:v2"
) => {
  return {
    namespace: defaultNamespace,
    collection: defaultCollection,
    language: "All",
    limit: 0,
    conditions: [],
    filterType: "show",
    filterFields: [],
    resolves: [],
    joins: [],
    tree: QueryTree(),
    start: null,
    sortFields: [],
    sortDirection: -1,
    // Persistence Properties
    id: null,
    name: "",
    dateCreated: null,
    dateLastModified: null,
    dateLastOpened: null,
    isFavorite: false,
  };
};

export default QueryConfig;
