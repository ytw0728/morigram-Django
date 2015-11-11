<?php

	$ary = array(
		array('img' => '../images/pa.png','role' =>'아빠', 'name' => '감감감'),
		array('img' => '../images/ma.png','role' =>'엄마','name' =>'곰곰곰'),
		array('img' => '../images/adul.png','role' =>'아들','name' =>'김김김'),
		array('img' => '../images/dal.png','role' =>'딸','name' =>'팀팀팀'),
		array('img' => '../images/dog.png','role' =>'강아지','name' =>'톰톰톰'),
		array('img' => 666,'role' =>'고양이','name' =>'튬튬튬')
	);

/*
	$ary = array(
		array('img' => '../images/pa.png','role' =>'아빠', 'name' => '감감감')
	);*/
/*
	$ary = array(
		array('img' => '../images/pa.png','role' =>'아빠', 'name' => '신형만'),
		array('img' => '../images/ma.png','role' =>'엄마','name' =>'봉미선'),
		array('img' => '../images/adul.png','role' =>'아들','name' =>'신짱구')
	);
	*/
	echo json_encode($ary);
?>