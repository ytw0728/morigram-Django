function ajax_get_file(){
    var temp = new XMLHttpRequest();
    var out = "/api/album/" + now_path;
    temp.open("GET",out);
    temp.onreadystatechange = function(){
        if( temp.readyState === 4 && temp.status === 200 ){
            get_file(temp.responseText);
        }
    }
    temp.send();
}


var now_path = "";
function link(){
    var temp = new XMLHttpRequest();
    var out = this.children.namedItem("code").value;
    now_path = this.children.namedItem("code").value.split("/api/album/")[1];
    temp.open("GET",out);
    temp.onreadystatechange = function(){
        if(temp.readyState === 4 && temp.status === 200){
            get_file(temp.responseText);
        }
    }
    temp.send();
}


function add_file_ajax(check_){
    var temp = new XMLHttpRequest();
    var data = new FormData();
    var out = "/api/album/"+now_path;
    if( check_ ){
        data.append("title", modal_form.title.value);
        data.append("memo", modal_form.memo.value);
    }
    else{
        data.append("img" , modal_form.img.files[0]);
    }

    temp.onreadystatechange = function(){
        if( temp.readyState === 4 && temp.status === 200){
            unshow_modal_img();
            ajax_get_file();
        }
    }
    temp.open("POST",out);
    temp.send(data);
}
