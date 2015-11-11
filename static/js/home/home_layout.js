function make(){
	document.styleSheets[0].addRule('#modal img', 'max-width : '+ window.innerWidth / 10 * 8 + "px");
	document.styleSheets[0].addRule('#modal img', 'max-height : '+ window.innerHeight / 10 * 8 + "px");

	make_ingre(); // 요소생성

	ajax_get_members(); // 멤버 생성 후 요소 생성
	ajax_get_previews(); // 앨범 미리보기 생성 후 요소 생성
	set_page_layout();
}

var wrap;
var nav;
var navlogo;
var homelink;

var main;
var posts;
var menus;
var scroll;
var family;
var profiles;
var members;
var member_imgs;
var role;
var name;

var preview;
var previews;
var preview_imgs;

var footer;
var modal;

function make_ingre(){
	wrap = document.getElementsByTagName("wrap")[0];
	nav = document.getElementsByTagName("nav")[0];
	navlogo = document.getElementsByClassName("navlogo")[0];
	homelink = document.getElementsByClassName("homelink")[0];

	main = document.getElementById("main");
	posts = document.getElementById("posts");
	scroll = document.getElementsByClassName("scroll")[0];
	menus = document.getElementsByClassName("menus")[0];
	family = document.getElementsByClassName("family")[0];
	profiles = document.getElementsByClassName("profiles")[0];
	members = document.getElementsByClassName("members");
	member_imgs = document.getElementsByClassName("member_imgs");
	role = document.getElementsByClassName("role");
	name = document.getElementsByClassName("name");

	preview = document.getElementsByClassName("preview")[0];
	previews = document.getElementsByClassName("previews")[0];
	preview_imgs = document.getElementsByClassName("preview_imgs");
	footer = document.getElementsByTagName("footer")[0];
		modal = document.getElementById("modal");
	
}

function set_page_layout(){
	posts.style.height = main.offsetHeight - nav.offsetHeight + "px";
	menus.style.lineHeight = menus.offsetHeight + "px";
	scroll.style.height = posts.offsetHeight - menus.offsetHeight - footer.offsetHeight + "px";
	members_layout();
	previews_layout();
	if(check_modal_view){
		modal_layout();
	}
}

var member_len;
function get_members(member_array_temp){

	var temp = JSON.parse(member_array_temp);

	member_len = temp.length;

	for(var i = 0 ; i < member_len ; i ++){
		var temp_article = document.createElement("article");
		temp_article.className = "members"

		var out = "";
		out += "<img class = 'member_imgs' src = '" + temp[i].img +"' alt = '멤버 프로필 이미지 "+temp[i].name+temp[i].role+" '/>";
		out += "<span class = 'name'><span class = 'role'>";
		out += temp[i].role + "</span>";
		out += temp[i].name + "</span>";

		temp_article.innerHTML = out;
		profiles.appendChild(temp_article);
	}
	make_ingre(); // 요소생성
	members_layout();
}
function members_layout(){
	for( var i = 0 ; i < member_len ; i++){
		members[i].style.height = ( members[i].offsetWidth /6 * 7) + "px";
		members[i].style.marginRight = ( family.offsetWidth / 8 ) / member_len + "px";
		
		member_imgs[i].style.height = member_imgs[i].offsetWidth + "px";
		role[i].style.marginRight = (members[i].offsetWidth / 10) +"px";
		role[i].style.color = "#f7c90e";
		
	}
}

var source_temp_array = new Array();
var source_index = 0;
var preview_len;
function get_previews(preview_array_temp){
	var temp = JSON.parse(preview_array_temp);
	preview_len = temp.length;
	
	for(var i = 0 ; i < preview_len; i++){
		source_temp_array[source_index++] = temp[i].img;
		var temp_article = document.createElement("article");
		temp_article.className = "preview_imgs";
		
		var out = "";
		out += "<img src = '"+temp[i].img+"' alt = '앨범 미리보기' onclick = 'show_modal_img("+i+")'/>"


		temp_article.innerHTML = out;
		previews.appendChild(temp_article);
	}
	make_ingre();
	previews_layout();
}
function previews_layout(){
	for(var i = 0 ; i < preview_len ; i++){
		preview_imgs[i].style.width = ( preview.offsetWidth / 5 ) + "px";
		preview_imgs[i].style.height = preview_imgs[i].offsetWidth + "px";
		preview_imgs[i].style.marginLeft = (preview.offsetWidth / 6 ) / preview_len + "px";
	}
	
	
}


var check_modal_view = 0;
function show_modal_img(index){
		modal.innerHTML = "<img id = 'modal_image' src = '"+source_temp_array[index]+"' alt = '이미지 크게보기'/>";
		modal.style.display = "flex"
		modal_layout();
		modal.style.zIndex = "100";
		wrap.style.animation = "blur_wrap .5s ease ";
		wrap.style.opacity = "0.4";
		wrap.addEventListener("click", unshow_modal_img,true);
		check_modal_view = 1;
		modal_layout();
}
function unshow_modal_img(){
	modal.style.display = "none";
	wrap.style.animation = "unblur_wrap .5s ease";
	wrap.style.opacity = "1";
	modal.style.zIndex = "-1";
	check_modal_view = 0;
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


function logout_method(){
	var form_temp = document.createElement("form");
	form_temp.action = "/logout";
	form_temp.method = "POST";
	if(confirm("정말 로그아웃 하시겠습니까? \n\n ")){
		form_temp.submit();
	}
}
