const Menu = require('../../models/Menu');
const createCRUD = require('../../services/apiFactory');

const updateItems = menuItems => (
  waitForEach(menuItem => Menu.findByIdAndUpdate(menuItem._id, menuItem), menuItems)
);

const waitForEach = (processFunc, [ head, ...tail ]) =>
  !head ?
    Promise.resolve()
    : processFunc(head).then(waitForEach(processFunc, tail));

const updateParent = (parent, id) => {
  const index = parent.children.findIndex(childId => childId === id);
  parent.children.splice(index, 1);
  return parent;
};

const recalculateItemsOrder = items => (
  items
    .map(item => item.toObject())
    .sort((a,b) => a.order - b.order)
    .map((item, index) => ({ ...item, order: index }))
);

module.exports = createCRUD(
  Menu,
  {
    put(req, res, next) {
      const menuItems = req.body;

      updateItems(menuItems)
        .then(() => Menu.find({}))
        .then(result => res.json(result))
        .catch(next);

    },
    delete(req, res, next) {
      const id = req.body[0];

      Menu.find({ children: id })
        .then(items => deleteItem(items[0]))
        .then(() => Menu.find({}))
        .then(items => res.json({ items }))
        .catch(next);

      function deleteItem(parent) {
        const updateParentPromise = Menu.findByIdAndRemove(id)
          .then(() => parent ?
            Menu.findByIdAndUpdate(parent._id, updateParent(parent, id))
            :
            null
          );

        const parameterObj = parent ? { parent: parent._id } : { parent: null };

        const updateItemsPromise = Menu.find(parameterObj)
          .then(menuItems => updateItems(recalculateItemsOrder(menuItems)));

        return Promise.all([ updateParentPromise, updateItemsPromise ])
      }

    }
  }
);
