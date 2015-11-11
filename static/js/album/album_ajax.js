function ajax_get_file(){
	var temp = new XMLHttpRequest();
	temp.open("POST","../js/album/get_files.php");
	temp.onreadystatechange = function(){
        if(temp.readyState === 4 && temp.status === 200){
            get_file(temp.responseText);
        }
    }
    temp.send();
}

var code_array = new Array();
var code_index = 0;
var parents_code = "";
var temp_code = "";
var now_code = "";

function link(){
    var data = new FormData();
    data.append("code", this.children.namedItem('code').value);
    data.append("type", this.children.namedItem('type').value);
    
    if( now_code != head_code && now_code != ""){
        temp_code = now_code;
        now_code = this.children.namedItem('code').value;
        if( now_code == parents_code ){
            if( now_code == head_code ){
                temp_code = head_code;
                code_index = 0;
                ajax_get_file();
                return 0;
            }
            else{
                code_index -= 1;
                parents_code = code_array[code_index];
            }
        }
        else{
            code_index += 1;
            code_array[code_index + 1] = now_code;
            parents_code = temp_code;
        }
    }
    else{
        temp_code = now_code;
        now_code = this.children.namedItem('code').value;
        code_array[code_index + 1] = now_code;
    }

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function()
    {
        if(xmlHttp.readyState == 4 && xmlHttp.status == 200)
        {   
            get_file(xmlHttp.responseText);
        }
    }
    xmlHttp.open("POST", "../js/album/link.php"); 
    xmlHttp.send(data); 
}