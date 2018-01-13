(function ($) {
	$(function () {

		$('.button-collapse').sideNav();
		$('.parallax').parallax();

		//effet smoothscroll
		$('#mainNav a[href^="#"]').click(function () {
			var the_id = $(this).attr("href");
			if (the_id === '#') {
				return;
			}

			$('html, body').animate({
				scrollTop: $(the_id).offset().top
			});
			return false;
		});

	}); // end of document ready
})(jQuery); // end of jQuery name space