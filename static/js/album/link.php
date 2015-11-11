<?php

	$a = array(
		"folder" => array(
			array("code" => "Morigram1" , "type" => "d" , "caption" => "Morigram1"),
			array("code" => "Morigram2" , "type" => "d" , "caption" => "Morigram2")
		),
		"file" => array(
			array("code" => "1" , "type" => "f" ,"img" => "../images/abc.jpg", "caption" => "1번 파일"),
			array("code" => "2" , "type" => "f" ,"img" => "../images/abc.jpg", "caption" => "2번 파일"),
			array("code" => "3" , "type" => "f" ,"img" => "../images/dokyo (1).jpg", "caption" => "3번 파일"),
			array("code" => "4" , "type" => "f" ,"img" => "../images/abc.jpg", "caption" => "4번 파일"),
			array("code" => "5" , "type" => "f" ,"img" => "../images/abc.jpg", "caption" => "5번 파일"),
			array("code" => "6" , "type" => "f" ,"img" => "../images/abc.jpg", "caption" => "6번 파일"),
			array("code" => "7" , "type" => "f" ,"img" => "../images/abc.jpg", "caption" => "7번 파일"),
			array("code" => "8" , "type" => "f" ,"img" => "../images/abc.jpg", "caption" => "8번 파일"),
			array("code" => "9" , "type" => "f" ,"img" => "../images/abc.jpg", "caption" => "9번 파일"),
			array("code" => "10" , "type" => "f" ,"img" => "../images/abc.jpg", "caption" => "10번 파일")
		),
		"text" => array(
			array("code" =>"Abc", "type" => "t" , "title" => "2015년 11월 2일, Morigram 탄생일")
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