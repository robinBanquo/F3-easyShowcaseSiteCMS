
$(document).ready(function() {
	$('#siteOptionsModal').modal();
	let optionsTabs = $(' #siteOptionsModal ul.tabs');
	optionsTabs.tabs();
	optionsTabs.tabs('select_tab', 'options-themes');

	//ajout d'images à la librairie
	$('#addImageToLibrary').click(function () {
		let $addImageForm = $('#addImageForm input[type=file]')
		$addImageForm.click()
		$addImageForm.change(function () {
			$('#addImageForm').submit()
		})
	})

	$("#addImageForm").submit(function(e) {
		let formData = new FormData($(this)[0]);

		$.ajax({
			url: "/admin/edit/add-img-to-librairie",
			type: "POST",
			data: formData,
			async: false,
			success: function (msg) {
				console.log(msg)
			},
			cache: false,
			contentType: false,
			processData: false
		});

		e.preventDefault();
	});

})