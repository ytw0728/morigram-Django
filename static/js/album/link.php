<?php

	$a = array(
		"folder" => array(
			array("code" => "5" , "type" => "d" , "caption" => "5번 폴더"),
			array("code" => "6" , "type" => "d" , "caption" => "6번 폴더"),
			array("code" => "7" , "type" => "d" , "caption" => "7번 폴더"),
			array("code" => "8" , "type" => "d" , "caption" => "8번 폴더"),
			array("code" => "9" , "type" => "d" , "caption" => "9번 폴더")
		),
		"file" => array(
			array("code" => "9" , "type" => "f" ,"img" => "../images/abc.jpg", "caption" => "9번 폴더"),
			array("code" => "9" , "type" => "f" ,"img" => "../images/abc.jpg", "caption" => "9번 폴더"),
			array("code" => "9" , "type" => "f" ,"img" => "../images/dokyo (1).jpg", "caption" => "9번 폴더"),
			array("code" => "9" , "type" => "f" ,"img" => "../images/abc.jpg", "caption" => "9번 폴더"),
			array("code" => "9" , "type" => "f" ,"img" => "../images/abc.jpg", "caption" => "9번 폴더"),
			array("code" => "9" , "type" => "f" ,"img" => "../images/abc.jpg", "caption" => "9번 폴더"),
			array("code" => "9" , "type" => "f" ,"img" => "../images/abc.jpg", "caption" => "9번 폴더"),
			array("code" => "9" , "type" => "f" ,"img" => "../images/abc.jpg", "caption" => "9번 폴더"),
			array("code" => "9" , "type" => "f" ,"img" => "../images/abc.jpg", "caption" => "9번 폴더"),
			array("code" => "9" , "type" => "f" ,"img" => "../images/abc.jpg", "caption" => "9번 폴더")
		),
		"text" => array(
			array("code" =>"Abc", "type" => "t" , "title" => "가나다라마바사 신기한한글나라가나다라마바사 신기한한글나라가나다라마바사 신기한한글나라가나다라마바사 신기한한글나라가나다라마바사 신기한한글나라가나다라마바사 신기한한글나라가나다라마바사 신기한한글나라가나다라마바사 신기한한글나라가나다라마바사 신기한한글나라가나다라마바사 신기한한글나라가나다라마바사 신기한한글나라가나다라마바사 신기한한글나라가나다라마바사 신기한한글나라가나다라마바사 신기한한글나라가나다라마바사 신기한한글나라가나다라마바사 신기한한글나라가나다라마바사 신기한한글나라가나다라마바사 신기한한글나라가나다라마바사 신기한한글나라가나다라마바사 신기한한글나라가나다라마바사 신기한한글나라가나다라마바사 신기한한글나라가나다라마바사 신기한한글나라가나다라마바사 신기한한글나라")
		)
	);


/*
	$a = array(
		array("code" => "10" , "type" => "d" , "caption" => "10번 폴더"),
		array("code" => "11" , "type" => "d" , "caption" => "11번 폴더"),
		array("code" => "12" , "type" => "d" , "caption" => "12번 폴더"),
		array("code" => "13" , "type" => "d" , "caption" => "13번 폴더"),
		array("code" => "14" , "type" => "d" , "caption" => "14번 폴더"),
		array("code" =>"Abc", "type" => "t" , "title" => "가나다라마바사 신기한한글나라")
	);
*/
/*
	$a = array(
		array("code" => "15" , "type" => "d" , "caption" => "15번 폴더"),
		array("code" => "16" , "type" => "d" , "caption" => "16번 폴더"),
		array("code" => "17" , "type" => "d" , "caption" => "17번 폴더"),
		array("code" => "18" , "type" => "d" , "caption" => "18번 폴더"),
		array("code" => "19" , "type" => "d" , "caption" => "19번 폴더"),
		array("code" =>"Abc", "type" => "t" , "title" => "가나다라마바사 신기한한글나라")
	);
*/
	echo json_encode($a);

?>