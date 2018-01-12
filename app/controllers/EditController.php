<?php

/************************************
 * Class EditController
 * classe gérant les methodes d'édition de la page
 */
class EditController extends Controller {
	// on fait en sorte que toutes les methodes ne soient accecssibles que si l'utilisateur est admin,
	//sinon, on le renvoie vers la page de login
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
	//TODO CRSF
	function addSection() {
		//on commence par récuperer les valeurs contenues dans le formulaire
		$reference=$this->f3->get('POST.reference');
		$positionReference=$this->f3->get('POST.positionReference');
		$module=$this->f3->get('POST.module');
		//on recupere la structure du site
		$siteStructure=$this->getSiteStructure();
		//on cree un array pour acceuillir la nouvelle structure
		$newSiteStructure=array();
		//on vient créer un id pour cette section et lui donner aussi son module appelé
		$newSection=array('id'=>uniqid(),'module'=>$module);
		//pour chaque element de l'anciene structure
		foreach ($siteStructure as $i=>$section) {
			//si on est sur la section réference pour l'ajout
			if ($section['id']===$reference) {
				//on verifie ensuite si il faut placer la nouvelle section
				// avant ou apres la section de réference
				if ($positionReference==="after") {
					//si c'est apres, on push d'abord la section de réference avant la nouvelle section
					array_push($newSiteStructure,$section);
					array_push($newSiteStructure,$newSection);
				} else {
					//si c'est avant, on push d'abord la la nouvelle section avant section de réference
					array_push($newSiteStructure,$newSection);
					array_push($newSiteStructure,$section);
				}
			} else {//dans tout les autres cas on push la section au tableau de resultat
				array_push($newSiteStructure,$section);
			}
		}
		//puis on sauvegarde en base la nouvelle structure
		$this->db->write('siteStructure.json',$newSiteStructure);
		//et on reroute vers la page d'admin
		$this->f3->reroute('/admin');
	}

	//méthode de supression d'une section dans la page
	//TODO CRSF
	function deleteSection() {
		//in recupere l'id de la section a supprimer dans les query parameters
		$moduleId=$this->f3->get('GET.id');
		//on recupere la structure du site
		$siteStructure=$this->getSiteStructure();
		//on viens supprimer la section avec l'id correspondant
		foreach ($siteStructure as $i=>$section) {
			if ($section['id']===$moduleId) {
				array_splice($siteStructure,$i,1);
			}
		}
		//on sauvegarde en base
		$this->db->write('siteStructure.json',$siteStructure);
		//et on reroute vers la page d'admin
		$this->f3->reroute('/admin');
	}

	//méthode de déplacement vers le haut d'une section de la page
	function moveUpSection() {
		//in recupere l'id de la section a supprimer dans les query parameters
		$moduleId=$this->f3->get('GET.id');
		//on recupere la structure du site
		$siteStructure=$this->getSiteStructure();
		//on boucle sur la structure
		foreach ($siteStructure as $i=>$section) {
			//lorqu'on trouve le bon module
			if ($section['id']===$moduleId) {
				if ($i>0) {//on le déplace vers le haut(sauf si c'etait pas déja le premier)
					$el=$siteStructure[$i-1];
					$siteStructure[$i-1]=$siteStructure[$i];
					$siteStructure[$i]=$el;
				}
			}
		}
		//on sauvegarde
		$this->db->write('siteStructure.json',$siteStructure);
		//et on reroute vers la page d'admin
		$this->f3->reroute('/admin');
	}

	//méthode de supression d'une section dans la page
	function moveDownSection() {
		//in recupere l'id de la section a supprimer dans les query parameters
		$moduleId=$this->f3->get('GET.id');
		//on recupere la structure du site
		$siteStructure=$this->getSiteStructure();
		//on boucle sur la structure jusqu'a trouver notre module
		foreach ($siteStructure as $i=>$section) {
			if ($section['id']===$moduleId) {
				if ($i<count($siteStructure)-1) {//et on le descends dans le tableau si c'est pas le dernier element
					$el=$siteStructure[$i+1];
					$siteStructure[$i+1]=$siteStructure[$i];
					$siteStructure[$i]=$el;
				}
			}
		}
		//on sauvegarde
		$this->db->write('siteStructure.json',$siteStructure);
		//et on reroute vers la page d'admin
		$this->f3->reroute('/admin');
	}
	function addToMenu() {
		//in recupere l'id de la section
		$moduleId=$this->f3->get('POST.id');
		//in recupere le label envoyé"
		$menuLabel=$this->f3->get('POST.label');
		//on recupere la structure du site
		$siteStructure=$this->getSiteStructure();
		//on boucle sur la structure jusqu'a trouver notre module
		foreach ($siteStructure as $i=>$section) {
			if ($section['id']===$moduleId) {
					$siteStructure[$i]['inMenuAs']=$menuLabel;
			}
		}
		//on sauvegarde
		$this->db->write('siteStructure.json',$siteStructure);
		//et on reroute vers la page d'admin
		$this->f3->reroute('/admin');
	}
	function removeFromMenu() {
		//in recupere l'id de la section a supprimer dans les query parameters
		$moduleId=$this->f3->get('GET.id');
		//on recupere la structure du site
		$siteStructure=$this->getSiteStructure();
		//on boucle sur la structure jusqu'a trouver notre module
		foreach ($siteStructure as $i=>$section) {
			if ($section['id']===$moduleId) {
				$siteStructure[$i]['inMenuAs']="";
			}
		}
		//on sauvegarde
		$this->db->write('siteStructure.json',$siteStructure);
		//et on reroute vers la page d'admin
		$this->f3->reroute('/admin');
	}
}