function getCurrentWindowTabs() {
	return browser.tabs.query({ currentWindow: true })
}

function createTab(tab) {
	var element = document.createElement('a');

	element.textContent = tab.title;
	element.setAttribute('href', tab.id);

	element.classList.add('switch-tabs');


	return element;
}

function tabExistIn(tabIdSearched, tabs) {
	for (let tab of tabs) {
		if (tabIdSearched == tab.id) {
			return true;
		}
	}
	return false;

}
function tabExist(tabSearched, data, callback) {
	getCurrentWindowTabs().then((tabs) => {
		for (let tab of tabs) {
			if (tabSearched.id == tab.id) {
				callback(true, data);
				return;
			}
		}
		callback(false, data);
		return;
	})
}

function getIdOfURL(url, callback) {
	getCurrentWindowTabs().then((tabs) => {
		var idTab = null
		for (var tab of tabs) {
			if (tab.url == url) {
				idTab = tab.id
				break;
			}
		}
		callback(idTab);
	});
}

function getTabOfId(id, callback) {//si trouve pas appel pas callback
	getCurrentWindowTabs().then((tabs) => {
		for (var tab of tabs) {
			if (tab.id == id) {
				callback(tab);
				break;
			}
		}

	});
}

function switchTo(tabId) {
	browser.tabs.update(tabId, { active: true })
}

export { getCurrentWindowTabs, createTab, tabExistIn, getTabOfId, switchTo }