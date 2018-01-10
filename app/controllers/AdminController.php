<?php

//! Front-end processor
class AdminController extends Controller {
	// affichage de la page login
	function login() {
		if ($this->isAdmin()) {
			$this->f3->reroute('/admin');
		} else {
			$template=new Template;
			echo $template->render('login.htm');
		}
	}
	// affichage de la page login
	function logout() {
		var_dump("coucou");
		if ($this->isAdmin()) {
			$this->f3->set('SESSION.user',"");
		} else {

		}
		$this->f3->reroute('/');
	}

	//! Display content page
	function authenticate() {
		$username=$this->f3->get('POST.username');
		$password=$this->f3->get('POST.password');


		if ($username===$this->f3->get('user_id') AND
			password_verify($password,$this->f3->get('password'))) {
			$this->f3->set('SESSION.user',$this->f3->get('user_id'));
			$this->f3->reroute('/');
		} else {
			$this->f3->set('SESSION.loginPageMessage',
				"Nom d'utilisateur ou mot de passe invalide");
			$this->f3->reroute('/login');
		}
	}
}