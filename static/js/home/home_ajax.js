/*function ajax_get_members(){
	var temp = new XMLHttpRequest();
    temp.open('POST', '/get_members');
    temp.onreadystatechange = function(){
        if(temp.readyState === 4 && temp.status === 200){
            get_members(temp.responseText);

        }
    }
    temp.send();
}
*/

function ajax_get_previews(){

    var temp = new XMLHttpRequest();
    temp.open('POST', '/api/album-thumbnail/');
    temp.onreadystatechange = function(){
        if(temp.readyState === 4 && temp.status === 200 ){
            get_previews(temp.responseText);
        }
    }
    temp.send();

}