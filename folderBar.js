const uniqueID = "a1Rkn^WqQamEISbc*3bI*9GXKq7rclBH9OoX^NQ1#oZZOT#kDKUvHmRpP*ZSIj^nZq2Ahg!@jEE79t7Kg$7%Q6ws4TqSCL&%jpv8!^co@ArA*#E8l29&01Hozsko7uUk"
const uniqueIDBtn = "btna1Rkn^WqQamEISbc*3bI*9GXKq7rclBH9OoX^NQ1#oZZOT#kDKUvHmRpP*ZSIj^nZq2Ahg!@jEE79t7Kg$7%Q6ws4TqSCL&%jpv8!^co@ArA*#E8l29&01Hozsko7uUk"

function switchTo(tabId) {

}
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
	nav.style.zIndex = "9999999998"
	nav.style.color = "white"
	nav.style.fontSize = "12px"
	nav.style.display = "flex"
	nav.style.direction = "row"
	nav.style.alignItems = "center"
	nav.style.justifyContent = "start"
	nav.style.fontFamily = "Georgia, serif;arial;"






	var toggleBtn = document.createElement("button")
	toggleBtn.textContent = "Toggle"
	toggleBtn.id = uniqueIDBtn
	toggleBtn.style.position = "fixed"
	toggleBtn.style.top = "5px"
	toggleBtn.style.right = "5px"
	toggleBtn.style.zIndex = "9999999999"
	toggleBtn.style.display = "inline-block"
	toggleBtn.style.margin = "0"
	toggleBtn.style.padding = "0"
	toggleBtn.style.borderRadius = "50%"
	toggleBtn.style.width = "30px"
	toggleBtn.style.height = "30px"
	toggleBtn.style.border = "none"
	toggleBtn.style.background = "rgb(90, 96, 100)"
	toggleBtn.innerHTML = "&#128447;"
	toggleBtn.addEventListener("click", () => {
		console.log("click");
		if (document.getElementById(uniqueID).style.display == "none")
			document.getElementById(uniqueID).style.display = "block"
		else
			document.getElementById(uniqueID).style.display = "none"
	})

	document.body.insertBefore(toggleBtn, document.body.firstChild);
	document.body.insertBefore(nav, document.body.firstChild);

	var allElem = document.querySelectorAll("*");
	allElem.forEach((item) => {
		if(item.style.position == "fixed" && item.id != uniqueID && item.id != uniqueIDBtn){
			if(item.style.top && item.style.top.includes("px")){
				let num = item.style.top.substring(0, item.style.top.length-2)
				let pos = parseInt(num)
				if(!isNaN(pos)){
					if(pos < 25){
						item.style.top = "25px"
					}
				}
			}else{
				item.style.top = "25px"
			}
		}
	});
}

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
		var elem = document.createElement("button")
		elem.addEventListener("click", (ev) => {
			browser.runtime.sendMessage({ "msg": "je click sur un folder", "folderName": key });

		})
		elem.style.textDecoration = "none"
		elem.style.color = "white"
		elem.textContent = key
		if (data[key])
			elem.style.background = "rgb(30, 30, 129)"
		else
			elem.style.background = "rgb(30, 30, 30)"
		elem.style.margin = "0 4px"
		elem.style.padding = "3px"
		elem.style.maxHeight = "22px"
		elem.style.borderRadius = "8px"
		elem.style.border = "none"
		elem.style.fontFamily = "Georgia, serif;arial;"
		elem.style.fontSize = "12px"

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

