$(document).ready(function () {
	$('#add-to-menu-modal').modal();
	//au click sur inerer une section
	$('.addToMenuBtn').click(function () {
		let id = this.id.split("-")[1]
		$(".addToMenuForm input[name=id]").val(id)
	});

});