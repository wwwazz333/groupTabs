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

			// browser.browserAction.setBadgeText({ text: length.toString() });
			browser.browserAction.setBadgeBackgroundColor({ 'color': 'green' });
			
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


browser.tabs.onUpdated.addListener(updateFolderBar)
browser.tabs.onActivated.addListener(updateFolderBar)
browser.tabs.onUpdated.addListener(updateFolderBar)



browser.runtime.onMessage.addListener((msg) => {
	console.log("Folder cliqué : " + msg.folderName);
	var folder = Folder.getFolderOfName(msg.folderName)
	if (folder.tabList.length == 0) {

	} else {
		switchTo(folder.tabList[0].id)
	}

	showAndHideTab(folder)
	Folder.saveFolders()
});
