
export function getTreeList(data) {
  var getChild = function (child) {
    if (child == null || child.length < 1) return null;
    let childList = [];
    for (const ite of child) {
      childList.push({
        id: ite.id,
        label: ite.name,
        children: getChild(ite.children)
      });
    }
    return childList;
  }

  let downList = [];
  data.forEach(e => {
    downList.push({
      id: e.id,
      label: e.name,
      children: getChild(e.children)
    });
  });

  return downList;
}


