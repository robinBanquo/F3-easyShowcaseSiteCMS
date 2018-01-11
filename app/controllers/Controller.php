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
			//on vient utiliser la methode siteMap de l'objet fixtures qui renvoie une page type
			$fixtures = new Fixtures();
			$siteStructure = $fixtures->siteMap();
			//et on l'enregistre dans notre bdd
			$this->db->write('siteStructure.json',$siteStructure);
			//on renvoie la valeur
			return $this->db->read('siteStructure.json');
		}else{
			//sinon, on renvoie direct la valeur
			return $siteStructure;
		}
	}
}