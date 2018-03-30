const Menu = require('../../models/Menu');
const createCRUD = require('../../services/apiFactory');

const updateMenu = (menuItems) => {
  const savedMenuItems = [];
  menuItems.forEach(item => {
    savedMenuItems.push(Menu.findByIdAndUpdate(item._id, item));
  });

  return Promise.all(savedMenuItems)
};

const updateParent = (parent, id) => {
  parent = parent.toObject();
  const index = parent.children.findIndex(childId => childId === id);
  parent.children.splice(index, 1);
  return parent;
};

const updateItemsOrder = items => {
  let updatedItems = items.map(item => item.toObject());
  const sorted = updatedItems.sort((a,b) => a.order - b.order);
  sorted.forEach((item, index) => item.order = index);
  return updateMenu(updatedItems);
};

module.exports = createCRUD(
  Menu,
  {
    put(req, res, next) {
      const menuItems = req.body;

      updateMenu(menuItems)
        .then(() => Menu.find({}))
        .then(result => res.json(result))
        .catch(next);

    },
    delete(req, res, next) {
      const id = req.body[0];

      Menu.find({ children: id })
        .then(items => deleteItem(items[0]))
        .then(() => Menu.find({}))
        .then(result => res.json({ items: result }))
        .catch(next);

      function deleteItem(parent) {
        const updateParentPromise = Menu.deleteMany({ _id: req.body })
          .then(() =>  parent ? Menu.findByIdAndUpdate(parent._id, updateParent(parent, id)) : null);

        const parameterObj = parent ? { parent: parent._id } : { parent: null };

        const updateItemsOrderPromise = Menu.find(parameterObj)
          .then((res) => updateItemsOrder(res));

        return Promise.all([ updateParentPromise, updateItemsOrderPromise])
      }

    }
  }
);
