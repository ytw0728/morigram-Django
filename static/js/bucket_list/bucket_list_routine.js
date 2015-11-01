window.onload = function(){
	headerlogo_align();
	make();

	window.onresize = function(){set_page_layout();};
	submit_section.addEventListener("click",add_list);
	//scroll.addEventListener("scroll", require_list); //인피니티 스크롤링
}
