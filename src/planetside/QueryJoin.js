import { v4 as uuidv4 } from 'uuid';

const QueryJoin = (parentJoinId = null) => {
  // const parentId = parentJoinId;
  // const id = uuidv4();

  // let collection = "";
  // let injectAt = "";
  // let isOuterJoin = false;
  // let isList = false;
  // let onField = "";
  // let toField = "";
  // let filterType = "show";
  // let filterFields = [];
  // let terms = [];
  // let joins = [];
  
  // const getId = () => id;
  // const getParentId = () => parentId;
  // const getCollection = () => collection;
  // const getInjectAt = () => injectAt;
  // const getIsOuterJoin = () => isOuterJoin;
  // const getIsList = () => isList;
  // const getOnField = () => onField;
  // const getToField = () => toField;
  // const getFilterType = () => filterType;
  // const getFilterFields = () => filterFields;
  // const getTerms = () => terms;
  // const getJoins = () => joins;

  // const setProperty = (propertyName, propertyValue) => {
  //   switch(propertyName) {
  //     case "collection":
  //       collection = propertyValue;
  //       break;

  //     case "injectAt":
  //       injectAt = propertyValue;
  //       break;

  //     case "isOuterJoin":
  //       isOuterJoin = propertyValue;
  //       break;

  //     case "isList":
  //       isList = propertyValue;
  //       break;

  //     case "onField":
  //       onField = propertyValue;
  //       break;

  //     case "toField":
  //       toField = propertyValue;
  //       break;

  //     case "filterType":
  //       filterType = propertyValue;
  //       break;

  //     case "filterFields":
  //       filterFields = propertyValue;
  //       break;

  //     case "terms":
  //       terms = propertyValue;
  //       break;

  //     case "joins":
  //       joins = propertyValue;
  //       break;

  //     default:
  //       break;
  //   }
  // } 

  // const addTerm = (term) => {
  //   terms.push(term);
  // }

  // const removeTerm = (id) => {
  //   terms = terms.filter((term) => term.id !== id);
  // }
  
  // const addJoin = (join) => {
  //   joins.push(join);
  // }

  // const removeJoin = (id) => {
  //   joins = joins.filter((join) => join.id !== id);
  // }

  return {
    id: uuidv4(),
    parentId: parentJoinId,
    collection: "",
    injectAt: "",
    isOuterJoin: false,
    isList: false,
    onField: "",
    toField: "",
    filterType: "show",
    filterFields: [],
    terms: [],
    joins: [],
    // getId,
    // getParentId,
    // getCollection,
    // getInjectAt,
    // getIsOuterJoin,
    // getIsList,
    // getOnField,
    // getToField,
    // getFilterType,
    // getFilterFields,
    // getTerms,
    // getJoins,
    // addTerm,
    // removeTerm,
    // addJoin,
    // removeJoin,
    // setProperty,
    // parentId,
    // id,
    // collection,
    // injectAt,
    // isOuterJoin,
    // isList,
    // onField,
    // toField,
    // filterType,
    // filterFields,
    // terms,
    // joins,
  }
}

export default QueryJoin;