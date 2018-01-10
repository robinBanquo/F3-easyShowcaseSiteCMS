<?php

//! Front-end processor
class ShowCaseController extends Controller {
	//! Display content page
	function showVisitor() {
		var_dump($this->getSiteStructure());
		$template=new Template;
		echo $template->render('template.htm');
	}

	function showAdmin() {
		if ($this->isAdmin()) {
			$this->f3->set('isAdminPage',TRUE);
			$template=new Template;
			echo $template->render('template.htm');
		} else {
			$this->f3->set('SESSION.loginPageMessage',
				"vous devez vous authentifier pour accéder au options d'administration");
			$this->f3->reroute('/login');
		}
	}


}