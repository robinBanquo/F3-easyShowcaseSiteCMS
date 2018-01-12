$(document).ready(function(){
// the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
	$('#addSectionModal').modal();

	//au click sur inerer une section
	$('.paralax .editParalaxImage').click(function () {
		$('#sendImageForm input[type=file]').click()
		$('#sendImageForm input[type=file]').change(function () {
			$('#sendImageForm').submit()
		})
	})

	$('#sendImageForm').submit(function(event) {
		/* stop form from submitting normally */
		event.preventDefault();

		/* setup post function vars */
		let url = $(this).attr('action');
		let postdata = $(this).serialize();
		console.log(postdata)

		/* send the data using post and put the results in a div with id="result" */
		/* post(url, postcontent, callback, datatype returned) */

		let request = $.post(
			url,
			postdata,
			formpostcompleted,
			"json"
		); // end post function

		function formpostcompleted(data, status)
		{
			/* write server response to console for troubleshooting */
			console.log(data);
			console.log(status);
		}
	}); // end submit function

})