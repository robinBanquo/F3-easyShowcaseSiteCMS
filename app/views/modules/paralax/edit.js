$(document).ready(function(){

	//au click sur inerer une section
	$('.paralax .editParalaxImage').click(function () {
		let id = this.id.split("-")[1]
		$("#siteOptionsModal").modal('open')
		$("a[href=#options-medias]").click()
		console.log(MediaManagment)
		MediaManagment.render(true, "uglyForm-"+id+"-imgUrl")
	})


})