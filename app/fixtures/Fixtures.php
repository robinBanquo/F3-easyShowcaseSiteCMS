<?php


class Fixtures {
	function siteMap() {
		return [
			[
				'id'=>uniqid(),
				'module'=>'paralax',
				'fields'=>$this->getModuleInitValues('paralax')
			],
			[
				'id'=>uniqid(),
				'module'=>'text_section',
				'fields'=>$this->getModuleInitValues('text_section')
			],
			[
				'id'=>uniqid(),
				'module'=>'paralax',
				'fields'=>$this->getModuleInitValues('paralax')
			],
			[
				'id'=>uniqid(),
				'module'=>'three_goals',
				'fields'=>$this->getModuleInitValues('three_goals')
			],
			[
				'id'=>uniqid(),
				'module'=>'paralax',
				'fields'=>$this->getModuleInitValues('paralax')
			],

		];
	}
	function siteParams(){
		$f3 = Base::instance();
		return [
			"title" => $f3->get("siteName"),
			"titleSize" => "medium",
			"favIcon" => false ,
			"siteLogo"=> false,
			"lang" => "fr",
			"description"=> "le nouveau site de ".$f3->get("siteName"),
			"keywords" => "site, internet, CMS, ".$f3->get("siteName")
		];
	}
	function siteOptions() {
		$themesList = json_decode(file_get_contents(__DIR__.'/../config/themes.json'),TRUE);
		$fontsList = json_decode(file_get_contents(__DIR__.'/../config/fonts.json'),TRUE);
		return [
			"font"=>$fontsList[2],
			"theme"=>$themesList["Classic"],
			"params"=>$this->siteParams()
		];
	}
	function getModuleInitValues($module){
		$moduleInfo=
			json_decode(file_get_contents(__DIR__.'/../views/modules/'.$module.
				'/info.json'),TRUE);
		return $moduleInfo['fields'];
	}

}