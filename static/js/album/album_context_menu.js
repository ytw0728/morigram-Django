var mozilla=document.getElementById && !document.all
var ie=document.all
var contextisvisible=0

function iebody(){
	return (document.compatMode && document.compatMode!="BackCompat")? document.documentElement : document.body
}

function displaymenu(e){
	el=document.getElementById("context_menu")
	contextisvisible=1
	if (mozilla){
		el.style.left=pageXOffset+e.clientX+"px"
		el.style.top=pageYOffset+e.clientY+"px"
		el.style.visibility="visible"
		e.preventDefault()
		return false
	}
	else if (ie){
		el.style.left=iebody().scrollLeft+event.clientX
		el.style.top=iebody().scrollTop+event.clientY
		el.style.visibility="visible"
		return false
	}
}

function hidemenu(){
	if (typeof el!="undefined" && contextisvisible){
		el.style.visibility="hidden"
		contextisvisible=0
	}
}
	if (mozilla){
		document.addEventListener("contextmenu", displaymenu, true)
		document.addEventListener("click", hidemenu, true)
	}
	else if (ie){
		document.attachEvent("oncontextmenu", displaymenu)
		document.attachEvent("onclick", hidemenu)
	}
