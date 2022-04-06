import { Folder, folderList } from './folder.js';
import { getCurrentWindowTabs, switchTo } from './tabs.js';

import { updateTabList } from "./panel.js"


document.addEventListener("DOMContentLoaded", updateTabList)



document.getElementById('resetBtn').addEventListener('click', () => {
	for (let folder of folderList) {
		folder.unrollChilds(document.getElementById(folder.name))
	}
	updateTabList()
})
document.getElementById('infoBtn').addEventListener('click', () => {
	for (let folder of folderList) {
		console.log(folder.name + " a " + folder.tabList.length);
		for (let tab of folder.tabList) {
			console.log("\t" + tab.title);
		}
	}
	console.log("Tout");
	getCurrentWindowTabs().then((tabs) => {
		for (let tab of tabs) {
			console.log("\t" + tab.title);
		}
	})
	updateTabList()
})


/*####################################ADD FOLDER####################################*/
function folderNameValide(folderName) {
	if (folderList == "" || Folder.getFolderOfName(folderName) != null) {
		return false
	}
	return true
}
function addFolder() {
	var folderName = document.getElementById("newFolderName").value
	folderName = folderName.trim()
	if (folderNameValide(folderName)) {
		var folder = new Folder("inconnue")
		folder.name = folderName
		folderList.push(folder)
		Folder.saveFolders()
		updateTabList()
	} else {
		alert("Le nom du dossier est invalide (nom interdit : un nom vide, un nom déjà existant et \"default\"")
	}

	document.getElementById("newFolderName").value = ""

}
// document.getElementById('addBtn').addEventListener('click', addFolder)
document.getElementById("newFolderName").addEventListener("keypress", (e) => { if (e.key == "Enter") { addFolder(); } })



/*####################################ROLL AND UNROLL & SWITCH TAB####################################*/
document.addEventListener("click", (active) => {
	if (active.target.classList.contains('switch-tabs')) {//switch tab
		var tabId = +active.target.getAttribute('href')
		switchTo(tabId)
		updateTabList()
	}

	else if (active.target.classList.contains('switch-tabs-fold')) {//roll & unroll
		var foldId = active.target.getAttribute('href')

		for (let folder of folderList) {
			if (folder.id == foldId) {
				if (!folder.unroll) {
					folder.unrollChilds(active.target)
					// folder.showTabs()
				} else {
					folder.rollChilds(active.target);
					// folder.hideTabs()
				}
			}
		}

		updateTabList()
	}


	active.preventDefault();
});



/*####################################DRAG IN FOLDER####################################*/
var targetDropingFolderName = null


function moveTabFromTo(tabId, src, dst) {
	src.moveTabTo(tabId, dst)
	Folder.saveFolders()
	updateTabList()
}

document.addEventListener("dragend", (active) => {
	if (active.target.classList.contains('switch-tabs') && targetDropingFolderName) {
		var dragedId = +active.target.getAttribute('href')

		var folderSrc = Folder.getFolderWithTab(dragedId)
		var folderDst = Folder.getFolderOfName(targetDropingFolderName)
		if (folderSrc && folderDst) {
			moveTabFromTo(dragedId, folderSrc, folderDst)
		}
	}
});
document.addEventListener("dragenter", (active) => {
	if (active.target.classList.contains('switch-tabs-fold')) {
		targetDropingFolderName = active.target.getAttribute('id')
		console.log(active.target.getAttribute('id'));
	} else {
		targetDropingFolderName = null
	}
});
