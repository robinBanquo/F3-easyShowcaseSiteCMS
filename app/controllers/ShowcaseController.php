<?php

//! Front-end processor
class ShowCaseController extends Controller {
	//affichage du contenu de la page pour les visiteurs
	function showVisitor() {
		//on commence par générer la page
		$this->generatePage();
		//puis on renvoie le template général
		$template=new Template;
		echo $template->render('template.htm');
	}

	//affichage de la page d'administration du site
	function showAdmin() {
		//on verifie que l'utilisateur est bien un admin
		if ($this->isAdmin()) {
			//on passe le isAdminPage a true, un petit drapeau bien pratique pour les manip du template
			$this->f3->set('isAdminPage',TRUE);
			//on génere la page
			$this->generatePage();
			//on genere les données nécessaires à l'administration du site
			$this->generateAdminOnlyData();
			//puis on renvoie le template de base
			$template=new Template;
			echo $template->render('template.htm');
		} else {//si il est pas admin, on renvoie vers la page de login avec un message d'erreur
			$this->f3->set('SESSION.loginPageMessage',
				"vous devez vous authentifier pour accéder au options d'administration");
			$this->f3->reroute('/login');
		}
	}
	//methode de génération de la page
	function generatePage() {
		//on vient récuperer la structure du site telle qu'elle
		// 'est initialisé dans le constructeur du controller
		$siteStructure=$this->getSiteStructure();
		//on la passe dans les variables globales
		$this->f3->set('siteStructure',$siteStructure);
		//et on lance la methode d'import des differents fichier js des modules
		$this->importJs();
	}
	//methode d'import des differents fichier js des modules
	//l'idée est de ne pas importer plusieur fois le meme fichier js
	function importJs() {
		//on recuper la structure su site
		$siteStructure=$this->f3->get('siteStructure');
		//on initialise un tableau de resultats
		$jsArray=array();
		//pour chacunes des section du site
		foreach ($siteStructure as $section) {
			//si le module n'est pas encore dans le tableau résultat
			if (!in_array($section['module'],$jsArray)) {
				//on l'y insere
				array_push($jsArray,$section['module']);
			}
		}
		//puis on passe notre liste de nom de modules en variable globale
		$this->f3->set('jsSectionArray',$jsArray);
	}

	//methode de generation des infos complémentaires nécessaires a la page admin
	function generateAdminOnlyData() {
		$this->getModuleList();
	}


}