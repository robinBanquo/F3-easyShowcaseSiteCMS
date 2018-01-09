<?php

//! Front-end processor
class ShowCaseController extends Controller {

	//! Display content page
	function show($f3) {
		$f3->set('name','world');
		$template=new Template;
		echo $template->render('template.htm');
	}
}