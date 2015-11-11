/*
function ajax_get_members(){
	var temp = new XMLHttpRequest();
    temp.open('POST', '/get_members/');
    temp.onreadystatechange = function(){
        if(temp.readyState === 4 && temp.status === 200){
            if(temp.responseText) get_members(temp.responseText);
            else get_members(null);
        }
    }
    temp.send();
}
*/