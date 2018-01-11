$(document).ready(function(){
// the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
	$('#addSectionModal').modal();

	//au click sur inerer une section
	$('.addSectionBtn').click(function () {
		//on récupere toutes les infos stockées dans l'id du boutton
		let splittedId = this.id.split("-")
		//et on remplit le formulaire caché avec
		$('#addSectionForm input[name = positionReference]').val(splittedId[1])
		$('#addSectionForm input[name = reference]').val(splittedId[2])
	})

	//au click sur le le module choisi
	$('.chooseModuleBtn').click(function () {
		//on viens récurer le nom du module choisi pour le rentrer dans le formulaire
		$('#addSectionForm input[name = module]').val(this.id.split("-")[1])
		setTimeout(function () {//on attends un peu pour etre sur que c'est fait
			//et on soumet le formulaire
			$('#addSectionForm').submit()
		},50)
	})
});