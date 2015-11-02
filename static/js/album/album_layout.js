function make(){

	document.styleSheets[0].addRule('#modal img', 'max-width : '+ window.innerWidth / 10 * 8 + "px");
	document.styleSheets[0].addRule('#modal img', 'max-height : '+ window.innerHeight / 10 * 8 + "px");

	make_ingre(); // 요소생성

	homelink.style.lineHeight = homelink.offsetHeight + "px";
	mainmenu.style.lineHeight = mainmenu.offsetHeight + "px";
	for( var i = 0 ; i < mainmenus.length ; i++){
		mainmenus[i].style.lineHeight = mainmenus[i].offsetHeight + "px";
	}


	ajax_get_file(); // 폴더 생성 후 요소 생성

	set_page_layout();
}

var wrap;
var nav;
var navlogo;
var homelink;
var mainmenu;
var mainmenus;

var main;
var posts;
var menus;

var route;

var albums;
var list;
var add_file;
var folder
var files;
var file;
var file_imgs;
var caption;

var modal;

function make_ingre(){
	wrap = document.getElementsByTagName("wrap")[0];
	nav = document.getElementsByTagName("nav")[0];
	navlogo = document.getElementsByClassName("navlogo")[0];
	homelink = document.getElementsByClassName("homelink")[0];
	mainmenu = document.getElementsByClassName("mainmenu")[0];
	mainmenus = document.getElementsByClassName("mainmenus");

	main = document.getElementById("main");
	posts = document.getElementById("posts");
	menus = document.getElementsByClassName("menus")[0];

	route = document.getElementsByClassName("route")[0];

	albums = document.getElementsByClassName("albums")[0];
	list = document.getElementsByClassName("list");
	add_file = document.getElementsByClassName('add_file')[0];
	folder = document.getElementsByClassName("folder");
	files = document.getElementsByClassName("files");
	file = document.getElementsByClassName("file");
	file_imgs = document.getElementsByClassName('file_imgs');
	caption = document.getElementsByClassName('caption');

	modal = document.getElementById("modal");
	
	set_page_layout();
}

