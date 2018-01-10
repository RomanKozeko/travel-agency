export const populateTree = (entities) => {

  const _parents = [];

  entities.forEach(item => {
    // первый родитель
    if (!item.parent) {
      _parents.push({...item})
    }

  });

  return populateChildrens(entities, _parents)

};

function populateChildrens(entities, _parents) {
  _parents.forEach(parent => {

    entities.forEach(item => {

      //if (item.ancestors[item.ancestors.length - 1] === parent._id) {
      if (item.parent === parent._id) {
        if (!parent.hasOwnProperty('childrens')) {
          parent.childrens = []
        }
        parent.childrens.push({...item});
      }

    });

    if (parent.childrens) {
      populateChildrens(entities, parent.childrens)
    }

  });

  return _parents
}