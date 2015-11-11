function ajax_get_file(){
    var temp = new XMLHttpRequest();
    temp.open("GET","/api/album/");
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
    now_path = this.children.namedItem("code").value.split("/api/album")[1];
    temp.open("GET",out);
    temp.onreadystatechange = function(){
        if(temp.readyState === 4 && temp.status === 200){
            get_file(temp.responseText);
        }
    }
    temp.send();
}