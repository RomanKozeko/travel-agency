const sliceModelContentSingle = (item, langID) => {
  const newItem = typeof item.toObject === 'function' ? item.toObject() : item;
  if (langID && newItem.content) {
    newItem.content = newItem.content.find(
      itemContent => itemContent.language === langID
    );
  }
  return newItem;
};

const sliceModelContent = (items, langID) =>
  items.map(item => sliceModelContentSingle(item, langID));

module.exports = {
  sliceModelContentSingle,
  sliceModelContent,
};
