
function make(){

	document.styleSheets[0].addRule('#modal img', 'max-width : '+ window.innerWidth / 10 * 8 + "px");
	document.styleSheets[0].addRule('#modal img', 'max-height : '+ window.innerHeight / 10 * 8 + "px");

	make_ingre(); // 요소생성

	homelink.style.lineHeight = homelink.offsetHeight + "px";


	ajax_get_file(); // 폴더 생성 후 요소 생성

	set_page_layout();
}

var wrap;
var nav;
var navlogo;
var homelink;
var mainmenus;

var main;
var posts;
var menus;

var scroll;

var route;

var albums;
var list;
var add_file;
var folder
var files;
var file;
var file_imgs;
var caption;

var footer;

var modal;

function make_ingre(){
	wrap = document.getElementsByTagName("wrap")[0];
	nav = document.getElementsByTagName("nav")[0];
	navlogo = document.getElementsByClassName("navlogo")[0];
	homelink = document.getElementsByClassName("homelink")[0];
	mainmenus = document.getElementsByClassName("mainmenus");

	main = document.getElementById("main");
	posts = document.getElementById("posts");
	menus = document.getElementsByClassName("menus")[0];

	scroll = document.getElementsByClassName("scroll")[0];
	route = document.getElementsByClassName("route")[0];

	albums = document.getElementsByClassName("albums")[0];
	list = document.getElementsByClassName("list");
	add_file = document.getElementsByClassName('add_file')[0];
	folder = document.getElementsByClassName("folder");
	files = document.getElementsByClassName("files");
	file = document.getElementsByClassName("file");
	file_imgs = document.getElementsByClassName('file_imgs');
	caption = document.getElementsByClassName('caption');

	footer = document.getElementsByTagName("footer")[0];

	modal = document.getElementById("modal");
	
	set_page_layout();
}

function set_page_layout(){

	posts.style.height = main.offsetHeight - nav.offsetHeight + "px";
	menus.style.lineHeight = menus.offsetHeight + "px";
	scroll.style.height = posts.offsetHeight - menus.offsetHeight - footer.offsetHeight + "px";

	for(var i = 0 ; i < list.length; i++){
		list[i].style.height = list[i].offsetWidth + "px";
	}
	add_file.style.lineHeight = add_file.offsetHeight + "px";
	for(var i = 0 ; i < file_imgs.length; i++){
		file_imgs[i].style.height = list[i].offsetHeight - (caption[i].offsetHeight * 2) + "px";
		file_imgs[i].style.width = file_imgs[i].offsetHeight + "px";
	}
	if(check_modal_view){
		modal_layout();
	}

}

var file_len;
function get_file(file_array_temp){

	var temp = JSON.parse(file_array_temp)[0];
	var out = "";
	if( temp.memo != undefined){
		out +="\
			<div class = 'memo'>\
				<span class = 'text'>\" "+temp.memo+" \"</span>\
			</div>\
		";
	}
	if( temp.parent_folder == undefined){
			out += "\
				<div class = 'add_file list'>\
					<img src = '/static/images/dongle.png' class = 'add_img' onclick = 'add_file_method()'/>\
				</div>\
			";
	}
	else{
		out += "\
				<div class = 'to_parents list folder'>\
					<img src = '/static/images/parents_folder.jpg' class = 'file_imgs parents_img' />\
					<span class = 'caption' >..</span>\
					<input type = 'button' value = '" + temp.parent_folder + "' id = 'code'/>\
				</div>\
		";
		out += "\
			<div class = 'add_file list'>\
				<img src = '/static/images/dongle.png' class = 'add_img' onclick = 'add_file_method()'/>\
			</div>\
		";
	}
	for( var i in temp.folders ){
		out += "\
					<div class = 'list files folder'>\
						<img class = 'file_imgs' src = '/static/images/folder.png' alt = '"+temp.folders[i].title+" 폴더 입니다'/>\
						<span class = 'caption'>"+ temp.folders[i].title + "</span>\
						<input type = 'button' value = '"+temp.folders[i].path+"' id = 'code'/>\
					</div>\
				";
	}

	for( var i in temp.files){
		out += "\
				<div class = 'list files file'>\
					<img id = 'pics' class = 'file_imgs' src = 'http://layer7.kr:1234"+temp.files[i].path+"' alt = '"+temp.files[i].name+" 이미지파일' />\
					<span class = 'caption'> "+temp.files[i].name+"</span>\
					<input type = 'button' value = '"+temp.files[i].path+"' id = 'code'/>\
				</div>\
			";

	}
	route.innerHTML = "앨범모아보기" + now_path;
	albums.innerHTML = out;
	make_ingre(); // 요소생성
	set_event();
}


function set_event(){
	for(var i = 0 ; i < folder.length; i++){
		folder[i].addEventListener("click", link);
	}
	for(var i = 0 ; i < file.length; i++){
		file[i].addEventListener("click",show_modal_img);

	}
}

