export const populateTree = (entities) => {
  const tree = entities
    .filter(item => !item.parent)
    .sort((a,b) => a.order - b.order);

    tree.forEach(parent => appendChildren(parent, entities));

  return tree;
};

const appendChildren = (parent, entities) => {
  if (parent.children.length) {
    parent.children.forEach((nodeChildrenId, i) => {
      const node = entities.find(item => item._id === nodeChildrenId);
      parent.children.splice(i, 1, {...node});

        if (node.children.length) {
          appendChildren(node, entities);
        }
    });
    parent.children.sort((a,b) => a.order - b.order);
  }
};

export const makeNodeAsRoot = (entities, nodeParameter) => {
  const node = {...entities[nodeParameter._id]};
  const parent = entities[node.parent];

  if (!parent) {
    return entities;
  }

  const index = parent.children.findIndex(id => id === node._id);
  if (index !== -1) {
    parent.children.splice(index, 1);
  }
  node.parent = null;

  return {
    ...entities,
    [node._id]: node
  }
};

export const updateEntitiesAsChild = (allEntities, nodeParameter) => {
  const entities = {...allEntities};
  if (Object.keys(entities).length === 1) {
    return entities;
  }
  let node = entities[nodeParameter._id];
  if (!node) {
    node = nodeParameter;
  }
  const parentNode = allEntities[node.parent];

  // do nothing as node is already child
  if (node.order === 0) {
    return entities;
  }

  let nodeToInsertId;
  if (parentNode) {
    //find new item parent
    nodeToInsertId = parentNode.children.find(itemId => allEntities[itemId].order === node.order - 1);
  }


  let nodeToInsert = entities[nodeToInsertId];

  if (!nodeToInsertId) {
    //
    const sortedSiblings = Object.values(entities)
    .filter(item => !item.parent)
    .sort((a,b) => a.order - b.order);
    nodeToInsert = sortedSiblings.find(item => allEntities[item._id].order === node.order - 1);
    nodeToInsertId = nodeToInsert._id;
  }


  if (nodeToInsert) {
    entities[node._id].order = nodeToInsert.children.length;

    const childrenToAddIndex = nodeToInsert.children.findIndex(id => id === node._id);
    if (childrenToAddIndex === -1) {
      nodeToInsert.children.push(node._id);
    }

  }

  if (parentNode) {
    //remove node id in parent children array
    const childrenIndexToRemove = parentNode.children.findIndex(id => id === node._id);
    if (childrenIndexToRemove !== -1) {
      parentNode.children.splice(childrenIndexToRemove, 1);
    }

    const sortedSiblings = parentNode.children
    .map(itemId => entities[itemId])
    .sort((a,b) => a.order - b.order);

    sortedSiblings.forEach((item, index) => entities[item._id].order = index);

  } else {
    const sortedSiblings = Object.values(entities)
    .filter(item => !item.parent)
    .sort((a,b) => a.order - b.order);

    const childrenToRemoveIndex = sortedSiblings.findIndex(item => item._id === node._id);
    if (childrenToRemoveIndex !== -1) {
      sortedSiblings.splice(childrenToRemoveIndex, 1);
    }

    sortedSiblings.forEach((item, index) => entities[item._id].order = index);
  }

  node.parent = nodeToInsertId;

  return { ...entities, [node._id]: node };
};

export const updateEntities = (allEntities, nodeParam, siblingParam, updateMethod) => {
  if (siblingParam && siblingParam._id === 'fake') {
    return { [nodeParam._id]: nodeParam };
  }

  if (updateMethod === 'child') {
    return updateEntitiesAsChild(allEntities, nodeParam, siblingParam);
  }

  if (updateMethod === 'root') {
    return makeNodeAsRoot(allEntities, nodeParam);
  }

  let entities = {...allEntities};
  if (!siblingParam) {
    return entities;
  }
  // get normalized nodes from entities
  let node = entities[nodeParam._id];
  if (!node) {
    entities = {...entities, [nodeParam._id]:nodeParam}
    node = nodeParam;
  }
  let sibling = entities[siblingParam._id];
  let nodeParent = entities[node.parent];
  let siblingParent = entities[sibling.parent];

  // remove node id from parent children
  if (nodeParent) {
    const childrenToRemoveIndex = nodeParent.children.findIndex(id => id === node._id);
    if (childrenToRemoveIndex !== -1) {
      nodeParent.children.splice(childrenToRemoveIndex, 1);
    }
  }

  //go through sibling parent children and update order for every item
  if (siblingParent) {
    const sortedSiblings = siblingParent.children
    .map(itemId => entities[itemId])
    .sort((a,b) => a.order - b.order);

    sortedSiblings.splice(+sibling.order + 1, 0, node);
    sortedSiblings.forEach((item, index) => entities[item._id].order = index);

    const childrenToAddIndex = siblingParent.children.findIndex(id => id === node._id);
    if (childrenToAddIndex === -1) {
      siblingParent.children.push(node._id);
    }

  } else {
    const sortedSiblings = Object.values(entities)
      .filter(item => !item.parent)
      .sort((a,b) => a.order - b.order);

    const childrenToRemoveIndex = sortedSiblings.findIndex(item => item._id === node._id);
    if (childrenToRemoveIndex !== -1) {
      sortedSiblings.splice(childrenToRemoveIndex, 1);
    }

    sortedSiblings.splice(+sibling.order + 1, 0, node);
    sortedSiblings.forEach((item, index) => entities[item._id].order = index);
  }

  //set new parent for node
  node.parent = sibling.parent;

  return {
    ...entities,
    [node._id]: node,
  };
};
