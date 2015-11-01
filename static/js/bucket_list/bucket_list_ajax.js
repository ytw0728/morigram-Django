function bucket_list_ajax(){
	var temp = new XMLHttpRequest();
    temp.open('POST', '../js/bucket_list/buckets.php');
    temp.onreadystatechange = function(){
        if(temp.readyState === 4 && temp.status === 200){
            get_buckets(temp.responseText);
        }
    }
    temp.send(); 
}