var check_modal_view = 0;
function add_file_method(){
	modal.removeEventListener("click", unshow_modal_img);
	var form_temp = document.createElement("form");
	form_temp.className = "modal_form";
	form_temp.method = "POST";
	form_temp.enctype = "multipart/form-data";
	form_temp.id = "modal_form";
	var out = "";
	out += "<span class = 'modal_caption'>[ 형식 ]</span>";
	out += "<input id = 'modal_folder' class = 'modal_input' type = 'radio' name = 'which_type' value = 'folder'/> 폴더";
	out += "<input id = 'modal_file' class = 'modal_input' type = 'radio' name = 'which_type' value = 'file' /> 사진";
	out += "<br/>";
	out += "<span class = 'modal_caption modal_name'>[ 폴더명 ]</span>";
	out += "<input id = 'folder_name' class = 'modal_name' type = 'text' name = 'title'/>";
	out += "<br/>";
	out += "<span class = 'modal_caption modal_img'>[ 이미지 파일 ]</span>";
	out += "<input id = 'file_name' class = 'modal_img' type = 'file' name = 'img' />"; 
	out += "<span class = 'modal_caption modal_memo'>[ 짧은 이야기 ]</span>"
	out += "<input class = 'modal_memo' type = 'text' name = 'memo'/>";
	out += "<br/>";
	//out += "<input type = 'button' name = 'now_path' value = '"+now_code+"' style = 'display:none'/>";
	out += "<div class = 'modal_submit_box'>";
	out += "<input class = 'modal_submit' type = 'button' onclick = 'modal_check()'/> ";
	out += "</div>"

	form_temp.innerHTML = out
	
	var temp = document.createElement("div");
	temp.appendChild(form_temp)

	modal.innerHTML = temp.innerHTML;
	modal.style.display = "flex";
	add_file_modal_layout();
	modal.style.zIndex = "100";
	wrap.style.animation = "blur_wrap .5s ease";
	wrap.style.opacity = "0.4";
	wrap.addEventListener("click", unshow_modal_img,true);
	check_modal_view =1;

	add_file_modal_layout();
}

function modal_check(){
	var modal_form = document.getElementsByClassName("modal_form")[0];
	var modal_name = document.getElementsByClassName("modal_name")[1];
	var modal_folder = document.getElementById("modal_folder");
	var modal_file = document.getElementById("modal_file");
	var modal_img = document.getElementsByClassName("modal_img")[1];

	if(modal_folder.checked){
		if( modal_name.value == ""){
			alert("파일명을 입력해주세요!\n\n");
		}
		else{
			if(confirm("정말 추가하시겠어요?\n\n")){
				var out = "/api/album/" + now_path + document.getElementById("folder_name").value + "/";
				document.getElementById("modal_form").action = out;

				modal_form.submit();
			}
		}
	}
	else if(modal_file.checked){
		if(modal_img.value == ""){
			alert("이미지 파일을 선택해주세요!\n\n")
		}
		else if (/(\.jpg|\.bmp|\.png|\.gif|\.jpeg)$/i.test(modal_img.value)) {
			if( confirm("정말 추가하시겠어요?\n\n") ){
				var out = "/api/album/" + now_path;
				document.getElementById("modal_form").action = out;
				modal_form.submit();
			}
		}
		else{
			alert("가능한 이미지 확장자가 아닙니다. \n \( .jpg , .bmp , .png , .gif , .jpeg 이 가능합니다.\)\n\n");
		}
	}
}


function add_file_modal_layout(){
	modal.style.background = "white";
	modal.style.width = "50%";
	modal.style.height= "50%";
	modal.style.top = ( document.body.offsetHeight - modal.offsetHeight ) /2 +"px";
	modal.style.left = ( document.body.offsetWidth - modal.offsetWidth ) /2 + "px"; 
};


function show_modal_img(){

	var temp = this.children.item(0).src;

	modal.innerHTML = "<img id = 'modal_image' src = '"+temp+"' alt = '이미지 크게보기'/>";
	modal.style.display = "flex"
	modal_layout();
	modal.style.zIndex = "100";
	wrap.style.animation = "blur_wrap .5s ease ";
	wrap.style.opacity = "0.4";
	wrap.addEventListener("click", unshow_modal_img,true);
	check_modal_view =1;
	modal_layout();
}

function modal_layout(){
	document.getElementById("modal_image").style.width = "auto";
	document.getElementById("modal_image").style.height = "auto";
		
	if(document.getElementById("modal_image").offsetWidth >= document.getElementById("modal_image").offsetHeight){
		modal.style.width = document.getElementById("modal_image").offsetWidth + 10+"px";;
		modal.style.height = modal.offsetWidth + "px";
	}
	else{
		modal.style.height = document.getElementById("modal_image").offsetHeight + 10+"px";
		modal.style.width = modal.offsetHeight + "px";
	}
	modal.style.top = ( document.body.offsetHeight - modal.offsetHeight ) /2 +"px";
	modal.style.left = ( document.body.offsetWidth - modal.offsetWidth ) /2 + "px"; 

}

function unshow_modal_img(){
	check_modal_view = 0;

	modal.style.background = "black";
	modal.addEventListener("click", unshow_modal_img);
	modal.style.display = "none";
	wrap.style.animation = "unblur_wrap .5s ease";
	wrap.style.opacity = "1";
	modal.style.zIndex = "-1";
}


function logout_method(){
	var form_temp = document.createElement("form");
	form_temp.action = "/logout/";
	form_temp.method = "POST";

	if(confirm("정말 로그아웃 하시겠습니까? \n\n ")){
		form_temp.submit();
	}
}