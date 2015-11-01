<?php
	$a = array(
		array("code" => 1, "img"=>"../images/sidebar_top.jpg","title"=>"Test01","check_info"=>true),
		array("code" => 2, "img"=>"../images/sidebar_top.jpg","title"=>"Test02","check_info"=>true),
		array("code" => 3, "img"=>"../images/abc.jpg","title"=>"Test03","check_info"=>true),
		array("code" => 4, "img"=>"../images/cba.jpg","title"=>"Test04","check_info"=>false),
		array("code" => 5, "img"=>"../images/morigram_bucket.png","title"=>"Test05","check_info"=>false),
		array("code" => 6, "img"=>"../images/morigram_bucket.png","title"=>"Test06","check_info"=>false),
		array("code" => 7, "img"=>"../images/morigram_bucket.png","title"=>"Test07Test07Test07Test07Test07Test07Test07Test07Test07Test07Test07Test07Test07Test07Test07Test07Test07Test07Test07Test07Test07Test07Test07Test07Test07Test07Test07Test07Test07Test07Test07Test07Test07Test07Test07Test07Test07Test07Test07Test07Test07Test07asdasd","check_info"=>false)
	);

	echo json_encode($a);
?>