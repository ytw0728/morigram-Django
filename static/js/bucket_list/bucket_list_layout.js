function make(){
	make_ingre(); // 요소생성

	homelink.style.lineHeight = homelink.offsetHeight + "px";

	bucket_list_ajax();
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
var bucket_list;
var bucket_lists_img;

var submit_section;

var require_form;
var require_input;

var footer;

function make_ingre(){
	wrap = document.getElementsByTagName("wrap")[0];
	nav = document.getElementsByTagName("nav")[0];
	navlogo = document.getElementsByClassName("navlogo")[0];
	homelink = document.getElementsByClassName("homelink")[0];

	main = document.getElementById("main");
	posts = document.getElementById("posts");
	menus = document.getElementsByClassName("menus")[0];

	scroll = document.getElementsByClassName("scroll")[0];
	bucket_list = document.getElementsByClassName("bucket_list")[0];
	bucket_lists_img = document.getElementsByClassName("lists_img");

	submit_section = document.getElementsByClassName("submit_section")[0];

	require_form = document.getElementById("require_form");
	require_input = document.getElementById("require_input");

	footer = document.getElementsByTagName("footer")[0];
}

function set_page_layout(){
	posts.style.height = main.offsetHeight - nav.offsetHeight + "px";
	menus.style.lineHeight = menus.offsetHeight + "px";
	scroll.style.height = posts.offsetHeight - menus.offsetHeight - footer.offsetHeight + "px";

	buckets_layout();
}


var source_code_array = new Array();
var source_bool_array = new Array();
var source_index = 0;
var len;
function get_buckets(buckets_array){
	var temp = JSON.parse(buckets_array);
	len = temp.length;

	bucket_list.innerHTML = "";

	for(var i = 0; i < temp.length; i++){
		source_code_array[source_index] = temp[i].code;
		source_bool_array[source_index] = temp[i].check_info;

		var div_temp = document.createElement("div");
		div_temp.className = "lists";
		var out = "";
		out += "<span class = 'img_box'>"
		out += "<img class = 'lists_img' src = '" + temp[i].img +"' alt = '버킷리스트"+ temp[i].title +"성공여부 : " + temp[i].check +"'/>";
		out += "</span>"
		out += "<span class = 'title'>"+ temp[i].title+"</span>";
		if( temp[i].is_acheived ){
			out +=  "<span class = 'checks' ><img src = '/static/images/complit.png' alt = '버킷리스트 성공!' onclick = 'change_status_ajax("+source_index+")'/></span>";	
		}
		else{
			out +=  "<span class = 'checks' ><img src = '/static/images/doing.png' alt = '버킷리스트 미완료!' onclick = 'change_status_ajax("+source_index+")'/></span>";			
		}

		div_temp.innerHTML = out;

		bucket_list.appendChild(div_temp);
		source_index++;
	}
	set_page_layout();
}

function buckets_layout(){
	for(var i = 0 ; i < bucket_lists_img.length ; i++){
		bucket_lists_img[i].style.width = bucket_lists_img[i].offsetHeight + "px";
	}
}

function add_list(){
	submit_section.removeEventListener("click",add_list);
	var div_temp = document.createElement("div");
	div_temp.className= "lists add_div";

	var form_temp = document.createElement("form");
	form_temp.className = "form_temp";
	form_temp.action = "/add_list/";		// 리스트 추가 url, action
	form_temp.method = "PUT";
	form_temp.enctype = "multipart/form-data";
	var out = "";
	out += "<div class = 'add_input'>"
	out += "<span class = 'input_caption' >리스트 이미지 (없으면 기본 이미지)</span>";
	out += "<input type = 'file' class = 'add_img' name = 'img' accept='image/*' /> <br/>"
	out += "<span class = 'input_caption' >리스트의 제목은 무엇인가요?</span>";
	out += "<input class = 'add_title' type = 'text' name = 'title' />";
	out += "</div>";
	out += "<div class = 'buttons'>";
	out += "<input class = 'add_submit' type = 'button' value = '' onclick = 'submit_add()'/>";
	out += "<input class = 'add_cancel' type = 'button' value = '' onclick = 'cancel_add()'/>";
	out += "</div>";
	form_temp.innerHTML = out;
	div_temp.appendChild(form_temp);
	bucket_list.appendChild(div_temp);
}
function cancel_add(){
	var add_div = document.getElementsByClassName("add_div")[0];
	bucket_list.removeChild(add_div);
	submit_section.addEventListener("click",add_list);
}
function submit_add(){
	var form = document.getElementsByClassName("form_temp")[0];
	var add_img = document.getElementsByClassName("add_img")[0];
	var add_title = document.getElementsByClassName("add_title")[0];

	if(add_title.value != ""){
		if(!add_img.value){
			if( confirm("기본이미지가 적용됩니다. \n정말 추가하시겠어요?\n\n") ){
				form.submit();
			}
		}
		else if (/(\.jpg|\.bmp|\.png|\.gif|\.jpeg)$/i.test(add_img.value)) {
			if( confirm("정말 추가하시겠어요?\n\n") ){
				form.submit();
			}
		}
		else{
			alert("가능한 이미지 확장자가 아닙니다. \n \( .jpg , .bmp , .png , .gif , .jpeg 이 가능합니다.\)\n\n");
		}
	}
	else{
		alert("리스트 제목을 입력해주세요!\n\n");
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

/*
// 인피니티 스크롤링
var scroll_height;
var scroll_view_height;
var scroll_top;

function require_list(){
	scroll_height = scroll.scrollHeight;
	scroll_view_height = scroll.offsetHeight;
	scroll_top = scroll.scrollTop;

	if(( scroll_height - scroll_top ) <= ( scroll_view_height + 1 ) ){
		scroll.removeEventListener("scroll",require_list);

		bucket_list.innerHTML += "abcabcabc<br/>";
	}
	scroll.addEventListener("scroll", require_list);
}

*/