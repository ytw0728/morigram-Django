<?php
	$a = array(
		array("code" => 1, "img"=>"../images/sidebar_top.jpg","title"=>"칼퇴하기","check_info"=>true),
		array("code" => 2, "img"=>"../images/sidebar_top.jpg","title"=>"인사동 놀러가기","check_info"=>true),
		array("code" => 3, "img"=>"../images/abc.jpg","title"=>"학교 일찍 가기 ","check_info"=>true),
		array("code" => 4, "img"=>"../images/cba.jpg","title"=>"부모님 결혼기념일 챙기기 11/7","check_info"=>false),
		array("code" => 5, "img"=>"../images/morigram_bucket.png","title"=>"친구들이랑 2박 3일 놀러가기","check_info"=>false),
		array("code" => 6, "img"=>"../images/morigram_bucket.png","title"=>"보고싶은 영화 포스터 두편 업로드하기","check_info"=>false),
		array("code" => 7, "img"=>"../images/morigram_bucket.png","title"=>"수학 보충하기","check_info"=>false)
	);

	echo json_encode($a);
?>