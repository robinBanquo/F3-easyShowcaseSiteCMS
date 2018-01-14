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
				if ($i>
					0) {//on le déplace vers le haut(sauf si c'etait pas déja le premier)
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
				if ($i<count($siteStructure)-
					1) {//et on le descends dans le tableau si c'est pas le dernier element
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

	//methode d'ajout au menu d'une section pour une navigation rapide
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

	//methode de suppression d'un element du menu
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

	/******************************
	 * Methode permettant la sauvegarde de tout les elements modifiables des modules
	 */
	function saveUglyForm() {
		//on recupere la structure du site
		$siteStructure=$this->getSiteStructure();
		//on récupere le tableau contenu dans _POST
		$postArray=$this->f3->get('POST');

		//pour chacunes des entrées
		foreach ($postArray as $key=>$value) {
			//on récupere les infos contenues dans les clef des input name
			$splittedKey=explode("-",$key);
			$id=$splittedKey[1];
			$name=$splittedKey[2];
			//puis on boucle sur notre structure
			foreach ($siteStructure as $i=>$section) {
				//si on est dans la bonne section
				if ($section['id']===$id) {
					//on cherche le bon name
					foreach ($section['fields'] as $fieldName=>$fieldContent) {
						if ($fieldName===$name) { //todo faille de sécu sur les attributs d'images qu'est ce qu'il se passe si on marque < machin.jpg" onclick="alert('coucou') >?
							//puis on update cette entrée
							$siteStructure[$i]['fields'][$fieldName]['value']=$value;
						}
					}
				}
			}
		}
		//on sauvegarde notre tableau modifié par la méthode
		$this->db->write('siteStructure.json',$siteStructure);
		//et on reroute vers la page d'admin
		$this->f3->reroute('/admin');
	}

	/****************************************
	 * Methode en AJAX d'ajout d'une image a la bibliotheque utilisateur
	 */
	function addImgTolibrary() {
		//on viens récuoere les fichier envoyé par l'utilisateur
		$file=$this->f3->get('FILES')['file'];
		//gestion des erreurs d'upload
		if ($file['error']>0) {
			echo json_encode(array('errors'=>$file,
				'errorMsg'=>"une erreur s'est produite lors de l'envoi du fichier"));
		} else {//gestion des erreurs d'extension
			$validsExtentions=array('jpg','jpeg','gif','png');
			$extension_upload=strtolower(substr(strrchr($file['name'],'.'),1));
			if (!in_array($extension_upload,$validsExtentions)) {
				echo json_encode(array('errors'=>$file,
					'errorMsg'=>"Extention de fichier invalide"));
			} else {
				//gestion de la taille limite des fichier
				$maxsize=5 *8* 1000 * 1000; //5Mo
				$file_sizes=$file['size'];
				list($width, $height, $type, $attr)=getimagesize($file['tmp_name']);
				if ($file_sizes>$maxsize ) {
					echo json_encode(array('errors'=>$file,
						'errorMsg'=>"Votre fichier est trop volumineux"));
				} else {
					//gestion de la sauvegarde dui fichier image dans le dossier img du site
					$fileName=$file['name'];
					$destination='./sites/'.$this->siteName.'/img/'.$fileName;
					$result=move_uploaded_file($file['tmp_name'],$destination);
					if (!$result) {
						echo json_encode(array('errors'=>$file,
							'errorMsg'=>"une erreur s'est produite lors de l'envoi du fichier"));
					} else {
						//gestion de l'archivage des infos du fichier dans la table siteFile
						//on recupere la table
						$siteFiles=$this->db->read('siteFiles.json');
						//on formate la nouvelle entrée
						$toPush =array(
							'id'=>uniqid(),
							'type'=>'img',
							'url'=>$destination,
							'alt'=> '',
							'seize'=>($width && $height)? $width."x".$height : ""
						);
						//on l'insere au début du tableau
						array_unshift($siteFiles,$toPush);
						//on sauvegarde la nouvelle table
						$this->db->write('siteFiles.json', $siteFiles);
						//et on renvoie les infos de la nouvelle entrée en json pour le script js
						echo json_encode($toPush);
					}
				}
			}
		}
	}
}