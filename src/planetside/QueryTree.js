// const QueryTree = () => {
//   return {
//     treeField: "",
//     groupPrefix: "",
//     startField: "",
//     isList: false,
//   };
// };

const QueryTree = (
  treeField = "",
  groupPrefix = "",
  startField = "",
  isList = false
) => {
  return {
    treeField,
    groupPrefix,
    startField,
    isList,
  };
};

export default QueryTree;
