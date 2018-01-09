<?php

//! Front-end processor
class AdminController extends Controller {
	//! Display content page
	function authenticate() {
		$username = $this->f3->get('POST.username');
		$password = $this->f3->get('POST.password');


		if($username === $this->f3->get('user_id') AND password_verify($password , $this->f3->get('password'))) {
			$this->f3->set('SESSION.user', $this->f3->get('admin'));
			$this->f3->reroute('/');
		} else {
			$this->f3->reroute('/login');
		}
	}
}