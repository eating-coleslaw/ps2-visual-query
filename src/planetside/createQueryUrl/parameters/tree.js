// The dbgcensus package doesn't process trees correctly, so we do it manually
export default function toString(tree) {
  const treeField = tree.treeField || tree.startField;

  if (!!treeField) {
    let treeViewString = `&c:tree=field:${treeField}`;

    treeViewString = `${treeViewString}^isList:${tree.isList}`;

    if (!!tree.groupPrefix) {
      treeViewString = `${treeViewString}^prefix:${tree.groupPrefix}`;
    }

    if (!!tree.startField) {
      treeViewString = `${treeViewString}^start:${tree.startField}`;
    }

    return treeViewString;
  }

  return "";
}
