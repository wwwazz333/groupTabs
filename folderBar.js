const uniqueID = "a1Rkn^WqQamEISbc*3bI*9GXKq7rclBH9OoX^NQ1#oZZOT#kDKUvHmRpP*ZSIj^nZq2Ahg!@jEE79t7Kg$7%Q6ws4TqSCL&%jpv8!^co@ArA*#E8l29&01Hozsko7uUk"

function switchTo(tabId) {

}

// document.body.style.marginTop = "100px"
if (!document.getElementById(uniqueID)) {
	document.body.style.marginTop = "25px"

	var nav = document.createElement("div")
	nav.id = uniqueID

	nav.style.position = "fixed"
	nav.style.top = "0"
	nav.style.left = "0"
	nav.style.background = "rgb(56, 62, 66)"
	nav.style.border = "1px solid black";
	nav.style.width = "100vw"
	nav.style.height = "25px"
	nav.style.zIndex = "9999999999"
	nav.style.color = "white"
	nav.style.fontSize = "12px"
	nav.style.display = "flex"
	nav.style.direction = "row"
	nav.style.alignItems = "center"
	nav.style.justifyContent = "start"


	// var p = document.createElement("p")
	// p.id = uniqueID + "P"
	// p.style.margin = "0"
	// p.style.padding = "0"
	// p.style.display = "inline"
	// p.textContent = "bad"
	// if (window.localStorage.getItem("1234")) {
	// 	p.textContent = "good"
	// }

	// nav.appendChild(p)


	// var toggleBtn = document.createElement("button")
	// toggleBtn.textContent = "Toggle"
	// toggleBtn.addEventListener("click", () => {
	// 	document.getElementById(uniqueID).style.display = "none"
	// })

	// nav.appendChild(toggleBtn)

	document.body.insertBefore(nav, document.body.firstChild);
}


console.log("test Log");
browser.runtime.onMessage.addListener(request => {
	//remove se qu'il y a avant
	var nav = document.getElementById(uniqueID)
	var childs = nav.childNodes;
	while (childs.length > 0) {//la taille diminue qd on del
		childs[0].remove();
	}




	var data = request.greeting
	data = JSON.parse(data)

	for (let key in data) {
		console.log(key);
		var elem = document.createElement("button")
		elem.addEventListener("click", (ev) => {
			console.log("doit envoyer le msg à l'extension pour qu'elle redirige car la page ne peu pas le faire");

			browser.runtime.sendMessage({ "msg": "je click sur un folder", "folderName": key });

		})
		elem.style.textDecoration = "none"
		elem.style.color = "white"
		elem.textContent = key
		elem.style.background = "rgb(30, 30, 30)"
		elem.style.margin = "0 4px"
		elem.style.padding = "3px"
		elem.style.borderRadius = "8px"

		nav.appendChild(elem)
	}

	return Promise.resolve({ response: "Info sur la barFolder bien reçu" })
});




// var folders = {}
// folders["Yt"] = "youtube.com"
// folders["google"] = "google.com"
// console.log(folders);
// for (const key in folders) {
// 	var fold = document.createElement("a")
// 	fold.href = folders[key]
// 	// fold.textContent = key
// 	fold.innerHTML = key
// 	document.getElementById(uniqueID).appendChild(fold)
// }