function set_page_layout(){

	posts.style.width = ( main.offsetWidth - nav.offsetWidth - 2 )+ "px";
	menus.style.lineHeight = menus.offsetHeight + "px";
	
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
var head_code = "";
function get_file(file_array_temp){

	var temp = JSON.parse(file_array_temp);
	var out = "";
	
	for ( var i in temp.text){
		out +="\
			<div class = 'memo'>\
				<span class = 'text'>\" "+temp.text[i].title+" \"</span>\
			</div>\
		";
	}
	if( temp.head != undefined){
		for( var i in temp.head ){
			head_code = temp.head[i].type;
			now_code = head_code;
			parents_code = head_code;

			if(code_array[0] == undefined){
				code_array[0] = head_code;
			}

			out += "\
				<div class = 'add_file list'>\
					<img src = '../images/dongle.png' class = 'add_img' onclick = 'add_file_method()'/>\
				</div>\
			";
		}
	}
	else{
		out += "\
				<div class = 'to_parents list folder'>\
					<img src = '../images/parents_folder.jpg' class = 'file_imgs parents_img' />\
					<span class = 'caption' >..</span>\
					<input type = 'button' value = '" + parents_code + "' id = 'code'/>\
					<input type = 'button' value = 'd' id = 'type'/>\
				</div>\
		";
		out += "\
			<div class = 'add_file list'>\
				<img src = '../images/dongle.png' class = 'add_img' onclick = 'add_file_method()'/>\
			</div>\
		";
	}
	for( var i in temp.folder ){
		out += "\
					<div class = 'list files folder'>\
						<img class = 'file_imgs' src = '../images/folder.png' alt = '"+temp.folder[i].caption+"입니다'/>\
						<span class = 'caption'>"+ temp.folder[i].caption + "</span>\
						<input type = 'button' value = '"+temp.folder[i].code+"' id = 'code'/>\
						<input type = 'button' value = 'd' id = 'type'/>\
					</div>\
				";
	}
	for( var i in temp.file){
		out += "\
				<div class = 'list files file'>\
					<img id = 'pics' class = 'file_imgs' src = '"+temp.file[i].img+"' alt = '"+temp.file[i].caption+" 이미지파일' />\
					<span class = 'caption'> "+temp.file[i].caption+"</span>\
					<input type = 'button' value = '"+temp.file[i].code+"' id = 'code'/>\
					<input type = 'button' value = 'f' id = 'type'/>\
				</div>\
			";
	}

	var code_temp = "";

	for(var i = 1 ; i <= code_index + 1 ; i++){
		if( code_array[i] == undefined){
			continue;
		}
		else code_temp += code_array[i] + " / " ;
	}
	if( head_code == now_code){
		code_temp = "";
	}
	
	route.innerHTML = "앨범모아보기 / " + code_temp;

/*
	if(temp[0].type == "r"){
		head_code = temp[0].head;
		now_code = head_code;
		parents_code = head_code;

		if(code_array[0] == undefined){
			code_array[0] = head_code;
		}

		out += "\
			<div class = 'add_file list'>\
				<img src = '../images/dongle.png' class = 'add_img' onclick = 'add_file_method()'/>\
			</div>\
		";
		for( var i = 1; i < temp.length ; i++){
			if( temp[i].type == "t"){
				continue;
			}
			else if( temp[i].type == "d"){
				out += "\
					<div class = 'list files folder'>\
						<img class = 'file_imgs' src = '../images/folder.png' alt = '"+temp[i].caption+"입니다'/>\
						<span class = 'caption'>"+ temp[i].caption + "</span>\
						<input type = 'button' value = '"+temp[i].code+"' id = 'code'/>\
						<input type = 'button' value = 'd' id = 'type'/>\
					</div>\
				";
			}
			else if( temp[i].type == "f"){
				out += "\
					<div class = 'list files file'>\
						<img id = 'pics' class = 'file_imgs' src = '"+temp[i].img+"' alt = '"+temp[i].caption+" 이미지파일' />\
						<span class = 'caption'> "+temp[i].caption+"</span>\
						<input type = 'button' value = '"+temp[i].code+"' id = 'code'/>\
						<input type = 'button' value = 'f' id = 'type'/>\
					</div>\
				";
			}
		}
	}
	else{
		for( var i = 0 ; i < temp.length ; i++){
			if( temp[i].type =="t"){
				out +="\
					<div class = 'memo'>\
						<span class = 'text'>\" "+temp[i].title+" \"</span>\
					</div>\
				";
			}
		}
		out += "\
				<div class = 'to_parents list folder'>\
					<img src = '../images/parents_folder.jpg' class = 'file_imgs parents_img' />\
					<span class = 'caption' >..</span>\
					<input type = 'button' value = '" + parents_code + "' id = 'code'/>\
					<input type = 'button' value = 'd' id = 'type'/>\
				</div>\
		";
		out += "\
			<div class = 'add_file list'>\
				<img src = '../images/dongle.png' class = 'add_img' onclick = 'add_file_method()'/>\
			</div>\
		";
		for( var i = 0; i < temp.length ; i++){
			if( temp[i].type == "t"){
				continue;
			}
			else if( temp[i].type == "d"){
				out += "\
					<div class = 'list files folder'>\
						<img class = 'file_imgs' src = '../images/folder.png' alt = '"+temp[i].caption+"입니다'/>\
						<span class = 'caption'>"+ temp[i].caption + "</span>\
						<input type = 'button' value = '"+temp[i].code+"' id = 'code'/>\
						<input type = 'button' value = 'd' id = 'type'/>\
					</div>\
				";
			}
			else if( temp[i].type == "f"){
				out += "\
					<div class = 'list files file'>\
						<img id = 'pics' class = 'file_imgs' src = '"+temp[i].img+"' alt = '"+temp[i].caption+" 이미지파일' />\
						<span class = 'caption'> "+temp[i].caption+"</span>\
						<input type = 'button' value = '"+temp[i].code+"' id = 'code'/>\
						<input type = 'button' value = 'f' id = 'type'/>\
					</div>\
				";
			}
		}
	}
*/
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
	form_temp.action = "../js/album/add_file.php";
	form_temp.method = "POST";

	var out = "";
	out += "<span class = 'modal_caption'>[ 형식 ]</span>";
	out += "<input id = 'modal_folder' class = 'modal_input' type = 'radio' name = 'which_type' value = 'folder'/> 폴더";
	out += "<input id = 'modal_file' class = 'modal_input' type = 'radio' name = 'which_type' value = 'file' /> 사진";
	out += "<br/>";
	out += "<span class = 'modal_caption modal_name'>[ 파일명 ]</span>";
	out += "<input class = 'modal_name' type = 'text' name = 'name'/>"
	out += "<br/>";
	out += "<span class = 'modal_caption modal_img'>[ 이미지 파일 ]</span>";
	out += "<input class = 'modal_img' type = 'file' name = 'img_file' />"; 
	out += "<span class = 'modal_caption modal_memo'>[ 짧은 이야기 ]</span>"
	out += "<input class = 'modal_memo' type = 'text' name = 'memo'/>";
	out += "<br/>";
	out += "<input type = 'button' name = 'now_path' value = '"+now_code+"' style = 'display:none'/>";
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
				modal_form.submit();
			}
		}
	}
	else if(modal_file.checked){
		if( modal_name.value == ""){
			alert("파일명을 입력해주세요!\n\n");
		}
		else{
			if(modal_img.value == ""){
				alert("이미지 파일을 선택해주세요!\n\n")
			}
			else if (/(\.jpg|\.bmp|\.png|\.gif|\.jpeg)$/i.test(modal_img.value)) {
				if( confirm("정말 추가하시겠어요?\n\n") ){
					modal_form.submit();
				}
			}
			else{
				alert("가능한 이미지 확장자가 아닙니다. \n \( .jpg , .bmp , .png , .gif , .jpeg 이 가능합니다.\)\n\n");
			}
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
	form_temp.action = "/logout";
	form_temp.method = "GET";

	if(confirm("정말 로그아웃 하시겠습니까? \n\n ")){
		form_temp.submit();
	}
}
