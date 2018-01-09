<?php

//! Base controller
class Controller {

	protected
		$db;

	//! HTTP route pre-processor
	function beforeroute($f3) {
		$db=$this->db;
		// Prepare user menu
	}

	//! HTTP route post-processor
	function afterroute() {
		// Render HTML layout
	}

	//! Instantiate class
	function __construct() {
		$f3=Base::instance();
		// Connect to the database
		$this->db = new \DB\Jig ( 'user/user1' , $format = \DB\Jig::FORMAT_JSON );
	}

}