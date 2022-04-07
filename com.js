import { getActiveTabs, getCurrentWindowTabs } from "./tabs.js"
import { Folder, folderList } from "./folder.js"


function sendMessageToTabs(msg, rep) {
	getActiveTabs().then((tabs) => {
		for (let tab of tabs) {
			
			browser.tabs.sendMessage(
				tab.id,
				{ greeting: msg }
			).then(rep).catch((error) => { console.log(`msg couldn't be send to ${tab.title}`) });
		}
	})
}
function updateFolderBar() {
	getCurrentWindowTabs().then((tabs) => {
		Folder.loadFolders(tabs)
		var data = {}
		for (let folder of folderList) {
			if(folder.tabList.length > 0)
				data[folder.name] = folder.tabList[0].id
			else
				data[folder.name] = -1
		}

		data = JSON.stringify(data)
		sendMessageToTabs(data, rep => { console.log(rep.response); })
	})
}

export { sendMessageToTabs, updateFolderBar }