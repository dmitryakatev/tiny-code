export function toTree(list, getId, getParentId) {
  const map = new Map();

  list.forEach((item) => {
    const id = getId(item);
    const parentId = getParentId(item);

    let node = map.get(id);
    if (node) {
      node.parentId = parentId;
      node.link = item;
    } else {
      node = {
        id,
        parentId,
        link: item,
        children: null,
      };

      map.set(id, node);
    } 

    let parent = map.get(node.parentId);
    if (parent) {
      if (parent.children === null) {
        parent.children = [node];
      } else {
        parent.children.push(node);
      }
    } else {
      // виртуальный родитель, т.к. настоящий еще не объявился,
      // он может быть идти ниже по спипску
      parent = {
        id: parentId,
        parentId: null,
        link: null,
        children: [node],
      };

      map.set(parentId, parent);
    }
  });

  let root = map.get(null);
  if (!root) {
    let node = map.get(getId(list[0]));
    
    do {
      root = node;
      node = map.get(root.parentId);
    } while (node);
  }

  return root.children[0];
};

// сначала вызывается fn узла, а потом его потомков
export function cascade(node, fn) {
  if (fn(node) === false) {
    return;
  }

  if (node.children) {
    node.children.forEach((child) => {
      cascade(child, fn);
    });
  }
};

  // сначала вызывается fn потомков, а потом узла
export function backCascade(node, fn) {
  if (node.children) {
    node.children.forEach((child) => {
      backCascade(child, fn);
    });
  }

  fn(node);
}
