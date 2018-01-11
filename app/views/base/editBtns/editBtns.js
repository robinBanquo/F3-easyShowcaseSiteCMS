$(document).ready(function(){
// the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
	$('#addSectionModal').modal();

	$('.addSectionBtn').click(function () {
		let splittedId = this.id.split("-")
		$('#addSectionForm input[name = positionReference]').val(splittedId[1])
		$('#addSectionForm input[name = reference]').val(splittedId[2])
	})

	$('.chooseModuleBtn').click(function () {
		$('#addSectionForm input[name = module]').val(this.id.split("-")[1])
		setTimeout(function () {
			$('#addSectionForm').submit()
		},50)
	})
});