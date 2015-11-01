function ajax_get_members(){
	var temp = new XMLHttpRequest();
    temp.open('POST', '../js/home/get_members.php');
    temp.onreadystatechange = function(){
        if(temp.readyState === 4 && temp.status === 200){
            get_members(temp.responseText);

        }
    }
    temp.send();
}


function ajax_get_previews(){

    var temp = new XMLHttpRequest();
    temp.open('POST', '../js/home/get_previews.php');
    temp.onreadystatechange = function(){
        if(temp.readyState === 4 && temp.status === 200 ){
            get_previews(temp.responseText);
        }
    }
    temp.send();

}