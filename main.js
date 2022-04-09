import { Folder, folderList } from './folder.js';
import { getCurrentWindowTabs, switchTo } from './tabs.js';


import { updateTabList } from "./panel.js"
document.addEventListener("DOMContentLoaded", updateTabList)

/*####################################DEBUGING####################################*/
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
	// updateTabList()
})


/*####################################ADD FOLDER####################################*/

function addFolder() {
	var folderName = document.getElementById("newFolderName").value
	if (Folder.addFolder(folderName)) {
		Folder.saveFolders()
		updateTabList()
	} else {
		alert("Le nom du dossier est invalide (nom interdit : un nom vide, un nom déjà existant et \"default\"")
	}
	document.getElementById("newFolderName").value = ""
}
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
					folder.unrollChilds(active.target.parentNode)
				} else {
					folder.rollChilds(active.target.parentNode);
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
		targetDropingFolderName = active.target.parentNode.getAttribute('id')
	} else if (active.target.firstChild.classList === undefined) {//do nothing
	} else if (active.target.firstChild.classList.contains("switch-tabs-fold")) {
		targetDropingFolderName = active.target.getAttribute('id')
	} else {
		targetDropingFolderName = null
	}

});
