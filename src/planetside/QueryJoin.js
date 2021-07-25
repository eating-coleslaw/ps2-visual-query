import { v4 as uuidv4 } from "uuid";

const QueryJoin = (parentJoinId = null) => {
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
  };
};

export default QueryJoin;
