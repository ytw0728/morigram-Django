function headerlogo_align(){
	var head = document.getElementById("head");
	var headerlogo = document.getElementById("headerlogo");
	headerlogo.style.marginTop =( head.offsetHeight - headerlogo.offsetHeight ) / 2 + "px";
}
