import { v4 as uuidv4 } from 'uuid';

const QueryJoin = (parentJoinId = null) => {
  const parentId = parentJoinId;
  const id = uuidv4();

  let collection = "";
  let injectAt = "";
  let isOuterJoin = false;
  let isList = false;
  let onField = "";
  let toField = "";
  let filterType = "show";
  let filterFields = [];
  let terms = [];
  let joins = [];
  
  return {
    parentId,
    id,
    collection,
    injectAt,
    isOuterJoin,
    isList,
    onField,
    toField,
    filterType,
    filterFields,
    terms,
    joins,
  }
}

export default QueryJoin;