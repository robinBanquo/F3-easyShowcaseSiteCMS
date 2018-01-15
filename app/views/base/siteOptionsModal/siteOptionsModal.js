
$(document).ready(function() {
	$('#siteOptionsModal').modal({
		complete: function () {
MediaManagment.onlyForPickUp=false
		}
	}

	);
	let optionsTabs = $(' #siteOptionsModal ul.tabs');
	optionsTabs.tabs();
	optionsTabs.tabs('select_tab', 'options-themes');





})