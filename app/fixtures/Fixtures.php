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
	function siteOptions() {
		$themesList = json_decode(file_get_contents(__DIR__.'/../config/themes.json'),TRUE);
		$fontsList = json_decode(file_get_contents(__DIR__.'/../config/fonts.json'),TRUE);
		return [
			"font"=>$fontsList[2],
			"theme"=>$themesList["Classic"]
		];
	}
	function getModuleInitValues($module){
		$moduleInfo=
			json_decode(file_get_contents(__DIR__.'/../views/modules/'.$module.
				'/info.json'),TRUE);
		return $moduleInfo['fields'];
	}

}