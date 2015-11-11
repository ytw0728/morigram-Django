<?php
	
	$a = array(
		"head" => array(
			array("head" => "0" , "type" => "r" )
		),
		"folder" => array(
			array("code" => "Morigram" , "type" => "d" , "caption" => "Morigram"),
			array("code" => "윤태원" , "type" => "d" , "caption" => "윤태원"),
			array("code" => "김현우" , "type" => "d" , "caption" => "김현우"),
			array("code" => "김도현" , "type" => "d" , "caption" => "김도현"),
			array("code" => "강민지" , "type" => "d" , "caption" => "강민지")
		)
	);

	echo json_encode($a);
?>