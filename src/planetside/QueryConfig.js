import QueryTree from "./QueryTree";
import { v4 as uuidv4 } from 'uuid';

const QueryConfig = (
  // serviceId = "example",
  defaultCollection = "character",
  defaultNamespace = "ps2:v2",
) => {
  return {
    // serviceKey: serviceId,
    namespace: defaultNamespace, //"ps2:v2",
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
    id: null, //uuidv4(),
    name: "",
    dateCreated: null,
    dateLastModified: null,
    dateLastOpened: null,
    isFavorite: false,
  };
};

export default QueryConfig;
