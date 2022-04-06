import { Folder, folderList } from './folder.js';
import { getCurrentWindowTabs } from './tabs.js';


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
			// if (folder.name == "default") {
			// 	folder.unrollChilds(currentTabs)
			// } else {
				var folderElement = folder.createFolderElement()
				currentTabs.appendChild(folderElement)
				if (folder.unroll) {
					folder.unrollChilds(folderElement)
				}
			// }
		}

		tabsList.appendChild(currentTabs);
		showAndHideTabBis()
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
			console.log("hide")
			folder.hideTabs()
		}
		else {
			console.log("show")
			folder.showTabs()
		}
	}
}


export { updateTabList }