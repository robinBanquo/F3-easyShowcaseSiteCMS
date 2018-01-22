<?php

class Parser extends \Prefab {
	//liste des caractères reformatés
	private function tags() {
		return array(
			array(
				"html"=>'</p>',//le code html
				"htmlRegex"=>'/<\/p>/',//le regex pour les retrouver tous dans le texte
				"inDb"=>'|§p|',//le code avec lequel on le garde en base
				"inDbRegex"=>'/\|§p\|/'
				//le code avec lequel on retrouve toutes nos balises formatées pour la base
			),
			array(
				"html"=>'<p>',
				"htmlRegex"=>'/<p>/',
				"inDb"=>'|p|',
				"inDbRegex"=>'/\|p\|/'
			),
			array(
				"html"=>'<ul>',
				"htmlRegex"=>'/<ul>/',
				"inDb"=>'|ul|',
				"inDbRegex"=>'/\|ul\|/'
			),
			array(
				"html"=>'</ul>',
				"htmlRegex"=>'/<\/ul>/',
				"inDb"=>'|§ul|',
				"inDbRegex"=>'/\|§ul\|/'
			),
			array(
				"html"=>'<li>',
				"htmlRegex"=>'/<li>/',
				"inDb"=>'|li|',
				"inDbRegex"=>'/\|li\|/'
			),array(
				"html"=>'</li>',
				"htmlRegex"=>'/<\/li>/',
				"inDb"=>'|§li|',
				"inDbRegex"=>'/\|§li\|/'
			),array(
				"html"=>'<b>',
				"htmlRegex"=>'/<b>/',
				"inDb"=>'|b|',
				"inDbRegex"=>'/\|b\|/'
			),array(
				"html"=>'</b>',
				"htmlRegex"=>'/<\/b>/',
				"inDb"=>'|§b|',
				"inDbRegex"=>'/\|§b\|/'
			),array(
				"html"=>'<h4>',
				"htmlRegex"=>'/<h4>/',
				"inDb"=>'|h4|',
				"inDbRegex"=>'/\|h4\|/'
			),array(
				"html"=>'</h4>',
				"htmlRegex"=>'/<\/h4>/',
				"inDb"=>'|§h4|',
				"inDbRegex"=>'/\|§h4\|/'
			),array(
				"html"=>'</h6>',
				"htmlRegex"=>'/<\/h6>/',
				"inDb"=>'|§h6|',
				"inDbRegex"=>'/\|§h6\|/'
			),array(
				"html"=>'<h6>',
				"htmlRegex"=>'/<h6>/',
				"inDb"=>'|h6|',
				"inDbRegex"=>'/\|h6\|/'
			),array(
				"html"=>'</h5>',
				"htmlRegex"=>'/<\/h5>/',
				"inDb"=>'|§h5|',
				"inDbRegex"=>'/\|§h5\|/'
			),array(
				"html"=>'<h5>',
				"htmlRegex"=>'/<h5>/',
				"inDb"=>'|h5|',
				"inDbRegex"=>'/\|h5\|/'
			),array(
				"html"=>'<i>',
				"htmlRegex"=>'/<i>/',
				"inDb"=>'|i|',
				"inDbRegex"=>'/\|i\|/'
			),array(
				"html"=>'</i>',
				"htmlRegex"=>'/<\/i>/',
				"inDb"=>'|§i|',
				"inDbRegex"=>'/\|§i\|/'
			),array(
				"html"=>'<u>',
				"htmlRegex"=>'/<u>/',
				"inDb"=>'|u|',
				"inDbRegex"=>'/\|u\|/'
			),array(
				"html"=>'</u>',
				"htmlRegex"=>'/<\/u>/',
				"inDb"=>'|§u|',
				"inDbRegex"=>'/\|§u\|/'
			),array(
				"html"=>'<a href="$1">$2</a>',
				"htmlRegex"=>'/<a href="(https?:\/\/[^\s<>\'"]+)">([^\s<>\'"]+)<\/a>/',
				"inDb"=>'|a href="$1"|$2|§a|',
				"inDbRegex"=>'/\|a href="(https?:\/\/[^\s<>\'"]+)"\|([^\s<>\'"]+)\|§a\|/'
			)
		);
	}

	function toHtml($text) {
		foreach ($this->tags() as $tag) {

			//on parcours toutes nos balises
			//et on remplace les fausse balises par des vraies balises
			$text=preg_replace($tag["inDbRegex"],$tag["html"],$text);
		}
		//et on remplace aussi les urls stockées en dur pa des liens pour etre sympa avec les utilisateurs
		$text=preg_replace('/[\s](https?:\/\/[^\s<>\'"]+)[\s]/','<a href="$1">$1</a>',
			$text);

		return $text;
	}

}