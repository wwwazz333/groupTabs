import { getCurrentWindowTabs } from './tabs.js';
import { Folder, folderList } from './folder.js';
import { updateFolderBar } from './com.js';
import { switchTo } from "./tabs.js"
import { showAndHideTab } from "./panel.js"


function updateCount(tabId, isOnRemoved) {
	getCurrentWindowTabs()
		.then((tabs) => {
			let length = tabs.length;

			// onRemoved fires too early and the count is one too many.
			// see https://bugzilla.mozilla.org/show_bug.cgi?id=1396758
			if (isOnRemoved && tabId && tabs.map((t) => { return t.id; }).includes(tabId)) {
				length--;
			}

			browser.browserAction.setBadgeText({ text: length.toString() });
			if (length > 2) {
				browser.browserAction.setBadgeBackgroundColor({ 'color': 'green' });
			} else {
				browser.browserAction.setBadgeBackgroundColor({ 'color': 'red' });
			}
		});
}


browser.tabs.onRemoved.addListener(
	(tabId) => {
		updateCount(tabId, true);
	});
browser.tabs.onCreated.addListener(
	(tabId) => {
		updateCount(tabId, false);
	});
updateCount();

/*####################################UPDATE FOLDERBAR####################################*/

function onCreated() {
	if (browser.runtime.lastError) {
		console.log(`Error: ${browser.runtime.lastError}`);
	} else {
		console.log("Item created successfully");
	}
}



browser.tabs.onUpdated.addListener(updateFolderBar)
browser.tabs.onActivated.addListener(updateFolderBar)
browser.tabs.onUpdated.addListener(updateFolderBar)



browser.runtime.onMessage.addListener((msg) => {
	console.log("Folder cliqué : " + msg.folderName);
	var folder = Folder.getFolderOfName(msg.folderName)
	switchTo(folder.tabList[0].id)
	showAndHideTab(folder)
	Folder.saveFolders()



});
