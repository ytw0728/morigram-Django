window.onload = function(){
	headerlogo_align();
	make();

	window.onresize = function(){set_page_layout();};
	
	modal.addEventListener("click", unshow_modal_img);
}
