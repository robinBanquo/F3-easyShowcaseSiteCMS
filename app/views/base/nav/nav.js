$(document).ready(function () {
//pour l'édition du menu
	$('.editMenuLabel').click(function () {
		console.log('coucou')
		//on récupere toutes les infos stockées dans l'id du boutton
		let splittedId = this.id.split("-")
		//et on remplit le formulaire caché avec
		$('.addToMenuForm input[name = id]').val(splittedId[1])
		//on modifie le titre et le boutton de la fenetre modale "à la sauvage"
		$('#add-to-menu-modal h4').html("Modifier l'élement du menu");
		$('#add-to-menu-modal button').html("Editer");

		//gestion du pré-remplissage avec l'ancien nom
		$('#add-to-menu-modal input[name=label]').val(splittedId[2]);
		setTimeout(function () {
			Materialize.updateTextFields();
		},50)
		//et on ouvre la modale
		$('#add-to-menu-modal').modal('open');
	})
})