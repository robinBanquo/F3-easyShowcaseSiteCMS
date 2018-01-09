<?php

//! Front-end processor
class ShowCaseController extends Controller {

	//! Display content page
	function show() {
		$this->f3->set('name','world');
		$template=new Template;
		echo $template->render('template.htm');
	}
}