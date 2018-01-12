<?php

/************************************
 * Class EditController
 * classe gérant les methodes d'édition de la page
 */
class ModuleController extends Controller {
	// on fait en sorte que toutes les methodes ne soient accecssibles que si l'utilisateur est admin,
	//sinon, on le renvoie vers la page de login
	function beforeroute() {
		$this->checkAdminOrReroute();
	}

	function uploadImagesAndReturnPreview() {

		$directory = __DIR__.'/../../
		sites/'.$module
		//$files will contain all the files uploaded, in your case 1 hence $files[0];
//		$answer=array('answer'=>'Files transfer completed');
//		$json=json_encode($answer);
//		echo $json;
	}

}