function getCurrentWindowTabs() {
	return browser.tabs.query({ currentWindow: true })
}

function createTabElement(tab) {
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


function switchTo(tabId) {
	browser.tabs.update(tabId, { active: true })
}

export { getCurrentWindowTabs, createTabElement, tabExistIn, switchTo }