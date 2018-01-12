$(document).ready(function(){
	$('#add-to-menu-modal').modal();
	//au click sur inerer une section
	$('.addToMenuBtn').click(function () {
		//on récupere toutes les infos stockées dans l'id du boutton
		let splittedId = this.id.split("-")
		//et on remplit le formulaire caché avec
		$('.addToMenuForm input[name = id]').val(splittedId[1])
	})
});