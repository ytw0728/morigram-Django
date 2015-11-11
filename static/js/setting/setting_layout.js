function make(){

	make_ingre(); // 요소생성

	homelink.style.lineHeight = homelink.offsetHeight + "px";
	

	//ajax_get_members();

	set_event();
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

var members_box;
var member_cell;
var no_member;

var footer;

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

	members_box = document.getElementsByClassName("members_box")[0];
	member_cell = document.getElementsByClassName("member_cell");
	no_member = document.getElementsByClassName("no_member");

	footer = document.getElementsByTagName("footer")[0];

	set_page_layout();
}

function set_page_layout(){
	posts.style.height = main.offsetHeight - nav.offsetHeight + "px";
	menus.style.lineHeight = menus.offsetHeight + "px";
	scroll.style.height = posts.offsetHeight - menus.offsetHeight - footer.offsetHeight + "px";

	for(var i = 0 ; i < member_cell.length; i ++){	
		member_cell[i].style.height = member_cell[i].offsetWidth + "px";
		member_cell[i].style.lineHeight = member_cell[i].offsetHeight + "px";
	}
}

var member_len;
function get_members(member_array_temp){
	members_box.innerHTML = "";
	if( member_array_temp == null){
		for(i = 0; i<6; i++){
			var cell_temp = document.createElement("div");
			cell_temp.className = "member_cell";
			var member_temp = document.createElement("div");
			member_temp.className = "member no_member";

			var out = "";
			out += "<img src = '/static/images/more_member.png'/>";
			out += "<span class = 'name'><span class = 'role'></span></span>";

			member_temp.innerHTML = out;
			cell_temp.appendChild(member_temp);

			members_box.appendChild(cell_temp);
		}
	}
	else{
		var temp = JSON.parse(member_array_temp);

		member_len = temp.length;

		for(var i= 0; i < member_len ; i++){
			var cell_temp = document.createElement("div");
			cell_temp.className = "member_cell";
			var member_temp = document.createElement("div");
			member_temp.className = "member";

			var out = "";
			out += "<img src = '"+temp[i].img+"'/>";
			out += "<span class = 'name'><span class = 'role'>";
			out += temp[i].role + "</span>";
			out += temp[i].name + "</span>";

			member_temp.innerHTML = out;
			cell_temp.appendChild(member_temp);
			
			members_box.appendChild(cell_temp);
			
		}
		for(i = 0; i< 6 - member_len; i++){

			var cell_temp = document.createElement("div");
			cell_temp.className = "member_cell";
			var member_temp = document.createElement("div");
			member_temp.className = "member no_member";

			var out = "";
			out += "<img src = '/static/images/more_member.png'/>";
			out += "<span class = 'name'><span class = 'role'></span></span>";

			member_temp.innerHTML = out;
			cell_temp.appendChild(member_temp);

			members_box.appendChild(cell_temp);
		}
	}

	make_ingre();
	set_event();
}

function set_event(){
	for(var i = 0 ; i < no_member.length; i++){
		no_member[i].addEventListener("click", add_member );
	}
}
function add_member(){
	var out = "";
	out += "<form action = '/add_member/' method = 'POST' enctype = 'multipart/form-data'>";
	out += "<span class = 'caption'> 프로필 사진 </span>";
	out += "<input id = 'input_img' name = 'img' type = 'file' />";
	out += "<br/>";
	out += "<span class = 'caption'> 이름 </span>";
	out += "<input type = 'text' id = 'input_name' name = 'name' />";
	out += "<br/>";
	out += "<span class = 'caption'> 역할 </span>";
	out += "<input type = 'text' id = 'input_role' name = 'role'  />";
	out += "<br/>";
	out += "<input type = 'button' value = '저장' id = 'add_submit' onclick = 'add_check(this)'/>";
	out += "</form>";

	this.innerHTML = out;
	this.removeEventListener("click", add_member );

}
function add_check(a){
	if( a.parentNode.children.namedItem("input_name").value == "" ){
		alert("이름을 입력해주세요! \n\n");
	}
	else{
		if( a.parentNode.children.namedItem("input_role").value == ""){
			alert("역할을 입력해주세요! \n\n")
		}
		else{
			if(a.parentNode.children.namedItem("input_img").value == ""){
				if(confirm("기본이미지가 등록됩니다.\n그래도 추가하시겠습니까?")){
					a.parentNode.submit();
				}
			}
			else if (/(\.jpg|\.bmp|\.png|\.gif|\.jpeg)$/i.test(a.parentNode.children.namedItem("input_img").value)){
				if( confirm("정말 추가하시겠습니까?\n\n") ){
					a.parentNode.submit();
				}
			}
			else{
				alert("가능한 이미지 확장자가 아닙니다. \n \( .jpg , .bmp , .png , .gif , .jpeg 이 가능합니다.\)\n\n");
			}
		}
	}
}

function logout_method(){
	var form_temp = document.createElement("form");
	form_temp.action = "/logout/";
	form_temp.method = "POST";

	if(confirm("정말 로그아웃 하시겠습니까? \n\n ")){
		form_temp.submit();
	}
}
