import { tabExistIn, createTab } from './tabs.js';
import { updateTabList } from './panel.js';

var lastIdFolder = 0
var folderList = []

class Folder {
	constructor(name) {
		this.name = name
		this.tabList = new Array()
		this.id = lastIdFolder++
		this.unroll = false
	}

	addTab(tab) {
		this.tabList.push(tab);
	}

	contains(tabIdCompare) {
		for (let tab of this.tabList) {
			if (tabIdCompare == tab.id) {
				return true;
			}
		}
		return false;
	}
	/**
	 * @pre tab est dans this.tabList
	 * @param int tabId
	 * @param Folder dstFolder 
	 */
	moveTabTo(tabId, dstFolder) {
		var localTabIndice = 0
		while (tabId != this.tabList[localTabIndice].id) {
			localTabIndice++;
		}
		dstFolder.addTab(this.tabList[localTabIndice])
		this.remove(localTabIndice)
	}

	createFolderElement() {
		let conteneur = document.createElement("div")
		let folderElement = document.createElement('a');

		folderElement.textContent = this.name;
		folderElement.setAttribute('href', this.id);
		folderElement.setAttribute('id', this.name);
		folderElement.classList.add('switch-tabs-fold');


		//manage btn
		var renameBtn = document.createElement("button")
		renameBtn.textContent = "🖉"
		renameBtn.classList.add("renameBtn")
		renameBtn.addEventListener("click", () => {
			
		})

		folderElement.appendChild(renameBtn)

		var delBtn = document.createElement("button")
		delBtn.textContent = "Del"
		delBtn.classList.add("delBtn")
		delBtn.addEventListener("click", () => {
			Folder.removeFolderId(this.id)
			Folder.saveFolders()
			updateTabList()
		})

		folderElement.appendChild(delBtn)

		conteneur.appendChild(folderElement)

		return conteneur;
	}

	unrollChilds(folderElement) {
		for (let tab of this.tabList) {
			folderElement.appendChild(createTab(tab));//pour ajouter a folder un tab enfant que l'on créer
		}
		this.unroll = true;
		Folder.saveFolders()
	}
	rollChilds(folderElement) {
		var childs = folderElement.childNodes;
		while (childs.length > 1) {//le premier child est lui même, la taille diminue qd on del
			childs[1].remove();
		}
		this.unroll = false;
		Folder.saveFolders()
	}

	hideTabs() {
		for (var i = 0; i < this.tabList.length; i++) {
			browser.tabs.hide(this.tabList[i].id).then(() => { }, (err) => {
				this.remove(i);
			})
		}
	}
	showTabs() {
		for (var i = 0; i < this.tabList.length; i++) {
			browser.tabs.show(this.tabList[i].id).then(() => { }, (err) => {
				this.remove(i);
			})
		}
	}

	remove(indice) {
		console.log(this.tabList.length + " removing : " + this.tabList[indice].title);
		this.tabList.splice(indice, 1)
		console.log(this.tabList.length);
	}

	removeUnexistingTab(listWindowTabs) {
		var i = 0;
		while (i < this.tabList.length) {
			if (!tabExistIn(this.tabList[i].id, listWindowTabs)) {
				this.remove(i);
			} else {
				i++;
			}
		}
		Folder.saveFolders()
	}


	/*####################################STATIC FUNC####################################*/
	static anyTabContains(tabCompare, folderList) {
		for (let folder of folderList) {
			if (folder.contains(tabCompare.id)) {
				return true;
			}
		}
		return false;
	}

	static loadFolders(listWindowTabs) {
		folderList = JSON.parse(localStorage.getItem('folderList'))

		if (!folderList) {
			folderList = new Array();
			folderList.push(new Folder("default"))
			folderList[0].unrollChilds()
		} else {
			for (var i = 0; i < folderList.length; i++) {
				folderList[i] = Folder.fromJSON(folderList[i])
				folderList[i].removeUnexistingTab(listWindowTabs)
			}
		}

	}
	static saveFolders() {
		localStorage.setItem('folderList', JSON.stringify(folderList))
	}

	static fromJSON(data) {
		var folder = new Folder(data.name);
		folder.tabList = data.tabList
		folder.id = data.id
		folder.unroll = data.unroll

		return folder
	}

	static getFolderWithTab(tabId) {
		for (let folder of folderList) {
			if (folder.contains(tabId)) {
				return folder
			}
		}
		return null
	}

	static getFolderOfName(name) {
		for (let folder of folderList) {
			if (folder.name == name) {
				return folder
			}
		}
		return null
	}

	static removeFolderId(id) {
		for (var i = 0; i < folderList.length; i++) {
			if (id == folderList[i].id) {
				folderList.splice(i, 1)
			}
		}
	}
}



export { Folder, folderList }