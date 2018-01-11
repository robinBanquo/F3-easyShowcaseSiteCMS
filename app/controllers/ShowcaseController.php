<?php

//! Front-end processor
class ShowCaseController extends Controller {
	//! Display content page
	function showVisitor() {
		$this->generatePage();

		$template=new Template;
		echo $template->render('template.htm');
	}

	function showAdmin() {
		if ($this->isAdmin()) {
			$this->f3->set('isAdminPage',TRUE);
			$this->generatePage();
			$this->generateAdminOnlyData();
			$template=new Template;
			echo $template->render('template.htm');
		} else {
			$this->f3->set('SESSION.loginPageMessage',
				"vous devez vous authentifier pour accéder au options d'administration");
			$this->f3->reroute('/login');
		}
	}

	function generatePage() {
		$siteStructure=$this->getSiteStructure();
		$this->f3->set('siteStructure',$siteStructure);
		$this->importJs();
	}
	function importJs() {
		$siteStructure = $this->f3->get('siteStructure');
		$jsArray = array();
		foreach ($siteStructure as $section){
			if(!in_array($section['module'], $jsArray)){
				array_push($jsArray, $section['module']);
			}
		}
		$this->f3->set('jsSectionArray', $jsArray);
	}
	function generateAdminOnlyData(){
		$modulesList= array();
		$modulesFolderItems = scandir ( __DIR__.'/../views/modules/');
		$modules = array();
		foreach ($modulesFolderItems as $item){
			if($item[0] !== '.'){
				array_push($modules, $item);
			}
		}
		foreach ($modules as $module){
			$moduleInfo= json_decode (file_get_contents(__DIR__.'/../views/modules/'.$module.'/info.json'),true);
			array_push($modulesList,$moduleInfo);
		}
$this->f3->set('modulesList', $modulesList);
	}

}