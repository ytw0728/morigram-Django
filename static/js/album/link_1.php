<?php
	$a = "
	<div class = 'memo'>
		<span class = 'text'>\" 가나다라마바사 신기한한글나라 \"</span>
	</div>
	<div class = 'to_parents list folder'>
			<img src = '../images/parents_folder.jpg' class = 'file_imgs parents_img' />
		<span class = 'caption' >..</span>
		<input type = 'button' value = '1' id = 'code'/>
		<input type = 'button' value = 'd' id = 'type'/>
	</div>
	<div class = 'add_file list' >
		<img src = '../images/dongle.png' class = 'add_img' onclick = 'add_file_method()'/>
	</div>
	

	<div class = 'list files folder'>
		<img class = 'file_imgs' src = '../images/folder.png' alt = '1번 폴더 입니다.'/>
		<span class = 'caption'>1번폴더</span>
		<input type = 'button' value = '1' id = 'code'/>
		<input type = 'button' value = 'd' id = 'type'/>
	</div>
	<div class = 'list files folder'>
		<img class = 'file_imgs' src = '../images/folder.png' alt = '2번 폴더 입니다.'/>
		<span class = 'caption'>2번폴더</span>
		<input type = 'button' value = '2' id = 'code'/>
		<input type = 'button' value = 'd' id = 'type'/>
	</div>
	<div class = 'list files folder'>
		<img class = 'file_imgs' src = '../images/folder.png' alt = '3번 폴더 입니다.'/>
		<span class = 'caption'>3번폴더</span>
		<input type = 'button' value = '3' id = 'code'/>
		<input type = 'button' value = 'd' id = 'type'/>
	</div>


	<div class = 'list files file'>
		<img class = 'file_imgs' src = '../images/abc.jpg' alt = '1번 이미지파일' />
		<span class = 'caption'> abc </span>
		<input type = 'button' value = '1' id = 'code'/>
		<input type = 'button' value = 'f' id = 'type'/>
	</div>

	";

	echo json_encode($a);
?>