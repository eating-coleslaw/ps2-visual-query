// const CensusQuery = require('dbgcensus').Query;

const QueryConfig = (serviceId = "example", defaultCollection = "character") => {
  return {
    serviceKey: serviceId,
    namespace: 'ps2:v2',
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
  }
};

export default QueryConfig;

// const QueryConfig = (serviceId = "example", defaultCollection = "character") => {
//   const namespace = 'ps2:v2';
  
//   let serviceKey = serviceId;
//   let collection = defaultCollection;
//   let language = null;
//   let limit = null;
//   let conditions = [];
//   let filterType = "show";
//   let filterFields = [];
//   let resolves = [];
//   let joins = [];
//   let trees = [];
//   let start = null;
//   let sortFields = [];
//   let sortDirection = -1;

//   const getNamespace = () => namespace;
//   const getServiceKey = () => serviceKey;
//   const getCollection = () => collection;
//   const getLanguage = () => language;
//   const getLimit = () => limit;
//   const getConditions = () => conditions;
//   const getFilterType = () => filterType;
//   const getFilterFields = () => filterFields;
//   const getResolves = () => resolves;
//   const getJoins = () => joins;
//   const getTrees = () => trees;
//   const getStart = () => start;
//   const getSortFields = () => sortFields;
//   const getSortDirection = () => sortDirection;

//   const setProperty = (propertyName, propertyValue) => {
//     switch(propertyName) {
//       case "serviceKey":
//         serviceKey = propertyValue;
//         break;

//       case "collection":
//         collection = propertyValue;
//         break;

//       case "language":
//         language = propertyValue === "All" ? "" : propertyValue.toLowerCase();
//         break;

//       case "limit":
//         limit = propertyValue === 0 ? null : propertyValue;
//         break;

//       case "conditions":
//         conditions = propertyValue;
//         break;

//       case "filterType":
//         filterType = propertyValue.toLowerCase();
//         break;

//       case "filterFields":
//         filterFields = propertyValue;
//         break;

//       case "resolves":
//         resolves = propertyValue;
//         break;

//       case "joins":
//         joins = propertyValue;
//         break;

//       case "trees":
//         trees = propertyValue;
//         break;

//       case "start":
//         start = propertyValue;
//         break;
      
//       case "sortFields":
//         sortFields = propertyValue;
//         break;

//       case "sortDirection":
//         sortDirection = propertyValue;
//         break;

//       default:
//         break;
//     }
//   } 

//   const addCondition = (condition) => {
//     conditions.push(condition);
//   }

//   const removeCondition = (id) => {
//     conditions = conditions.filter((condition) => condition.id !== id);
//   }

//   const addFilterField = (field) => {
//     if (!filterFields.includes(field)) {
//       filterFields.push(field);
//     }
//   }

//   const removeFilterField = (value) => {
//     filterFields = filterFields.filter((field) => field !== value);
//   }

//   const addResolve = (resolve) => {
//     if (!resolves.includes(resolve)) {
//       resolves.push(resolve);
//     }
//   }
  
//   const removeResolve = (value) => {
//     resolves = resolves.filter((resolve) => resolve !== value);
//   }

//   const addJoin = (join) => {
//     joins.push(join);
//   }

//   const removeJoin = (id) => {
//     joins = joins.filter((join) => join.id !== id);
//   }

//   const addTree = (tree) => {
//     trees.push(tree);
//   }

//   const removeTree = (id) => {
//     trees = trees.filter((tree) => tree.id !== id);
//   }

//   const addSortField = (field) => {
//     sortFields.push(field);
//   }

//   const removeSortField = (value) => {
//     sortFields = sortFields.filter((field) => field !== value);
//   }

//   const addQueryJoins = (censusQuery, joinsArray, censusJoin = null) => {
//     if (joinsArray.length > 0) {
//       joinsArray.forEach((join) => {
//         const collection = join.getCollection();

//         if (!!collection) {
//           let serviceJoin =
//             censusJoin !== null
//               ? censusJoin.joinService(collection)
//               : censusQuery.joinService(collection);

//           serviceJoin.isList(join.getIsList());
//           serviceJoin.isOuterJoin(join.getIsOuterJoin());

//           const injectAt = join.getInjectAt();
//           if (!!injectAt) {
//             serviceJoin.injectAt(injectAt);
//           }

//           const onField = join.getOnField();
//           if (!!onField) {
//             serviceJoin.onField(onField);
//           }

//           const toField = join.getToField();
//           if (!!toField) {
//             serviceJoin.toField(toField);
//           }

//           const filterFields = join.getFilterFields();
//           const filterType = join.getFilterType();
//           if (filterFields.length > 0) {
//             serviceJoin[`${filterType}Fields`](filterFields);
//           }

//           const terms = join.getTerms();
//           if (terms.length > 0) {
//             terms.forEach((term) => {
//               if (term.isValid()) {
//                 serviceJoin
//                   .where(term.getField())
//                   [term.getOperator().name](term.getValue());
//               }
//             });
//           }

//           const joins = join.getJoins();
//           if (joins.length > 0) {
//             addQueryJoins(censusQuery, joins, serviceJoin);
//           }
//         }
//       });
//     }
//   }

//   const convertToCensusQuery = () => {
//     let censusQuery = new CensusQuery(
//       collection,
//       namespace,
//       serviceKey
//     );

//     if (!!language && language !== "All") {
//       censusQuery.setLanguage(language.toLowerCase());
//     }

//     if (limit !== null && limit !== 0) {
//       censusQuery.setLimit(limit);
//     }

//     if (start !== null) {
//       censusQuery.setStart(start);
//     }

//     if (filterFields.length > 0) {
//       censusQuery[`${filterType}Fields`](filterFields);
//     }

//     if (resolves.length > 0) {
//       censusQuery.resolve(resolves);
//     }

//     if (sortFields.length > 0) {
//       censusQuery.sort(sortFields);
//     }

//     if (conditions.length > 0) {
//       conditions.forEach((condition) => {
//         if (condition.isValid()) {
//           censusQuery
//             .where(condition.getField())
//             [condition.getOperator().name](condition.getValue());
//         }
//       });
//     }

//     if (joins.length > 0) {
//       censusQuery = addQueryJoins(censusQuery, joins);
//     }

//     return censusQuery;
//   }

//   return {
//     getNamespace,
//     getServiceKey,
//     getCollection,
//     getLanguage,
//     getLimit,
//     getConditions,
//     getFilterType,
//     getFilterFields,
//     getResolves,
//     getJoins,
//     getTrees,
//     getStart,
//     getSortFields,
//     getSortDirection,
//     setProperty,
//     addFilterField,
//     removeFilterField,
//     addResolve,
//     removeResolve,
//     addCondition,
//     removeCondition,
//     addJoin,
//     removeJoin,
//     addTree,
//     removeTree,
//     addSortField,
//     removeSortField,
//     convertToCensusQuery,
//   }
// };

// export default QueryConfig;