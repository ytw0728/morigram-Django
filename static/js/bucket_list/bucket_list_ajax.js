
function bucket_list_ajax(){
	var temp = new XMLHttpRequest();
    temp.open('POST', '/bucketlist/');
    temp.onreadystatechange = function(){
        if(temp.readyState === 4 && temp.status === 200){
            get_buckets(temp.responseText);
        }
    }
    temp.send();
}

/*
function change_status_ajax(i){
	var temp = new XMLHttpRequest();
	var data = new FormData();

	data.append("code",source_code_array[i]);
	if(source_bool_array[i]){
		data.append("is_acheived",1);
	}
	else{
		data.append("is_acheived",0);
	}

	temp.onreadystatechange = function(){
		if(temp.readyState === 4 && temp.status === 200){
			get_buckets(temp.responseText);
		}
	}
	temp.open('PUSH','/buckets/');
	temp.send();
	
}
*/

function change_status_ajax(bool , this_){
	if(this_.src == "http://morigram.kim82536.pe.kr:8000/static/images/complit.png"){
		this_.src = "/static/images/doing.png";
	}
	else{
		this_.src = "/static/images/complit.png";
	}
}