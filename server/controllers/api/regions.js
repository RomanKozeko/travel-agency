const Region = require('../../models/Region');

const findLastChildren = (allRegions) => {
  const lastChildren = {};
  const regionsLength = allRegions.length;
  allRegions.forEach(region => {
    let regionHasChildren = false;

    for(let i = 0; i < regionsLength; i++ ) {
      if (allRegions[i].parent === region._id.toString()) {
        regionHasChildren = true;
        break;
      }
    }

    if (!regionHasChildren) {
      let prop = region.parent || 'noParent';
      if (lastChildren.hasOwnProperty(prop)) {
        lastChildren[prop].push(region);
      } else {
        lastChildren[prop] = [region]
      }
    }

  });

  return lastChildren;
};

const getItemById = (items,id) => items.find(item => item._id.toString() === id);

const setUpAncestors = (reg, lastChildren) => {
  const regions = reg.slice();
  Object.keys(lastChildren).forEach(item => {
    lastChildren[item].forEach(region => {
      const ancestors = [];
      let parentId = region.parent;

      while(parentId) {
        ancestors.push(parentId);
        const parentItem = getItemById(regions, parentId);
        parentId = parentItem.parent;
      }

      region.ancestors = ancestors;

      ancestors.forEach(ancestor => {
        regions.forEach((region, i) => {
          if (region._id.toString() === ancestor) {
            region.ancestors = ancestors.slice(i + 1);
          }
        });
      })

    })
  });

  return regions;
};

const saveRegionsTree = (updatedRegions) => {
  const savedRegions = [];
  updatedRegions.forEach(updatedRegion => {
    savedRegions.push(Region.findByIdAndUpdate(updatedRegion._id.toString(), updatedRegion))
  });

  return Promise.all(savedRegions)
};

const rebuildRegionsTree = (items) => {
  const regions = items.map(item => item.toObject());
  const lastChildren = findLastChildren(regions);
  const updatedRegions = setUpAncestors(regions, lastChildren);

  return saveRegionsTree(updatedRegions);
};

module.exports = {
  get(req, res, next) {
    Region.find().then((result) => {
      res.json(result);
    })
    .catch(next);
  },

  getOne(req, res, next) {
    Region.findById(req.params.id)
      .then(item => res.json(item))
      .catch(next);
  },

  post(req, res, next) {
    const region = new Region(req.body);
    region.save()
      .then((result) => {
        res.json(result);
      })
      .catch(next);
  },

  put(req, res, next) {
    const regionId = req.params.id;
    const regionProps = req.body;

    async function updateRegion(regionId, regionProps) {
      await Region.findByIdAndUpdate(regionId, regionProps);
      return Region.find();
    }

    updateRegion(regionId, regionProps)
      .then(result => rebuildRegionsTree(result))
      .then(result => Region.findById(regionId))
      .then(region => res.json(region))
      .catch(next);
  },

  delete(req, res, next) {
    const ids = req.body;

    Region.deleteMany({ _id: ids })
      .then(() => res.json(ids))
      .catch(next);
  }
};
