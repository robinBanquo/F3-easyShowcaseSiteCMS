<?php
//! Base controller
class Controller {

	protected $db;
	protected $f3;
	public $siteName = "framasite";

	//! HTTP route pre-processor
	function beforeroute() {

	}

	//! HTTP route post-processor
	function afterroute() {
		// Render HTML layout
	}

	//! Instantiate class
	function __construct() {
		$this->f3 = Base::instance();
		$this->f3->config('sites/'.$this->siteName.'/config.ini');
		if($this->isAdmin()){
			$this->f3->set('isAdmin', true);
		}
		// Connect to the database
		$this->db = new \DB\Jig ( $_SERVER["DOCUMENT_ROOT"].'/sites/'.$this->siteName.'/data/' , $format = \DB\Jig::FORMAT_JSON  );



	}

	function isAdmin(){
		return $this->f3->get('SESSION.user') ===$this->f3->get('user_id') ;
	}

	function getSiteStructure(){

		$siteStructure = $this->db->read('team');
		if(empty($siteStructure)){
			$fixtures = new Fixtures();
			$siteStructure = $fixtures->siteMap;
			$this->db->write('siteStructure.json',$siteStructure);
			return $this->db->read('team');
		}else{
			return $siteStructure();
		}
	}

}