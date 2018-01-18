(function ($) {
	$(function () {
		$('.button-collapse').sideNav();
		$('.parallax').parallax();

		//effet smoothscroll
		$('#mainNav a[href^="#"]').click(function () {
			let the_id = $(this).attr("href");
			if (the_id === '#' || the_id === '#!') {
				return;
			}
			$('html, body').animate({
				scrollTop: $(the_id).offset().top
			});
			return false;
		});



	}); // end of document ready
})(jQuery); // end of jQuery name space

$(document).ready(function () {

	htmlParser.unformatBySelector('.editable');

})