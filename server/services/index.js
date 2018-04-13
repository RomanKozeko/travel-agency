const sliceModelContentSingle = (item, langID) => {
  const newItem = item.toObject();
  if (langID) {
    newItem.content = newItem.content.find(itemContent => itemContent.language === langID);
  }
  return newItem;
};

const sliceModelContent = (items, langID) => {
  return items.map(item => sliceModelContentSingle(item, langID));
};

module.exports = {
	sliceModelContentSingle,
	sliceModelContent
};
