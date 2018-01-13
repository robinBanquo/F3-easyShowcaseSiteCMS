<?php
//! controler de base, dont héritent tout les autres
class Controller {

	protected $db;//reference a la base de donnée
	protected $f3;//objet de base du fate free framework
	public $siteName = "framasite";//nom du site
	// TODO : c'est cette variable qu'il faudra rendre dynamique pour switcher d'un site a l'autre

	//! HTTP route pre-processor
	function beforeroute() {

	}

	//! HTTP route post-processor
	function afterroute() {
	}

	//! Instantiate class
	function __construct() {
		//on recuper la base du framework
		$this->f3 = Base::instance();
		//on recuper le fichier config spécifique au site regardé
		$this->f3->config('sites/'.$this->siteName.'/config.ini');
		if($this->isAdmin()){
			//si l'user est admin, on commence par passer cette variable a true,
			// elle sera utilisée un peu partout par la suite
			$this->f3->set('isAdmin', true);
		}
		// on finit par connecter a la base de donnée du site de manière dynamique
		$this->db = new \DB\Jig ( $_SERVER["DOCUMENT_ROOT"].'/sites/'.$this->siteName.'/data/' , $format = \DB\Jig::FORMAT_JSON  );



	}

	/**********
	 * Methode permettant de verifier si l'utilisateur courant est admin du site
	 * @return bool
	 */
	function isAdmin(){
		return $this->f3->get('SESSION.user') ===$this->f3->get('user_id') ;
	}

	/**************************
	 * Methode de récuperation de la structure du site de l'utilisateur a partir de sa bdd en flat file
	 * @return array
	 */
	function getSiteStructure(){
		//on recuper l'entrée dans la base
		$siteStructure = $this->db->read('siteStructure.json');
		//on commence par vérifier si il y a bien quelquechose en base
		if(empty($siteStructure)){//si c'est vide on fait l'opération d'initialisation
			$this->initStructure();
			//on renvoie la valeur
			return $this->db->read('siteStructure.json');
		}else{
			//sinon, on renvoie direct la valeur
			return $siteStructure;
		}
	}
	//opération d'initialisation lorsque la structure du site est vide
	function initStructure(){
		//on vient utiliser la methode siteMap de l'objet fixtures qui renvoie une page type
		$fixtures = new Fixtures();
		$siteStructure = $fixtures->siteMap();
		//et on l'enregistre dans notre bdd
		$this->db->write('siteStructure.json',$siteStructure);
	}

	/****************
	 * methode permettant de recuperer la liste des modules possibles
	 */
	function getModuleList(){
		//on ititialise un tableau de résultat
		$modulesList=array();
		//on viens récuperer la liste des modules dispo directement dans le dossier
		// (comme ca pas besoin d'avoir a les déclarer, plus simple pour d'eventuels modders)
		$modulesFolderItems=scandir(__DIR__.'/../views/modules/');
		//on initialise  un array de resultat
		$modules=array();
		//pourr tout ce qui a été récuperé
		foreach ($modulesFolderItems as $item) {
			//on ne selectionne que les dossier qui commence pas par "."
			if ($item[0]!=='.') {
				//et on les rentre dans notre liste de modules
				array_push($modules,$item);
			}
		}
		//pour chaques modules,
		foreach ($modules as $module) {
			//on viens récuperer les info a partir du info.json
			$moduleInfo=
				json_decode(file_get_contents(__DIR__.'/../views/modules/'.$module.
					'/info.json'),TRUE);
			//et on les rentre dans notre tableau résultat
			array_push($modulesList,$moduleInfo);

		}
		//puis on passe le tableau résultat en variable globale
		$this->f3->set('modulesList',$modulesList);
		return $modules;
	}
	//methode servant dans le middleware
	function checkAdminOrReroute(){
		if (!$this->isAdmin()) {
			//on rajoute un petit message d'erreur qui sera affiché sur la page de login
			$this->f3->set('SESSION.loginPageMessage',
				"vous devez vous authentifier pour accéder au options d'administration");
			//puis on renvoie vers la page de login
			$template=new Template;
			echo $template->render('login.htm');
		}
	}
}