<?php

//! Front-end processor
class EditController extends Controller {
	// affichage de la page login
	function beforeroute() {
		if (!$this->isAdmin()) {
			$template=new Template;
			echo $template->render('login.htm');
		}
	}


	//! Display content page
	function addSection() {

	}
}