initMainSaveBtn = function () {
	window.onbeforeunload = function () {
		let message = "certains changements ne sont pas sauvegardés, cliquer sur le bouton en haut à droite pour les enregistrer"

		return message;
	}
	//on affiche le bouton sauvegarder en bas a droite
	let saveBtn = $('#saveBtn')
	saveBtn.css('visibility', 'visible')
	saveBtn.click(function () {
		window.onbeforeunload = function () {}
		$('.editable').each(function () {
			let zoneId= this.id.split("-")[1]
			let sectionId = $(this).closest("section").attr('id')
			let formatedContent = htmlParser.formatBeforeSave($(this).html())
			let uglyFormInput = $("#uglyForm input[name=uglyForm-" + sectionId +"-"+ zoneId + "]")
			uglyFormInput.val(formatedContent)
		})
		$('#uglyForm').submit()

	});
}

$(document).ready(function () {
	//lorsqu'une action viens modifier le formulaire de réference contenant les infos de la page
	$('#uglyForm input').change(function () {

		//on vient modifier le html dans les modules correspondants
		let splittedName = this.name.split("-") //l'input[name] est du type "uglyForm-5a5a14305795a-imgUrl"
		//on viens récuperer la div correspondante a l'input grace a son id
		let toChange = $("#" + splittedName[1] + " #moduleValue-" + splittedName[2])
		if (toChange.attr('src')) { //si ya un attribut source, c'est une image, et on viens remplacer sa source
			toChange.attr('src', this.value)
		} else {//sinon on viens remplacer le contenu html de l'element
			toChange.html(this.value)
		}

		initMainSaveBtn()


	})
})