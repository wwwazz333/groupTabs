import { Folder, folderList } from './folder.js';
import { getCurrentWindowTabs } from './tabs.js';
import { updateFolderBar } from "./com.js"


function updateTabList() {
	getCurrentWindowTabs().then((tabs) => {
		let tabsList = document.getElementById('tabs-list');
		let currentTabs = document.createDocumentFragment();

		tabsList.textContent = '';
		Folder.loadFolders(tabs)


		for (let tab of tabs) {
			if (!Folder.anyTabContains(tab, folderList)) {
				folderList[0].addTab(tab);
			}
		}
		for (let folder of folderList) {

			var folderElement = folder.createFolderElement()
			currentTabs.appendChild(folderElement)
			if (folder.unroll) {
				folder.unrollChilds(folderElement)
			}
		}

		tabsList.appendChild(currentTabs);
		showAndHideTabBis()
		updateFolderBar()
	});
}

function showAndHideTabBis() {
	for (let folder of folderList) {
		if (folder.unroll) {
			folder.showTabs()
			console.log("showning : " + folder.name);
		}
		else {
			folder.hideTabs()
			console.log("hiding : " + folder.name);
		}
	}
}


function showAndHideTab(folderSelected) {
	for (let folder of folderList) {
		if (folder.id != folderSelected.id) {
			folder.hideTabs()
		}
		else {
			folder.showTabs()
		}
	}
}




export { updateTabList, showAndHideTab }