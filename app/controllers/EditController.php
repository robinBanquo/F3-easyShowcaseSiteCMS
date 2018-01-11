<?php

/************************************
 * Class EditController
 * classe gérant les methodes d'édition de la page
 */
class EditController extends Controller {
	// on fait en sorte que toutes les methodes ne soient accecssibles que si l'utilisateur est admin,
	//sinon, on le renvoie vers la page de login
	//todo : verifier que ca marche bien sinon c'est une faille de sécu
	function beforeroute() {
		if (!$this->isAdmin()) {
			//on rajoute un petit message d'erreur qui sera affiché sur la page de login
			$this->f3->set('SESSION.loginPageMessage',
				"vous devez vous authentifier pour accéder au options d'administration");
			//puis on renvoie vers la page de login
			$template=new Template;
			echo $template->render('login.htm');
		}
	}


	//méthode d'insertion d'une section dans la page
	function addSection() {
		$reference=$this->f3->get('POST.reference');
		$positionReference=$this->f3->get('POST.positionReference');
		$module=$this->f3->get('POST.module');

		$siteStructure = $this->getSiteStructure();
		$newSiteStructure = array();
		foreach ($siteStructure as $i=>$section){
			if($section['id']===$reference){
				$newSection = array('id' => uniqid(),'module'=>$module );
				if($positionReference=== "after"){
					array_push($newSiteStructure,$section);
					array_push($newSiteStructure,$newSection);
				}else{
					array_push($newSiteStructure,$newSection);
					array_push($newSiteStructure,$section);
				}
			}else{
				array_push($newSiteStructure,$section);
			}
		}
		$this->db->write('siteStructure.json',$newSiteStructure);

		//et on reroute vers la page d'admin
		$this->f3->reroute('/admin');
	}
}