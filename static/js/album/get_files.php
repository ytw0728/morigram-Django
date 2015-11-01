<?php
	
	$a = array(
		"head" => array(
			array("head" => "0" , "type" => "r" )
		),
		"folder" => array(
			array("code" => "1" , "type" => "d" , "caption" => "1번 폴더"),
			array("code" => "2" , "type" => "d" , "caption" => "2번 폴더"),
			array("code" => "3" , "type" => "d" , "caption" => "3번 폴더"),
			array("code" => "4" , "type" => "d" , "caption" => "4번 폴더"),
			array("code" => "5" , "type" => "d" , "caption" => "5번 폴더")
		)
	);

	echo json_encode($a);
?>