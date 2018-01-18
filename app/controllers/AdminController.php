<?php

/***************************
 * Class AdminController
 * Classe gérant l'authentification de l'utilisateur et l'affichage de la page de login
 */
class AdminController extends Controller {
	// affichage de la page login
	function login() {
		//si l'utilisateur est connecté comme admin
		if ($this->isAdmin()) {
			//on le renvoi direct sur la page admin
			$this->f3->reroute('/admin');
		} else {
			//sinon on rends le template de login
			$template=new Template;
			echo $template->render('login.htm');
		}
	}
	// methode de deconnexion
	function logout() {
		if ($this->isAdmin()) {
			//on vire l'user de la session
			$this->f3->set('SESSION.user',"");
		}
		$this->f3->reroute('/');
	}
	// affichage de la page login
	function error() {
			//sinon on rends le template de login
			$template=new Template;
			echo $template->render('error.htm');
	}
	//méthode d'autentification
	function authenticate() {
		//on recupere le login/mot de passe passé en variables post
		$username=$this->f3->get('POST.username');
		$password=$this->f3->get('POST.password');

//si le nom d'utilisateur coreespond a celui rentré en variable globale grace au fichier config( voir le constructeur de controller)
		if ($username===$this->f3->get('user_id') AND
			//et si le passord est correct
			password_verify($password,$this->f3->get('password'))) {
			//on entre le nom d'utilisateur en session
			$this->f3->set('SESSION.user',$this->f3->get('user_id'));
			//et on reroute vers la page d'admin
			$this->f3->reroute('/admin');
		} else {
			//sinon, on transmet un message d'erreur et on renvoie vers la page de login
			$this->f3->set('SESSION.loginPageMessage',
				"Nom d'utilisateur ou mot de passe invalide");
			$this->f3->reroute('/login');
		}
	}
}