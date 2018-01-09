<?php

//! Base controller
class Controller {

	protected $db;
	protected $f3;
	public $siteName = "framasite";

	//! HTTP route pre-processor
	function beforeroute($f3) {
		$db=$this->db;
	}

	//! HTTP route post-processor
	function afterroute() {
		// Render HTML layout
	}

	//! Instantiate class
	function __construct() {
		$this->f3 = Base::instance();
		$this->f3->config('sites/'.$this->siteName.'/config.ini');
		// Connect to the database

		$this->db = new \DB\Jig ( $_SERVER["DOCUMENT_ROOT"].'/sites/'.$this->siteName , $format = \DB\Jig::FORMAT_JSON );
	}


}