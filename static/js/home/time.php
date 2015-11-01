<?php
	$d = new DateTime;
	$d->setTimezone(new DateTimezone("asia/seoul"));
	echo $d->format('H:i:s');
?>