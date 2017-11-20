
jQuery(document).ready(function() {
	var offset = 250;
	var duration = 300;

	jQuery(window).scroll(function() {
		if (jQuery(this).scrollTop() > offset) {
			$(".top-btn").fadeIn(duration);
		} else {
			$(".top-btn").fadeOut(duration);
		}
	});

	jQuery(".top-btn").click(function(event) {
		event.preventDefault();
		$("html, body").animate({scrollTop: 0}, duration);
		return false;
	})
});

var sortBy = function(field, reverse, primer){

  var key = primer ?
    function(x) {return primer(x[field])} :
    function(x) {return x[field]};

  reverse = !reverse ? 1 : -1;

  return function (a, b) {
    return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
  }
}


