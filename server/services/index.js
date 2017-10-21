module.exports = {
	sliceModelContentSingle(item, langID) {
		const newItem = item.toObject();
		if (langID) {
			newItem.content = newItem.content.find(itemContent => itemContent.language === langID);
		}
		return newItem;
	},
	sliceModelContent(items, langID) {
		if (langID) {
			return items.map(item => {
				const newItem = item.toObject();
				newItem.content = newItem.content.find(itemContent => itemContent.language === langID);
				return newItem;
			});
		}
		return items;
	}
};
